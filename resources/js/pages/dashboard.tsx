import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import {
  Users,
  Globe,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Activity,
  BarChart3,
  Server,
  Code,
  Database,
  Shield,
  Cpu,
  Layers,
  Zap,
  Eye,
  ArrowRight,
  RefreshCw,
  UserCheck,
  UserCog,
  Building,
  FolderTree,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface DashboardProps {
  stats: {
    portals: {
      total: number;
      active: number;
      inactive: number;
      recent_added: number;
      by_status: Array<{ status: string; count: number }>;
    };
    developers: {
      total: number;
      active: number;
      available: number;
      assigned: number;
      top_skills: Array<{ skill: string; count: number }>;
    };
    requests: {
      total: number;
      pending: number;
      approved: number;
      rejected: number;
      high_priority: number;
    };
    system: {
      uptime: number;
      performance: number;
      storage_used: number;
      storage_total: number;
    };
    recent_activity: Array<{
      id: number;
      type: string;
      description: string;
      user: string;
      time: string;
      icon: string;
    }>;
  };
  charts: {
    portal_growth: Array<{ month: string; count: number }>;
    request_trends: Array<{ day: string; pending: number; approved: number }>;
    developer_distribution: Array<{ role: string; count: number }>;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard({ stats, charts }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  // Calculate percentages
  const portalActivePercentage = stats.portals.total > 0 
    ? Math.round((stats.portals.active / stats.portals.total) * 100) 
    : 0;
  
  const developerAssignmentPercentage = stats.developers.total > 0 
    ? Math.round((stats.developers.assigned / stats.developers.total) * 100) 
    : 0;
  
  const requestApprovalPercentage = stats.requests.total > 0 
    ? Math.round((stats.requests.approved / stats.requests.total) * 100) 
    : 0;
  
  const storagePercentage = stats.system.storage_total > 0 
    ? Math.round((stats.system.storage_used / stats.system.storage_total) * 100) 
    : 0;

  // Format storage size
  const formatStorage = (bytes: number) => {
    if (bytes >= 1073741824) {
      return (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(2) + ' MB';
    } else {
      return (bytes / 1024).toFixed(2) + ' KB';
    }
  };

  // Get icon for activity type
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'portal_created': return <Globe className="size-4" />;
      case 'developer_assigned': return <UserCheck className="size-4" />;
      case 'request_approved': return <CheckCircle className="size-4" />;
      case 'request_submitted': return <FileText className="size-4" />;
      case 'system_update': return <Cpu className="size-4" />;
      default: return <Activity className="size-4" />;
    }
  };

  // Get color for activity type
  const getActivityColor = (type: string) => {
    switch(type) {
      case 'portal_created': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'developer_assigned': return 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30';
      case 'request_approved': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'request_submitted': return 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30';
      case 'system_update': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Header with Quick Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Here's what's happening with your portals and developers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-lg border border-sidebar-border/70 bg-card px-3 py-1.5 text-sm focus:border-primary focus:outline-none dark:border-sidebar-border"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={() => setLoading(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-sidebar-border/70 bg-card px-3 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-sidebar-border"
            >
              <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Portals Card */}
          <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Portals</p>
                <p className="text-3xl font-bold">{stats.portals.total}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="size-3" />
                    <span>{stats.portals.active} active</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    <Clock className="size-3" />
                    <span>{stats.portals.inactive} inactive</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Globe className="size-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Active Portals</span>
                <span>{portalActivePercentage}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${portalActivePercentage}%` }}
                />
              </div>
            </div>
            <Link
              href=""
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all portals
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Developers Card */}
          <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Developers</p>
                <p className="text-3xl font-bold">{stats.developers.total}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <UserCheck className="size-3" />
                    <span>{stats.developers.assigned} assigned</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                    <UserCog className="size-3" />
                    <span>{stats.developers.available} available</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900/30">
                <Users className="size-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Assigned Developers</span>
                <span>{developerAssignmentPercentage}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${developerAssignmentPercentage}%` }}
                />
              </div>
            </div>
            <Link
              href=""
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Manage developers
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Portal Requests Card */}
          <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Portal Requests</p>
                <p className="text-3xl font-bold">{stats.requests.total}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    <Clock className="size-3" />
                    <span>{stats.requests.pending} pending</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                    <AlertCircle className="size-3" />
                    <span>{stats.requests.high_priority} high priority</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900/30">
                <FileText className="size-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Approval Rate</span>
                <span>{requestApprovalPercentage}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${requestApprovalPercentage}%` }}
                />
              </div>
            </div>
            <Link
              href=""
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
            >
              Review requests
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* System Health Card */}
          <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-3xl font-bold">{stats.system.performance}%</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                    <Server className="size-3" />
                    <span>{stats.system.uptime}% uptime</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                    <Database className="size-3" />
                    <span>{formatStorage(stats.system.storage_used)} used</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Activity className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Storage Usage</span>
                <span>{storagePercentage}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${storagePercentage}%` }}
                />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Last updated: Just now
            </div>
          </div>
        </div>

        {/* Charts and Detailed Stats */}
        <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
          {/* Portal Growth Chart */}
          <div className="overflow-hidden rounded-xl border border-sidebar-border/70 lg:col-span-2 dark:border-sidebar-border">
            <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Portal Growth</h3>
                  <p className="text-sm text-muted-foreground">New portals created over time</p>
                </div>
                <TrendingUp className="size-5 text-muted-foreground" />
              </div>
            </div>
            <div className="p-4">
              <div className="h-64">
                {/* Simple bar chart visualization */}
                <div className="flex h-full items-end justify-between gap-2">
                  {charts.portal_growth.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-8 rounded-t-lg bg-primary/20 transition-all hover:bg-primary/30">
                        <div 
                          className="w-full rounded-t-lg bg-primary transition-all duration-500"
                          style={{ 
                            height: `${(item.count / Math.max(...charts.portal_growth.map(g => g.count))) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="mt-2 text-xs text-muted-foreground">{item.month}</span>
                      <span className="text-xs font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">{charts.portal_growth[charts.portal_growth.length - 1]?.count || 0}</span>
                  <span className="text-muted-foreground"> portals this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="size-4" />
                  <span>+12% from last month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Distribution */}
          <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Developer Roles</h3>
                  <p className="text-sm text-muted-foreground">Distribution by specialization</p>
                </div>
                <Code className="size-5 text-muted-foreground" />
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {charts.developer_distribution.map((role, index) => {
                  const percentage = Math.round((role.count / stats.developers.total) * 100);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{role.role}</span>
                        <span className="text-sm text-muted-foreground">{role.count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: index === 0 ? '#3b82f6' : 
                                          index === 1 ? '#10b981' : 
                                          index === 2 ? '#f59e0b' : 
                                          index === 3 ? '#8b5cf6' : '#6b7280'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                <h4 className="mb-2 text-sm font-medium">Top Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {stats.developers.top_skills.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20"
                    >
                      {skill.skill} ({skill.count})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Stats */}
        <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="overflow-hidden rounded-xl border border-sidebar-border/70 lg:col-span-2 dark:border-sidebar-border">
            <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Recent Activity</h3>
                  <p className="text-sm text-muted-foreground">Latest actions across the system</p>
                </div>
                <Activity className="size-5 text-muted-foreground" />
              </div>
            </div>
            <div className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {stats.recent_activity.length === 0 ? (
                  <div className="p-8 text-center">
                    <Activity className="mx-auto size-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No recent activity</p>
                  </div>
                ) : (
                  <div className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                    {stats.recent_activity.map((activity) => (
                      <div key={activity.id} className="p-4 hover:bg-sidebar">
                        <div className="flex items-start gap-3">
                          <div className={`flex size-8 items-center justify-center rounded-lg ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <UserCog className="size-3" />
                                {activity.user}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                {activity.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            {/* Portal Status Breakdown */}
            <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Portal Status</h3>
                    <p className="text-sm text-muted-foreground">Current portal distribution</p>
                  </div>
                  <Layers className="size-5 text-muted-foreground" />
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {stats.portals.by_status.map((status, index) => {
                    const percentage = Math.round((status.count / stats.portals.total) * 100);
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`size-2 rounded-full ${
                            status.status === 'Active' ? 'bg-emerald-500' :
                            status.status === 'Inactive' ? 'bg-red-500' :
                            status.status === 'Maintenance' ? 'bg-amber-500' : 'bg-blue-500'
                          }`} />
                          <span className="text-sm">{status.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{status.count}</span>
                          <span className="text-xs text-muted-foreground">({percentage}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* System Performance */}
            <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Performance</h3>
                    <p className="text-sm text-muted-foreground">System metrics</p>
                  </div>
                  <Zap className="size-5 text-muted-foreground" />
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="font-medium">142ms</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Error Rate</span>
                      <span className="font-medium">0.12%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-full w-1/12 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active Sessions</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-full w-2/3 rounded-full bg-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}