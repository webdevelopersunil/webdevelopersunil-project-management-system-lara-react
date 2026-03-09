<?php

namespace App\Http\Controllers;

use App\Models\Portal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PortalCollaborator;

class PortalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Portal::where('owner_id', $request->user()->id);
        
        // Apply search filter
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
        
        // Apply status filter
        if ($request->has('status') && $request->status == 0 || $request->status == 1 ) {
            $query->where('active', $request->status);
        }
        
        // Get paginated results
        $perPage = $request->get('per_page', 10);
        $portals = $query->latest()->paginate($perPage)->withQueryString();
        
        return Inertia::render('portal/index', [
            'portals' => $portals->items(),
            'total' => $portals->total(),
            'current_page' => $portals->currentPage(),
            'last_page' => $portals->lastPage(),
            'per_page' => $portals->perPage(),
            'from' => $portals->firstItem(),
            'to' => $portals->lastItem(),
            'filters' => $request->only(['search', 'status']),
            'links' => $portals->linkCollection()->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('portal/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validated = $request->validate([

            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'required|url|max:255',
            
            'framework' => 'nullable|string|max:255',
            'framework_version' => 'nullable',
            'database' => 'nullable|string|max:255',
            'database_version' => 'nullable',
            
            'status' => 'required|in:completed,pending,in-progress',
            'is_public' => 'boolean',
            'server_backup' => 'nullable|boolean',
            'database_backup' => 'nullable|boolean',
            'migrate_to_new_server' => 'nullable|boolean',

            'machine_type' => 'nullable|in:Windows,RHEL,Ubuntu,CentOS,Other,Not-Defined',
        ]);

        $portal = new Portal();
        $portal->name = $validated['name'];
        $portal->description = $validated['description'] ?? null;
        $portal->status = $validated['status'];
        $portal->owner_id = $request->user()->id;
        $portal->url = $validated['url'];
        $portal->domain = parse_url($validated['url'], PHP_URL_HOST);
        $portal->framework = $validated['framework'] ?? null;
        $portal->framework_version = $validated['framework_version'] ?? null;
        $portal->database = $validated['database'] ?? null;
        $portal->database_version = $validated['database_version'] ?? null;
        $portal->machine_type = $validated['machine_type'] ?? 'Not-Defined';
        
        $portal->is_public = $validated['is_public'] ?? false;
        $portal->server_backup = $validated['server_backup'] ?? false;
        $portal->db_backup = $validated['database_backup'] ?? false;
        $portal->migrate_to_new_server = $validated['migrate_to_new_server'] ?? false;

        $portal->save();

        return redirect()->route('portal.index')->with('success', 'Portal created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Portal $portal, Request $request)
    {
        $portal     =   Portal::with('owner')->findOrFail($portal->id);
        $owner      =   $portal->owner;
        
        $collaborations = PortalCollaborator::with('user.roles')
            ->where('portal_id', $portal->id)
            ->get();

        $formattedCollaborators = $collaborations->map(function ($collab) {
            $user = $collab->user;
            $userRole = $user->roles->first()?->name ?? 'User';
            $avatarLetters = strtoupper(substr($user->name, 0, 2));
            
            return [
                'id' => $collab->id,
                'user' => [
                    'id' => $user->id,
                    'avatar' => $avatarLetters,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $userRole,
                ],
                'status' => $collab->status,
                'permissions' => $collab->permissions ?? ['read'],
                'notes' => $collab->notes,
                'start_date' => $collab->start_date?->toIso8601String(),
                'end_date' => $collab->end_date?->toIso8601String(),
            ];
        })->toArray();

        // 1. Prepend Owner (has all permissions by default)
        $ownerAvatarLetters = strtoupper(substr($owner->name, 0, 2));
        $ownerRole = $owner->roles->first()?->name ?? 'Creator';
        
        array_unshift($formattedCollaborators, [
            'id' => 'owner_' . $owner->id,
            'user' => [
                'id' => $owner->id,
                'avatar' => $ownerAvatarLetters,
                'name' => $owner->name . ' (Owner)',
                'email' => $owner->email,
                'role' => $ownerRole,
            ],
            'status' => 'active',
            'permissions' => ['read', 'write', 'admin', 'manage', 'deploy'],
            'notes' => 'Portal Creator',
            'start_date' => $portal->created_at->toIso8601String(),
            'end_date' => null,
        ]);

        // 2. Fetch available Developers (Not Owner & Not currently a collaborator)
        $existingUserIds = $collaborations->pluck('user_id')->push($owner->id)->toArray();
        $availableDevelopers = \App\Models\User::role('developer')
            ->whereNotIn('id', $existingUserIds)
            ->get(['id', 'name', 'email']);

        return Inertia::render('portal/show', [
            'portal'               => $portal,
            'owner'                => $owner,
            'collaborators'        => $formattedCollaborators,
            'available_developers' => $availableDevelopers
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Portal $portal)
    {
        

        return Inertia::render('portal/edit', [
            'portal' => $portal,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Portal $portal)
    {
        // If you have validation, do it here
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:500',
            'active' => 'boolean',
            'ip_address' => 'nullable|ip',
            'status' => 'required|in:completed,pending,in-progress',
            'server_backup' => 'boolean',
            'db_backup' => 'boolean',
            'migrate_to_new_server' => 'boolean',
            'domain' => 'nullable|string|max:255',
            'vm_name' => 'nullable|string|max:255',
            'framework' => 'nullable|string|max:100',
            'framework_version' => 'nullable|numeric',
            'database' => 'nullable|string|max:100',
            'database_version' => 'nullable|numeric',
            'is_public' => 'boolean',
            'machine_type' => 'required|in:Windows,RHEL,Ubuntu,CentOS,Other,Not-Defined',
            'description' => 'nullable|string|max:1000',
        ]);

        // Convert empty strings to null for nullable fields
        $validated = array_map(function ($value) {
            return $value === '' ? null : $value;
        }, $validated);

        $portal->update($validated);
        
        return redirect()->route('portal.index')
            ->with('success', 'Portal updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portal $portal)
    {
        $portal->delete();

        return redirect()->route('portal.index')->with('success', 'Portal deleted successfully.');
    }

    /**
     * Store a new collaborator for the portal.
     */
    public function storeCollaborator(Request $request, Portal $portal)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = \App\Models\User::findOrFail($validated['user_id']);

        if (!$user->hasRole('developer')) {
            return redirect()->back()->withErrors(['user_id' => 'Only developers can be added as collaborators.']);
        }

        // Check if already a collaborator
        $exists = PortalCollaborator::where('portal_id', $portal->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($exists) {
            return redirect()->back()->withErrors(['user_id' => 'This user is already a collaborator.']);
        }

        PortalCollaborator::create([
            'portal_id' => $portal->id,
            'user_id' => $user->id,
            'status' => 'active',
            'permissions' => ['read', 'write'], // Default basic permissions
            'start_date' => now(),
        ]);

        return redirect()->back()->with('success', 'Collaborator added successfully.');
    }
}
