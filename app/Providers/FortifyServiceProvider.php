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
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureAuthentication(); // 🔥 LDAP integration
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
    }

    /**
     * LDAP + Local authentication
     */
    private function configureAuthentication(): void
    {
        Fortify::authenticateUsing(function (Request $request) {
            
            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            $username = $request->username;
            $password = $request->password;

            try {
                $connection = Container::getConnection('default');
                $record = $connection->query()->findBy('samaccountname', $username);

                /**
                 * 🔁 Local fallback if user not found in LDAP
                 */
                if (! $record) {
                    if (Auth::attempt(
                        ['cpf_no' => $username, 'password' => $password],
                        $request->boolean('remember')
                    )) {
                        return Auth::user();
                    }

                    return null;
                }

                /**
                 * ✅ LDAP bind
                 */
                if (! $connection->auth()->attempt($record['dn'], $password)) {
                    return null;
                }

                /**
                 * 🔄 Sync / create local user
                 */
                return User::updateOrCreate(
                    ['cpf_no' => $username],
                    [
                        'username' => $username,
                        'name'     => $record['cn'][0] ?? '-',
                        'email'    => $record['mail'][0] ?? null,
                        'mobile'   => $record['telephonenumber'][0] ?? null,
                        'location' => $record['physicaldeliveryofficename'][0] ?? null,
                        'password' => Hash::make(Str::random(32)), // 🔒 never store LDAP password
                    ]
                );

            } catch (\Throwable $e) {
                Log::error('LDAP authentication error', [
                    'user' => $username,
                    'error' => $e->getMessage(),
                ]);

                /**
                 * 🔁 Emergency fallback to local auth
                 */
                if (Auth::attempt(
                    ['cpf_no' => $username, 'password' => $password],
                    $request->boolean('remember')
                )) {
                    return Auth::user();
                }

                return null;
            }
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

        Fortify::registerView(fn () => Inertia::render('auth/register'));
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
