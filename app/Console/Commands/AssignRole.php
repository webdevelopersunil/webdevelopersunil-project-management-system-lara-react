<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

// Models
use App\Models\User;
use Spatie\Permission\Models\Role;

class AssignRole extends Command
{
    protected $signature = 'user:assign-role {email} {role}';
    protected $description = 'Assign role to a user';

    public function handle()
    {
        $email = $this->argument('email');
        $roleName = $this->argument('role');

        $user = User::where('email', $email)->first();
        if (!$user) {
            $this->error('User not found!');
            return;
        }

        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            $this->error('Role not found!');
            return;
        }

        $user->assignRole($role);
        $this->info("Role {$roleName} assigned to {$email}");
    }
}