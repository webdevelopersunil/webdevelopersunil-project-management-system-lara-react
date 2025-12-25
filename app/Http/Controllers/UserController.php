<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['roles', 'permissions'])->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'status' => $user->status ?? 'active',
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'is_verified' => !is_null($user->email_verified_at),
                'last_login' => $user->last_login_at ?? null, // Add this field to users table if needed
            ];
        });

        $allRoles = Role::all()->pluck('name');
        $allPermissions = DB::table('permissions')->pluck('name');

        return Inertia::render('users/index', [
            'users' => $users,
            'availableRoles' => $allRoles,
            'availablePermissions' => $allPermissions,
            'statistics' => $this->getUserStatistics($users),
        ]);
    }

    /**
     * Get user statistics
     */
    private function getUserStatistics($users)
    {
        return [
            'total' => $users->count(),
            'active' => $users->where('status', 'active')->count(),
            'pending' => $users->where('status', 'pending')->count(),
            'inactive' => $users->where('status', 'inactive')->count(),
            'verified' => $users->where('is_verified', true)->count(),
            'by_role' => $users->groupBy('roles')->map->count(),
        ];
    }

    /**
     * Update user roles and permissions
     */
    public function updateRoles_old(Request $request, User $user)
    {
        $request->validate([
            'roles' => 'array',
            'roles.*' => 'string|exists:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        // Sync roles
        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        }

        // Sync permissions
        if ($request->has('permissions')) {
            $user->syncPermissions($request->permissions);
        }

        return response()->json([
            'success' => true,
            'message' => 'User roles and permissions updated successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ]
        ]);
    }

    public function updateRoles(Request $request, User $user)
    {
        try {
            $request->validate([
                'roles' => 'array',
                'roles.*' => 'string|exists:roles,name',
                'permissions' => 'array',
                'permissions.*' => 'string|exists:permissions,name',
            ]);

            // Sync roles
            if ($request->has('roles')) {
                $user->syncRoles($request->roles);
            }

            // Sync permissions
            if ($request->has('permissions')) {
                $user->syncPermissions($request->permissions);
            }

            return response()->json([
                'success' => true,
                'message' => 'User roles and permissions updated successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->getRoleNames(),
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Get user details with roles and permissions
     */
    public function show(User $user)
    {
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'status' => $user->status ?? 'active',
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
            'all_roles' => Role::all()->pluck('name'),
            'all_permissions' => DB::table('permissions')->pluck('name'),
        ]);
    }

    /**
     * Update user status
     */
    public function updateStatus_old(Request $request, User $user)
    {
        $request->validate([
            'status' => 'required|in:active,pending,inactive,suspended'
        ]);

        $user->status = $request->status;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User status updated successfully',
            'user' => [
                'id' => $user->id,
                'status' => $user->status,
            ]
        ]);
    }

    /**
     * Update user status
     */
    public function updateStatus(Request $request, User $user)
    {
        try {
            $request->validate([
                'status' => 'required|in:active,pending,inactive,suspended'
            ]);

            $user->status = $request->status;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'User status updated successfully',
                'user' => [
                    'id' => $user->id,
                    'status' => $user->status,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}