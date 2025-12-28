<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Generate dynamic data based on current time
        $currentMonth = Carbon::now()->format('M');
        $previousMonths = [];
        
        // Generate portal growth data for last 12 months
        $portalGrowth = [];
        $baseCount = 50;
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        foreach ($months as $index => $month) {
            // Add some randomness to make it look realistic
            $count = $baseCount + ($index * 10) + rand(0, 15);
            $portalGrowth[] = ['month' => $month, 'count' => $count];
        }
        
        // Generate recent activity with timestamps
        $recentActivity = [
            [
                'id' => 1,
                'type' => 'portal_created',
                'description' => 'New portal "Marketing Analytics" created',
                'user' => 'Alex Johnson',
                'time' => Carbon::now()->subMinutes(10)->diffForHumans(),
                'icon' => 'Globe'
            ],
            [
                'id' => 2,
                'type' => 'developer_assigned',
                'description' => 'Sarah Chen assigned to E-commerce Project',
                'user' => 'Michael Rodriguez',
                'time' => Carbon::now()->subMinutes(25)->diffForHumans(),
                'icon' => 'UserCheck'
            ],
            [
                'id' => 3,
                'type' => 'request_approved',
                'description' => 'Portal access request for HR Department approved',
                'user' => 'David Wilson',
                'time' => Carbon::now()->subHours(1)->diffForHumans(),
                'icon' => 'CheckCircle'
            ],
            [
                'id' => 4,
                'type' => 'request_submitted',
                'description' => 'New portal request submitted by Finance Team',
                'user' => 'Emma Thompson',
                'time' => Carbon::now()->subHours(2)->diffForHumans(),
                'icon' => 'FileText'
            ],
            [
                'id' => 5,
                'type' => 'system_update',
                'description' => 'Scheduled system maintenance completed successfully',
                'user' => 'System Admin',
                'time' => Carbon::now()->subHours(3)->diffForHumans(),
                'icon' => 'Cpu'
            ],
        ];
        
        // Add more activities if needed
        for ($i = 6; $i <= 10; $i++) {
            $types = ['portal_created', 'developer_assigned', 'request_approved', 'request_submitted'];
            $descriptions = [
                'Portal configuration updated',
                'New API integration added',
                'Security audit completed',
                'Performance optimization applied',
                'Database backup created'
            ];
            $users = ['John Smith', 'Maria Garcia', 'Robert Kim', 'Lisa Anderson', 'James Wilson'];
            
            $recentActivity[] = [
                'id' => $i,
                'type' => $types[array_rand($types)],
                'description' => $descriptions[array_rand($descriptions)],
                'user' => $users[array_rand($users)],
                'time' => Carbon::now()->subHours(rand(4, 24))->subMinutes(rand(0, 59))->diffForHumans(),
                'icon' => 'Activity'
            ];
        }
        
        $data = [
            'stats' => [
                'portals' => [
                    'total' => rand(150, 200),
                    'active' => rand(120, 160),
                    'inactive' => rand(20, 40),
                    'recent_added' => rand(5, 15),
                    'by_status' => [
                        ['status' => 'Active', 'count' => rand(120, 160)],
                        ['status' => 'Inactive', 'count' => rand(20, 40)],
                        ['status' => 'Maintenance', 'count' => rand(5, 15)],
                        ['status' => 'Pending Setup', 'count' => rand(10, 20)],
                    ]
                ],
                'developers' => [
                    'total' => rand(80, 100),
                    'active' => rand(70, 90),
                    'available' => rand(30, 50),
                    'assigned' => rand(40, 60),
                    'top_skills' => [
                        ['skill' => 'PHP', 'count' => rand(50, 60)],
                        ['skill' => 'JavaScript', 'count' => rand(45, 55)],
                        ['skill' => 'React', 'count' => rand(40, 50)],
                        ['skill' => 'Laravel', 'count' => rand(35, 45)],
                        ['skill' => 'Vue.js', 'count' => rand(30, 40)],
                        ['skill' => 'Node.js', 'count' => rand(25, 35)],
                        ['skill' => 'Python', 'count' => rand(20, 30)],
                        ['skill' => 'Java', 'count' => rand(15, 25)],
                    ]
                ],
                'requests' => [
                    'total' => rand(40, 60),
                    'pending' => rand(15, 25),
                    'approved' => rand(20, 30),
                    'rejected' => rand(3, 8),
                    'high_priority' => rand(5, 12),
                ],
                'system' => [
                    'uptime' => round(99.5 + (rand(0, 10) / 10), 1), // 99.5% to 100.5%
                    'performance' => rand(85, 99),
                    'storage_used' => rand(1500000000, 3000000000), // 1.5-3 GB
                    'storage_total' => 10737418240, // 10 GB
                ],
                'recent_activity' => $recentActivity
            ],
            'charts' => [
                'portal_growth' => $portalGrowth,
                'request_trends' => [
                    ['day' => 'Mon', 'pending' => rand(6, 10), 'approved' => rand(10, 15)],
                    ['day' => 'Tue', 'pending' => rand(5, 9), 'approved' => rand(9, 14)],
                    ['day' => 'Wed', 'pending' => rand(7, 12), 'approved' => rand(12, 18)],
                    ['day' => 'Thu', 'pending' => rand(6, 11), 'approved' => rand(10, 16)],
                    ['day' => 'Fri', 'pending' => rand(4, 8), 'approved' => rand(8, 13)],
                    ['day' => 'Sat', 'pending' => rand(2, 5), 'approved' => rand(4, 8)],
                    ['day' => 'Sun', 'pending' => rand(1, 4), 'approved' => rand(3, 7)],
                ],
                'developer_distribution' => [
                    ['role' => 'Frontend Developer', 'count' => rand(30, 40)],
                    ['role' => 'Backend Developer', 'count' => rand(25, 35)],
                    ['role' => 'Full Stack Developer', 'count' => rand(15, 25)],
                    ['role' => 'DevOps Engineer', 'count' => rand(5, 10)],
                    ['role' => 'Mobile Developer', 'count' => rand(8, 15)],
                ]
            ]
        ];
        
        return Inertia::render('dashboard', $data);
    }

    public function index2(Request $request)
    {
        // Current date for time-based calculations
        $currentDate = Carbon::now();
        
        // Generate comprehensive dashboard data
        $data = [
            'overview' => [
                'total_portals' => 147,
                'active_developers' => 63,
                'pending_requests' => 18,
                'system_uptime' => 99.9,
                'completion_rate' => 84,
                'avg_response_time' => '142ms',
            ],
            
            'portals' => [
                'total' => 147,
                'active' => 124,
                'inactive' => 23,
                'monthly_growth' => 12.5,
                'status_distribution' => [
                    ['label' => 'Active', 'value' => 124, 'color' => '#10b981'],
                    ['label' => 'In Development', 'value' => 15, 'color' => '#3b82f6'],
                    ['label' => 'Maintenance', 'value' => 5, 'color' => '#f59e0b'],
                    ['label' => 'Archived', 'value' => 3, 'color' => '#6b7280'],
                ],
                'by_category' => [
                    ['category' => 'E-commerce', 'count' => 42],
                    ['category' => 'CMS', 'count' => 38],
                    ['category' => 'CRM', 'count' => 28],
                    ['category' => 'Analytics', 'count' => 19],
                    ['category' => 'API Services', 'count' => 20],
                ],
                'recently_created' => [
                    ['name' => 'Analytics Dashboard', 'date' => '2 days ago', 'status' => 'active'],
                    ['name' => 'HR Portal', 'date' => '4 days ago', 'status' => 'active'],
                    ['name' => 'Inventory System', 'date' => '1 week ago', 'status' => 'development'],
                ]
            ],
            
            'developers' => [
                'total' => 84,
                'available' => 36,
                'assigned' => 48,
                'utilization_rate' => 78,
                'top_performers' => [
                    ['name' => 'Alex Chen', 'role' => 'Full Stack', 'completed_tasks' => 42],
                    ['name' => 'Sarah Miller', 'role' => 'Frontend', 'completed_tasks' => 38],
                    ['name' => 'James Wilson', 'role' => 'Backend', 'completed_tasks' => 35],
                ],
                'skills_distribution' => [
                    ['skill' => 'React', 'count' => 48, 'percentage' => 57],
                    ['skill' => 'Laravel', 'count' => 42, 'percentage' => 50],
                    ['skill' => 'Node.js', 'count' => 36, 'percentage' => 43],
                    ['skill' => 'Vue.js', 'count' => 28, 'percentage' => 33],
                    ['skill' => 'Python', 'count' => 24, 'percentage' => 29],
                ],
                'active_projects' => 32,
            ],
            
            'requests' => [
                'total' => 184,
                'pending' => 18,
                'approved' => 147,
                'rejected' => 19,
                'avg_processing_time' => '2.4 hours',
                'priority_distribution' => [
                    ['priority' => 'High', 'count' => 9, 'color' => '#ef4444'],
                    ['priority' => 'Medium', 'count' => 6, 'color' => '#f59e0b'],
                    ['priority' => 'Low', 'count' => 3, 'color' => '#10b981'],
                ],
                'trend_this_week' => [
                    ['day' => 'Mon', 'requests' => 8],
                    ['day' => 'Tue', 'requests' => 12],
                    ['day' => 'Wed', 'requests' => 14],
                    ['day' => 'Thu', 'requests' => 10],
                    ['day' => 'Fri', 'requests' => 9],
                    ['day' => 'Sat', 'requests' => 3],
                    ['day' => 'Sun', 'requests' => 2],
                ],
                'awaiting_review' => 12,
            ],
            
            'system' => [
                'performance' => [
                    'score' => 94,
                    'status' => 'excellent',
                    'response_time' => '142ms',
                    'error_rate' => '0.12%',
                ],
                'resources' => [
                    'cpu_usage' => 68,
                    'memory_usage' => 74,
                    'storage' => [
                        'used' => 245,
                        'total' => 500,
                        'unit' => 'GB',
                        'percentage' => 49,
                    ],
                    'database_connections' => 42,
                ],
                'health' => [
                    'uptime' => '99.9%',
                    'last_backup' => 'Last night',
                    'security_status' => 'protected',
                    'updates_available' => 2,
                ],
            ],
            
            'insights' => [
                'portal_traffic_growth' => 28.5,
                'developer_productivity' => 15.3,
                'request_approval_rate' => 92.8,
                'system_reliability' => 99.9,
            ],
            
            'timeline' => [
                'recent_activity' => [
                    [
                        'id' => 1,
                        'type' => 'portal_created',
                        'title' => 'New Portal Created',
                        'description' => 'E-commerce platform launched',
                        'user' => 'Alex Johnson',
                        'avatar' => 'AJ',
                        'timestamp' => '10 minutes ago',
                        'status' => 'success',
                    ],
                    [
                        'id' => 2,
                        'type' => 'request_approved',
                        'title' => 'Request Approved',
                        'description' => 'API access request approved',
                        'user' => 'Sarah Miller',
                        'avatar' => 'SM',
                        'timestamp' => '25 minutes ago',
                        'status' => 'success',
                    ],
                    [
                        'id' => 3,
                        'type' => 'developer_assigned',
                        'title' => 'Developer Assigned',
                        'description' => 'James assigned to CRM project',
                        'user' => 'Michael Chen',
                        'avatar' => 'MC',
                        'timestamp' => '1 hour ago',
                        'status' => 'info',
                    ],
                    [
                        'id' => 4,
                        'type' => 'maintenance',
                        'title' => 'System Update',
                        'description' => 'Database optimization completed',
                        'user' => 'System',
                        'avatar' => '⚙️',
                        'timestamp' => '3 hours ago',
                        'status' => 'warning',
                    ],
                    [
                        'id' => 5,
                        'type' => 'analytics',
                        'title' => 'Performance Report',
                        'description' => 'Monthly performance metrics generated',
                        'user' => 'Analytics Bot',
                        'avatar' => '📊',
                        'timestamp' => '5 hours ago',
                        'status' => 'info',
                    ],
                ],
                'upcoming_tasks' => [
                    [
                        'id' => 1,
                        'task' => 'Portal Security Audit',
                        'due_date' => 'Tomorrow',
                        'priority' => 'high',
                        'assigned_to' => 'Security Team',
                    ],
                    [
                        'id' => 2,
                        'task' => 'Database Migration',
                        'due_date' => 'In 2 days',
                        'priority' => 'medium',
                        'assigned_to' => 'DevOps',
                    ],
                    [
                        'id' => 3,
                        'task' => 'Performance Optimization',
                        'due_date' => 'This week',
                        'priority' => 'medium',
                        'assigned_to' => 'Backend Team',
                    ],
                ],
            ],
            
            'metrics' => [
                'monthly_portal_growth' => [
                    ['month' => 'Jan', 'portals' => 12, 'growth' => 8],
                    ['month' => 'Feb', 'portals' => 18, 'growth' => 50],
                    ['month' => 'Mar', 'portals' => 24, 'growth' => 33],
                    ['month' => 'Apr', 'portals' => 32, 'growth' => 33],
                    ['month' => 'May', 'portals' => 38, 'growth' => 19],
                    ['month' => 'Jun', 'portals' => 45, 'growth' => 18],
                    ['month' => 'Jul', 'portals' => 52, 'growth' => 16],
                    ['month' => 'Aug', 'portals' => 58, 'growth' => 12],
                    ['month' => 'Sep', 'portals' => 65, 'growth' => 12],
                    ['month' => 'Oct', 'portals' => 72, 'growth' => 11],
                    ['month' => 'Nov', 'portals' => 80, 'growth' => 11],
                    ['month' => 'Dec', 'portals' => 88, 'growth' => 10],
                ],
                'developer_workload' => [
                    ['department' => 'Frontend', 'assigned' => 32, 'capacity' => 85],
                    ['department' => 'Backend', 'assigned' => 28, 'capacity' => 78],
                    ['department' => 'DevOps', 'assigned' => 12, 'capacity' => 92],
                    ['department' => 'QA', 'assigned' => 8, 'capacity' => 65],
                ],
                'request_resolution_time' => [
                    ['priority' => 'High', 'avg_time' => '1.2h'],
                    ['priority' => 'Medium', 'avg_time' => '3.8h'],
                    ['priority' => 'Low', 'avg_time' => '8.5h'],
                ],
            ],
        ];
        
        return Inertia::render('dashboard2', $data);
    }
    
}