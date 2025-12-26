<?php

namespace App\Http\Controllers;

use App\Models\Portal;
use App\Models\PortalRequest;
use App\Models\PortalRequestDocument;
use App\Http\Requests\StorePortalRequest;
use App\Http\Requests\UpdatePortalRequest;
use App\Http\Requests\UpdatePortalRequestStatus;
use App\Http\Requests\StorePortalRequestDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia; // If using Inertia.js

class PortalRequestController extends Controller
{
    /**
     * Display a listing of portal requests.
     *
     * @param Request $request
     * @return \Inertia\Response|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        // Start building the query
        $query = PortalRequest::with(['portal', 'submitter', 'reviewer', 'documents']);
        
        // Apply filters if provided
        if ($request->has('portal_id')) {
            $query->where('portal_id', $request->portal_id);
        }
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }
        
        if ($request->has('submitted_by')) {
            $query->where('submitted_by', $request->submitted_by);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('comments', 'like', "%{$search}%")
                  ->orWhere('reason', 'like', "%{$search}%")
                  ->orWhere('request_uuid', 'like', "%{$search}%")
                  ->orWhereHas('submitter', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                  })
                  ->orWhereHas('portal', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }
        
        // Apply sorting
        $sortField = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);
        
        // Paginate results
        $perPage = $request->get('per_page', 15);
        $portalRequests = $query->paginate($perPage);
        
        // Get additional data for filters
        $portals = Portal::select('id', 'name')->get();
        $statuses = ['Pending', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Completed'];
        $priorities = ['Low', 'Medium', 'High'];
        
        // If using Inertia.js
        // if (class_exists(Inertia::class)) {
            return Inertia::render('portal/request/index', [
                'portalRequests' => $portalRequests,
                'filters' => $request->only(['search', 'portal_id', 'status', 'priority', 'per_page', 'sort_by', 'sort_direction']),
                'portals' => $portals,
                'statuses' => $statuses,
                'priorities' => $priorities,
            ]);
        // }
        
    }

    /**
     * Show the form for creating a new portal request.
     *
     * @return \Inertia\Response|\Illuminate\View\View
     */
    public function create()
    {
        $portals = Portal::select('id', 'name')->get();
        
        if (class_exists(Inertia::class)) {
            return Inertia::render('PortalRequests/Create', [
                'portals' => $portals,
                'priorities' => ['Low', 'Medium', 'High'],
            ]);
        }
        
        return response()->json([
            'portals' => $portals,
            'priorities' => ['Low', 'Medium', 'High'],
        ]);
    }

    /**
     * Store a newly created portal request.
     *
     * @param StorePortalRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function store(StorePortalRequest $request)
    {
        DB::beginTransaction();
        
        try {
            // Create the portal request
            $portalRequest = PortalRequest::create([
                'portal_id' => $request->portal_id,
                'submitted_by' => auth()->id(),
                'priority' => $request->priority ?? 'Medium',
                'status' => 'Pending',
                'comments' => $request->comments,
                'request_uuid' => Str::uuid(),
            ]);
            
            // Handle document uploads if present
            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $document) {
                    $this->uploadDocument($portalRequest, $document);
                }
            }
            
            DB::commit();
            
            // Flash success message
            session()->flash('success', 'Portal request submitted successfully! Reference: ' . $portalRequest->reference);
            
            // Return response based on request type
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Portal request submitted successfully!',
                    'data' => [
                        'id' => $portalRequest->id,
                        'uuid' => $portalRequest->request_uuid,
                        'reference' => $portalRequest->reference,
                    ],
                    'redirect' => route('portal-requests.show', $portalRequest->request_uuid),
                ]);
            }
            
            return redirect()->route('portal-requests.show', $portalRequest->request_uuid);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to submit portal request. Please try again.',
                    'error' => config('app.debug') ? $e->getMessage() : null,
                ], 500);
            }
            
            return redirect()->back()->withErrors(['error' => 'Failed to submit portal request. Please try again.']);
        }
    }

    /**
     * Display the specified portal request.
     *
     * @param  string  $uuid
     * @return \Inertia\Response|\Illuminate\View\View|\Illuminate\Http\JsonResponse
     */
    public function show($uuid)
    {
        $portalRequest = PortalRequest::with([
            'portal',
            'submitter',
            'reviewer',
            'documents'
        ])->where('request_uuid', $uuid)->first();
        
        if (!$portalRequest) {
            if (request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Portal request not found.',
                ], 404);
            }
            
