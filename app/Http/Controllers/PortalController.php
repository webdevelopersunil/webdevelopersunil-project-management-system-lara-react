<?php

namespace App\Http\Controllers;

use App\Models\Portal;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        if ($request->has('status') && !empty($request->status) && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        
        // Get paginated results
        $perPage = $request->get('per_page', 15);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Portal $portal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Portal $portal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Portal $portal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portal $portal)
    {
        //
    }
}
