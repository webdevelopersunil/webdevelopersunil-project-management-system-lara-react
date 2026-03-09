<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use LdapRecord\Container;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(
            \Laravel\Fortify\Contracts\RegisterResponse::class,
            \App\Http\Responses\RegisterResponse::class
        );
    }

    public function boot(): void
    {
        $this->configureAuthentication(); // 🔥 LDAP here
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
    }

    /**
     * LDAP + Local authentication
     */
    private function configureAuthentication_old(): void
    {
        Fortify::authenticateUsing(function (Request $request) {

            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            $username = strtoupper($request->username);
            $password = $request->password;

            /**
             * 1️⃣ Try LDAP first
             */
            try {
                $connection = Container::getConnection('default');
                $record = $connection
                    ->query()
                    ->findBy('samaccountname', $username);

                if ($record && $connection->auth()->attempt($record['dn'], $password)) {

                    return User::updateOrCreate(
                        ['username' => $username],
                        [
                            'name'              => $record['cn'][0] ?? $username,
                            'email'             => $record['mail'][0] ?? null,
                            'password'          => Hash::make($password),

                            'last_login_at'     => now(),
                            'email_verified_at' => now(),
                            'status'            => 'active'
                        ]
                    );
                }
            } catch (\Throwable $e) {
                Log::warning('LDAP auth failed', [
                    'user' => $username,
                    'error' => $e->getMessage(),
                ]);
            }

            /**
             * 2️⃣ Fallback to local DB
             */
            $user = User::where('username', $username)->first();

            if ($user && Hash::check($password, $user->password)) {
                return $user;
            }

            return null; // ❗ required
        });
    }
    private function configureAuthentication(): void
    {
        Fortify::authenticateUsing(function (Request $request) {
            
            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            $username = strtoupper($request->username);
            $password = $request->password;

            /**
             * 1️ Try LDAP first
             */
            try {
                $connection = Container::getConnection('default');
                $record = $connection
                    ->query()
                    ->findBy('samaccountname', $username);

                if ($record && $connection->auth()->attempt($record['dn'], $password)) {
                    // Find or create user
                    $user = User::updateOrCreate(
                        ['username' => $username],
                        [
                            'name'              => $record['cn'][0] ?? $username,
                            'email'             => $record['mail'][0] ?? null,
                            'password'          => Hash::make($password),
                            'last_login_at'     => now(),
                            'email_verified_at' => now(),
                            'status'            => 'active'
                        ]
                    );

                    return $user; // Fortify will handle remember automatically
                }
            } catch (\Throwable $e) {
                Log::warning('LDAP auth failed', [
                    'user' => $username,
                    'error' => $e->getMessage(),
                ]);
            }

            /**
             * 2️ Fallback to local DB
             */
            $user = User::where('username', $username)->first();

            if ($user && Hash::check($password, $user->password)) {
                return $user; // Fortify will handle remember automatically
            }

            return null;
        });
    }


    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    /**
     * Configure Fortify views (Inertia)
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(function (Request $request) {
            if (!$request->has('portal_id')) {
                return redirect()->route('login')->with('status', 'Registration requires a valid invitation link.');
            }
            return Inertia::render('auth/register');
        });
        Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));
        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $key = Str::lower($request->input(Fortify::username())).'|'.$request->ip();
            return Limit::perMinute(5)->by(Str::transliterate($key));
        });
    }
}