            abort(404);
        }
        
        $availableStatuses = ['Pending', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Completed'];
        
        if (class_exists(Inertia::class)) {
            return Inertia::render('PortalRequests/Show', [
                'portalRequest' => $portalRequest,
                'availableStatuses' => $availableStatuses,
                'canUpdateStatus' => auth()->user()->can('update-portal-request-status'), // Add your authorization logic
            ]);
        }
        
        return response()->json([
            'portalRequest' => $portalRequest,
            'availableStatuses' => $availableStatuses,
        ]);
    }

    /**
     * Show the form for editing the specified portal request.
     *
     * @param  string  $uuid
     * @return \Inertia\Response|\Illuminate\View\View|\Illuminate\Http\JsonResponse
     */
    public function edit($uuid)
    {
        $portalRequest = PortalRequest::with(['portal', 'documents'])
            ->where('request_uuid', $uuid)
            ->first();
        
        if (!$portalRequest) {
            if (request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Portal request not found.',
                ], 404);
            }
            
            abort(404);
        }
        
        // Check if request can be edited (only pending or under review)
        if (!in_array($portalRequest->status, ['Pending', 'Under Review'])) {
            if (request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'This request can no longer be edited.',
                ], 403);
            }
            
            return redirect()->route('portal-requests.show', $uuid)
                ->with('error', 'This request can no longer be edited.');
        }
        
        $portals = Portal::select('id', 'name')->get();
        
        if (class_exists(Inertia::class)) {
            return Inertia::render('PortalRequests/Edit', [
                'portalRequest' => $portalRequest,
                'portals' => $portals,
                'priorities' => ['Low', 'Medium', 'High'],
            ]);
        }
        
        return response()->json([
            'portalRequest' => $portalRequest,
            'portals' => $portals,
            'priorities' => ['Low', 'Medium', 'High'],
        ]);
    }

    /**
     * Update the specified portal request.
     *
     * @param  UpdatePortalRequest  $request
     * @param  string  $uuid
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function update(UpdatePortalRequest $request, $uuid)
    {
        DB::beginTransaction();
        
        try {
            $portalRequest = PortalRequest::where('request_uuid', $uuid)->first();
            
            if (!$portalRequest) {
                if ($request->wantsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Portal request not found.',
                    ], 404);
                }
                
                abort(404);
            }
            
            // Check if request can be edited
            if (!in_array($portalRequest->status, ['Pending', 'Under Review'])) {
                if ($request->wantsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'This request can no longer be edited.',
                    ], 403);
                }
                
                return redirect()->route('portal-requests.show', $uuid)
                    ->with('error', 'This request can no longer be edited.');
            }
            
            // Update the portal request
            $portalRequest->update([
                'portal_id' => $request->portal_id,
                'priority' => $request->priority,
                'comments' => $request->comments,
            ]);
            
            // Handle new document uploads if present
            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $document) {
                    $this->uploadDocument($portalRequest, $document);
                }
            }
            
            DB::commit();
            
            session()->flash('success', 'Portal request updated successfully!');
            
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Portal request updated successfully!',
                    'data' => [
                        'id' => $portalRequest->id,
                        'uuid' => $portalRequest->request_uuid,
                    ],
                    'redirect' => route('portal-requests.show', $portalRequest->request_uuid),
                ]);
            }
            
            return redirect()->route('portal-requests.show', $portalRequest->request_uuid);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update portal request. Please try again.',
                    'error' => config('app.debug') ? $e->getMessage() : null,
                ], 500);
            }
            
            return redirect()->back()->withErrors(['error' => 'Failed to update portal request. Please try again.']);
        }
    }

    /**
     * Update portal request status.
     *
     * @param UpdatePortalRequestStatus $request
     * @param string $uuid
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function updateStatus(UpdatePortalRequestStatus $request, $uuid)
    {
        DB::beginTransaction();
        
        try {
            $portalRequest = PortalRequest::where('request_uuid', $uuid)->first();
            
            if (!$portalRequest) {
                if ($request->wantsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Portal request not found.',
                    ], 404);
                }
                
                abort(404);
            }
            
            // Add authorization check (uncomment and implement as needed)
            // if (!auth()->user()->can('update-portal-request-status')) {
            //     if ($request->wantsJson()) {
            //         return response()->json([
            //             'success' => false,
            //             'message' => 'You are not authorized to update request status.',
            //         ], 403);
            //     }
            //     
            //     return redirect()->route('portal-requests.show', $uuid)
            //         ->with('error', 'You are not authorized to update request status.');
            // }
            
            // Update the status and reason
            $portalRequest->update([
                'status' => $request->status,
                'reason' => $request->reason,
                'reviewed_at' => now(),
                'reviewed_by' => auth()->id(),
            ]);
            
            // Add comment if provided
            if ($request->has('additional_comment')) {
                $portalRequest->comments .= "\n\n[Status Update - " . now()->format('Y-m-d H:i:s') . "]: " . $request->additional_comment;
                $portalRequest->save();
            }
            
            DB::commit();
            
            session()->flash('success', 'Portal request status updated successfully!');
            
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Portal request status updated successfully!',
                    'data' => [
                        'id' => $portalRequest->id,
                        'uuid' => $portalRequest->request_uuid,
                        'status' => $portalRequest->status,
                    ],
                    'redirect' => route('portal-requests.show', $portalRequest->request_uuid),
                ]);
            }
            
            return redirect()->route('portal-requests.show', $portalRequest->request_uuid);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update portal request status. Please try again.',
                    'error' => config('app.debug') ? $e->getMessage() : null,
                ], 500);
            }
            
            return redirect()->back()->withErrors(['error' => 'Failed to update portal request status. Please try again.']);
        }
    }

    /**
     * Get all documents for a portal request.
     *
     * @param string $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDocuments($uuid)
    {
        try {
            $portalRequest = PortalRequest::where('request_uuid', $uuid)->first();
            
            if (!$portalRequest) {
                return response()->json([
                    'success' => false,
                    'message' => 'Portal request not found.',
                ], 404);
            }
            
            $documents = $portalRequest->documents()->get();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'documents' => $documents->map(function ($document) {
                        return [
                            'id' => $document->id,
                            'name' => $document->name,
                            'original_name' => $document->original_name,
                            'url' => Storage::url($document->path),
                            'mime_type' => $document->mime_type,
                            'size' => $document->size,
                            'formatted_size' => $document->formatted_size,
                            'extension' => $document->extension,
                            'created_at' => $document->created_at->format('Y-m-d H:i:s'),
                        ];
                    }),
                    'total_documents' => $documents->count(),
                ],
                'message' => 'Documents retrieved successfully.',
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve documents.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Add document to existing portal request.
     *
     * @param StorePortalRequestDocument $request
     * @param string $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function addDocument(StorePortalRequestDocument $request, $uuid)
    {
        DB::beginTransaction();
        
        try {
            $portalRequest = PortalRequest::where('request_uuid', $uuid)->first();
            
            if (!$portalRequest) {
                return response()->json([
                    'success' => false,
                    'message' => 'Portal request not found.',
                ], 404);
            }
            
            // Check if request is still editable
            if (!in_array($portalRequest->status, ['Pending', 'Under Review'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot add documents to a request with status: ' . $portalRequest->status,
                ], 400);
            }
            
            // Upload the document
            $document = $this->uploadDocument($portalRequest, $request->file('document'));
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'document' => [
                        'id' => $document->id,
                        'name' => $document->name,
                        'original_name' => $document->original_name,
                        'url' => Storage::url($document->path),
                        'mime_type' => $document->mime_type,
                        'size' => $document->size,
                        'formatted_size' => $document->formatted_size,
                        'extension' => $document->extension,
                    ],
                ],
                'message' => 'Document added successfully.',
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to add document.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Delete a document from portal request.
     *
     * @param string $uuid
     * @param int $documentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteDocument($uuid, $documentId)
    {
        DB::beginTransaction();
        
        try {
            $portalRequest = PortalRequest::where('request_uuid', $uuid)->first();
            
            if (!$portalRequest) {
                return response()->json([
                    'success' => false,
                    'message' => 'Portal request not found.',
                ], 404);
            }
            
            $document = $portalRequest->documents()->find($documentId);
            
            if (!$document) {
                return response()->json([
                    'success' => false,
                    'message' => 'Document not found.',
                ], 404);
            }
            
            // Check if request is still editable
            if (!in_array($portalRequest->status, ['Pending', 'Under Review'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete documents from a request with status: ' . $portalRequest->status,
                ], 400);
            }
            
            // Delete the file from storage
            if (Storage::exists($document->path)) {
                Storage::delete($document->path);
            }
            
            // Delete the database record
            $document->delete();
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Document deleted successfully.',
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete document.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Get portal request statistics.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatistics(Request $request)
    {
        try {
            $query = PortalRequest::query();
            
            if ($request->has('portal_id')) {
                $query->where('portal_id', $request->portal_id);
            }
            
            if ($request->has('start_date')) {
                $query->whereDate('created_at', '>=', $request->start_date);
            }
            
            if ($request->has('end_date')) {
                $query->whereDate('created_at', '<=', $request->end_date);
            }
            
            $totalRequests = $query->count();
            $pendingRequests = $query->where('status', 'Pending')->count();
            $approvedRequests = $query->where('status', 'Approved')->count();
            $rejectedRequests = $query->where('status', 'Rejected')->count();
            
            // Priority distribution
            $priorityDistribution = $query->select('priority', DB::raw('count(*) as count'))
                ->groupBy('priority')
                ->get()
                ->pluck('count', 'priority');
            
            // Monthly trend (last 6 months)
            $monthlyTrend = PortalRequest::select(
                    DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
                    DB::raw('count(*) as total')
                )
                ->where('created_at', '>=', now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'total_requests' => $totalRequests,
                    'pending_requests' => $pendingRequests,
                    'approved_requests' => $approvedRequests,
                    'rejected_requests' => $rejectedRequests,
                    'approval_rate' => $totalRequests > 0 ? round(($approvedRequests / $totalRequests) * 100, 2) : 0,
                    'priority_distribution' => $priorityDistribution,
                    'monthly_trend' => $monthlyTrend,
                ],
                'message' => 'Statistics retrieved successfully.',
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Get my requests (requests submitted by the authenticated user).
     *
     * @param Request $request
     * @return \Inertia\Response|\Illuminate\Http\JsonResponse
     */
    public function myRequests(Request $request)
    {
        $query = PortalRequest::with(['portal', 'documents'])
            ->where('submitted_by', auth()->id());
        
        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }
        
        // Paginate results
        $perPage = $request->get('per_page', 10);
        $requests = $query->orderBy('created_at', 'desc')->paginate($perPage);
        
        if (class_exists(Inertia::class)) {
            return Inertia::render('PortalRequests/MyRequests', [
                'requests' => $requests,
                'filters' => $request->only(['status', 'priority', 'per_page']),
                'statuses' => ['Pending', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Completed'],
                'priorities' => ['Low', 'Medium', 'High'],
            ]);
        }
        
        return response()->json([
            'requests' => $requests,
            'filters' => $request->only(['status', 'priority', 'per_page']),
            'statuses' => ['Pending', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Completed'],
            'priorities' => ['Low', 'Medium', 'High'],
        ]);
    }

    /**
     * Helper method to upload document.
     *
     * @param PortalRequest $portalRequest
     * @param \Illuminate\Http\UploadedFile $file
     * @return PortalRequestDocument
     */
    private function uploadDocument(PortalRequest $portalRequest, $file)
    {
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $fileName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '_' . time() . '.' . $extension;
        $filePath = $file->storeAs('portal-requests/documents', $fileName, 'public');
        
        return PortalRequestDocument::create([
            'portal_request_id' => $portalRequest->id,
            'name' => $fileName,
            'path' => $filePath,
            'original_name' => $originalName,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'extension' => $extension,
        ]);
    }
}