<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | 1. Create Roles
        |--------------------------------------------------------------------------
        */
        $roles = [
            'admin',
            'developer',
            'project-manager',
            'requestor',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        /*
        |--------------------------------------------------------------------------
        | 2. Admin (ALL Roles)
        |--------------------------------------------------------------------------
        */
        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin',
                'username' => 'A004628',
                'password' => Hash::make('welcome@123'),
                'email_verified_at' => now(),
            ]
        );

        // Assign all roles to admin (assignRole supports multiple roles)
        $admin->assignRole($roles);

        /*
        |--------------------------------------------------------------------------
        | 3. Developer
        |--------------------------------------------------------------------------
        */
        $developer = User::firstOrCreate(
            ['email' => 'dev@gmail.com'],
            [
                'name' => 'Developer User',
                'username' => '110012',
                'password' => Hash::make('welcome@123'),
                'email_verified_at' => now(),
            ]
        );

        $developer->assignRole('developer');

        /*
        |--------------------------------------------------------------------------
        | 4. Project Manager
        |--------------------------------------------------------------------------
        */
        $projectManager = User::firstOrCreate(
            ['email' => 'pm@gmail.com'],
            [
                'name' => 'Project Manager User',
                'username' => '110013',
                'password' => Hash::make('welcome@123'),
                'email_verified_at' => now(),
            ]
        );

        $projectManager->assignRole('project-manager');

        /*
        |--------------------------------------------------------------------------
        | 5. Requestor
        |--------------------------------------------------------------------------
        */
        $requestor = User::firstOrCreate(
            ['email' => 'req@gmail.com'],
            [
                'name' => 'Requestor User',
                'username' => '110014',
                'password' => Hash::make('welcome@123'),
                'email_verified_at' => now(),
            ]
        );

        $requestor->assignRole('requestor');

    }
}
