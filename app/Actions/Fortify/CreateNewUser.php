<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'portal_id' => ['nullable', 'string'],
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        if (!empty($input['portal_id'])) {
            try {
                $portal_id = \Illuminate\Support\Facades\Crypt::decryptString($input['portal_id']);
                // Assign 'requestor' role to user
                if (!$user->hasRole('requestor')) {
                    $user->assignRole('requestor');
                }
                
                // Add the user to the portal's users / collaborators
                // Check if portal exists
                $portal = \App\Models\Portal::find($portal_id);
                if ($portal) {
                    \App\Models\PortalCollaborator::firstOrCreate([
                        'portal_id' => $portal_id,
                        'user_id' => $user->id,
                        'role' => 'requestor' // or appropriate role
                    ]);
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error("Failed to decrypt portal_id during registration: " . $e->getMessage());
            }
        }

        return $user;
    }
}
