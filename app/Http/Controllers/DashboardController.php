<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Portal;
use App\Models\PortalRequest;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // 1. Portals Data
        $totalPortals = Portal::count();
        $activePortals = Portal::where('status', 'Active')->count();
        $inactivePortals = Portal::where('status', 'Inactive')->count();
        $recentAddedPortals = Portal::where('created_at', '>=', Carbon::now()->subDays(30))->count();
        
        $portalsByStatus = Portal::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->get()
            ->map(function ($item) {
                return ['status' => $item->status, 'count' => $item->count];
            })->toArray();

        // Portal Growth (Last 6 Months)
        $portalGrowth = [];
        for ($i = 5; $i >= 0; $i--) {
            $monthStart = Carbon::now()->subMonths($i)->startOfMonth();
            $monthEnd = Carbon::now()->subMonths($i)->endOfMonth();
            $count = Portal::whereBetween('created_at', [$monthStart, $monthEnd])->count();
            $portalGrowth[] = [
                'month' => $monthStart->format('M'),
                'count' => $count
            ];
        }

        // 2. Developers / Users Data
        $totalUsers = User::count();
        // Spatie Roles logic for distribution
        $usersByRole = User::with('roles')->get()->pluck('roles.*.name')->flatten()->countBy();
        
        $developerDistribution = [];
        $assignedDevelopersCount = 0;
        foreach ($usersByRole as $role => $count) {
            $formattedRole = ucwords(str_replace('-', ' ', $role));
            $developerDistribution[] = ['role' => $formattedRole, 'count' => $count];
            
            // For metric purposes, count developers/project-managers as "Assigned" or "Active"
            if (in_array($role, ['developer', 'project-manager'])) {
                $assignedDevelopersCount += $count;
            }
        }

        // 3. Requests Data
        $totalRequests = PortalRequest::count();
        $pendingRequests = PortalRequest::pending()->count();
        $approvedRequests = PortalRequest::approved()->count();
        $rejectedRequests = PortalRequest::rejected()->count();
        $highPriorityRequests = PortalRequest::highPriority()->count();

        // Request Trends (Last 7 Days)
        $requestTrends = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $pending = PortalRequest::pending()->whereDate('created_at', $date->toDateString())->count();
            $approved = PortalRequest::approved()->whereDate('created_at', $date->toDateString())->count();
            $requestTrends[] = [
                'day' => $date->format('D'),
                'pending' => $pending,
                'approved' => $approved
            ];
        }

        // 4. Recent Activity (Merge recent Portals & Requests)
        $recentPortals = Portal::with('owner')->latest()->take(5)->get()->map(function ($p) {
            return [
                'id' => 'p_'.$p->id,
                'type' => 'portal_created',
                'description' => 'New portal "' . $p->name . '" created',
                'user' => $p->owner ? $p->owner->name : 'System',
                'time' => $p->created_at->diffForHumans(),
                'icon' => 'Globe',
                'raw_date' => $p->created_at
            ];
        });

        $recentRequests = PortalRequest::with('submitter')->latest()->take(5)->get()->map(function ($r) {
            $type = $r->status === 'Pending' ? 'request_submitted' : 'request_approved';
            $desc = $r->status === 'Pending' ? 'New portal request submitted' : 'Portal request updated to ' . $r->status;
            
            return [
                'id' => 'r_'.$r->id,
                'type' => $type,
                'description' => $desc,
                'user' => $r->submitter ? $r->submitter->name : 'System',
                'time' => $r->created_at->diffForHumans(),
                'icon' => $r->status === 'Pending' ? 'FileText' : 'CheckCircle',
                'raw_date' => $r->created_at
            ];
        });

        $recentActivity = $recentPortals->concat($recentRequests)
            ->sortByDesc('raw_date')
            ->take(8)
            ->values()
            ->all();

        // 5. Structure payload
        $data = [
            'stats' => [
                'portals' => [
                    'total' => $totalPortals,
                    'active' => $activePortals,
                    'inactive' => $inactivePortals,
                    'recent_added' => $recentAddedPortals,
                    'by_status' => $portalsByStatus
                ],
                'developers' => [
                    'total' => $totalUsers,
                    'active' => $totalUsers,
                    'available' => current($usersByRole->toArray()) ?: 0, 
                    'assigned' => $assignedDevelopersCount,
                    'top_skills' => [] // Deprecated
                ],
                'requests' => [
                    'total' => $totalRequests,
                    'pending' => $pendingRequests,
                    'approved' => $approvedRequests,
                    'rejected' => $rejectedRequests,
                    'high_priority' => $highPriorityRequests,
                ],
                'system' => [
                    'uptime' => 99.9, // Simulated health status
                    'performance' => 95,
                    'storage_used' => 2147483648, // 2 GB purely for UI look
                    'storage_total' => 10737418240, // 10 GB
                ],
                'recent_activity' => $recentActivity
            ],
            'charts' => [
                'portal_growth' => $portalGrowth,
                'request_trends' => $requestTrends,
                'developer_distribution' => $developerDistribution
            ]
        ];
        
        return Inertia::render('dashboard', $data);
    }
}
