<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

// Spatie Roles and Permissions
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Project permissions
            'create-project',
            'edit-project',
            'delete-project',
            'view-project',

            // User management permissions
            'manage-users',

            // Request submission permissions
            'submit-request',

            // Request approval permissions
            'approve-request',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $developer = Role::create(['name' => 'developer']);
        $developer->givePermissionTo([
            // Project permissions
            'create-project',
            'edit-project',
            'delete-project',
            'view-project',
            // User management permissions
            'manage-users',
            // Request submission permissions
            'submit-request',
        ]);

        $projectManager = Role::create(['name' => 'project-manager']);
        $projectManager->givePermissionTo([
            // Project permissions
            'view-project',
            // Request submission permissions
            'submit-request',
            // Request approval permissions
            'approve-request'
        ]);

        $requestor = Role::create(['name' => 'requestor']);
        $requestor->givePermissionTo([
            // Project permissions
            'view-project',
            // Request submission permissions
            'submit-request'
        ]);

        // Create admin role with all permissions
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());
    }
}
