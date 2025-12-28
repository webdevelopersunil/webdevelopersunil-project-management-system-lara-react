import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard, portals, developers, portalRequests } from '@/routes';
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
  Calendar,
  ChevronRight,
  BarChart2,
  Cpu as CpuIcon,
  Shield as ShieldIcon,
  Download,
  Upload,
  Target,
  PieChart,
  LineChart,
  Award,
  TrendingDown,
  CheckSquare,
  AlertTriangle,
  Briefcase,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  DownloadCloud,
  Battery,
  HardDrive,
  Network,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Star,
  ThumbsUp,
  Users as UsersIcon,
  GitBranch,
  Code2,
  Terminal,
  Wrench,
  ShieldCheck,
  Database as DatabaseIcon,
  Cloud,
  Smartphone,
  Monitor,
  Globe as GlobeIcon,
  Key,
  Lock,
  Unlock,
  Eye as EyeIcon,
  EyeOff,
  Zap as ZapIcon,
  BatteryCharging,
  Thermometer,
  Wind,
  Droplets,
  Gauge,
  Cpu as CpuGauge,
  MemoryStick,
  HardDrive as HardDriveIcon,
} from 'lucide-react';

interface DashboardProps {
  overview: {
    total_portals: number;
    active_developers: number;
    pending_requests: number;
    system_uptime: number;
    completion_rate: number;
    avg_response_time: string;
  };
  portals: {
    total: number;
    active: number;
    inactive: number;
    monthly_growth: number;
    status_distribution: Array<{ label: string; value: number; color: string }>;
    by_category: Array<{ category: string; count: number }>;
    recently_created: Array<{ name: string; date: string; status: string }>;
  };
  developers: {
    total: number;
    available: number;
    assigned: number;
    utilization_rate: number;
    top_performers: Array<{ name: string; role: string; completed_tasks: number }>;
    skills_distribution: Array<{ skill: string; count: number; percentage: number }>;
    active_projects: number;
  };
  requests: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    avg_processing_time: string;
    priority_distribution: Array<{ priority: string; count: number; color: string }>;
    trend_this_week: Array<{ day: string; requests: number }>;
    awaiting_review: number;
  };
  system: {
    performance: {
      score: number;
      status: string;
      response_time: string;
      error_rate: string;
    };
    resources: {
      cpu_usage: number;
      memory_usage: number;
      storage: {
        used: number;
        total: number;
        unit: string;
        percentage: number;
      };
      database_connections: number;
    };
    health: {
      uptime: string;
      last_backup: string;
      security_status: string;
      updates_available: number;
    };
  };
  insights: {
    portal_traffic_growth: number;
    developer_productivity: number;
    request_approval_rate: number;
    system_reliability: number;
  };
  timeline: {
    recent_activity: Array<{
      id: number;
      type: string;
      title: string;
      description: string;
      user: string;
      avatar: string;
      timestamp: string;
      status: string;
    }>;
    upcoming_tasks: Array<{
      id: number;
      task: string;
      due_date: string;
      priority: string;
      assigned_to: string;
    }>;
  };
  metrics: {
    monthly_portal_growth: Array<{ month: string; portals: number; growth: number }>;
    developer_workload: Array<{ department: string; assigned: number; capacity: number }>;
    request_resolution_time: Array<{ priority: string; avg_time: string }>;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

// Helper Components
const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  trend = 'up', 
  subtitle, 
  color = 'primary' 
}: { 
  title: string;
  value: string | number;
  icon: any;
  change?: number;
  trend?: 'up' | 'down';
  subtitle?: string;
  color?: string;
}) => (
  <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-bold">{value}</p>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        {change !== undefined && (
          <div className="mt-3 flex items-center gap-1">
            <div className={`flex items-center ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              {trend === 'up' ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
              <span className="text-sm font-medium">{change}%</span>
            </div>
            <span className="text-xs text-muted-foreground">from last month</span>
          </div>
        )}
      </div>
      <div className={`rounded-lg p-3 ${
        color === 'primary' ? 'bg-primary/10 text-primary' :
        color === 'emerald' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
        color === 'amber' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
      }`}>
        <Icon className="size-5" />
      </div>
    </div>
  </div>
);

const ProgressBar = ({ value, color, label, showValue = true }: { 
  value: number; 
  color: string; 
  label?: string; 
  showValue?: boolean;
}) => (
  <div className="space-y-2">
    {label && (
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        {showValue && <span className="font-medium">{value}%</span>}
      </div>
    )}
    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div 
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

export default function Dashboard({ 
  overview, 
  portals, 
  developers, 
  requests, 
  system, 
  insights, 
  timeline, 
  metrics 
}: DashboardProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your system today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-sidebar-border/70 bg-card px-3 py-2">
              <CalendarIcon className="size-4" />
              <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <button
              onClick={() => setLoading(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-sidebar-border/70 bg-card px-4 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-sidebar-border"
            >
              <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Portals"
            value={overview.total_portals}
            icon={Globe}
            change={portals.monthly_growth}
            trend="up"
            subtitle={`${portals.active} active`}
            color="primary"
          />
          <StatCard
            title="Active Developers"
            value={overview.active_developers}
            icon={Users}
            change={12.3}
            trend="up"
            subtitle={`${developers.available} available`}
            color="emerald"
          />
          <StatCard
            title="Pending Requests"
            value={overview.pending_requests}
            icon={FileText}
            change={-5.2}
            trend="down"
            subtitle={`${requests.awaiting_review} awaiting review`}
            color="amber"
          />
          <StatCard
            title="System Uptime"
            value={`${overview.system_uptime}%`}
            icon={Server}
            change={0.3}
            trend="up"
            subtitle="Last 30 days"
            color="blue"
          />
        </div>

        {/* Charts & Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portal Growth Chart */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Portal Growth</h3>
                  <p className="text-sm text-muted-foreground">Monthly portal creation trend</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="rounded-lg border border-sidebar-border/70 bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none dark:border-sidebar-border"
                  >
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                </div>
              </div>
              <div className="h-64">
                <div className="flex h-full items-end justify-between gap-1">
                  {metrics.monthly_portal_growth.slice(-6).map((item, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center">
                      <div className="group relative w-full">
                        <div 
                          className="w-full rounded-t-lg bg-primary/20 transition-all hover:bg-primary/30"
                          style={{ height: '150px' }}
                        >
                          <div 
                            className="w-full rounded-t-lg bg-primary transition-all duration-500"
                            style={{ 
                              height: `${(item.portals / 100) * 100}%`,
                              opacity: 0.7 + (index * 0.05)
                            }}
                          />
                        </div>
                        <div className="absolute bottom-full mb-2 hidden w-32 rounded-lg bg-popover p-2 text-xs shadow-lg group-hover:block">
                          <div className="font-medium">{item.month}</div>
                          <div className="text-muted-foreground">{item.portals} portals</div>
                          <div className={`flex items-center ${item.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {item.growth > 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                            <span>{Math.abs(item.growth)}% growth</span>
                          </div>
                        </div>
                      </div>
                      <span className="mt-2 text-xs font-medium">{item.month}</span>
                      <span className="text-xs text-muted-foreground">{item.portals}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Health & Resources */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* System Performance */}
              <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">System Health</h3>
                    <p className="text-sm text-muted-foreground">Real-time performance metrics</p>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-xs font-medium ${
                    system.performance.status === 'excellent' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    system.performance.status === 'good' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {system.performance.status}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Gauge className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Performance Score</p>
                        <p className="text-xs text-muted-foreground">Overall system performance</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{system.performance.score}/100</div>
                  </div>
                  <ProgressBar value={system.performance.score} color="#3b82f6" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Response Time</span>
                        <span className="text-sm font-medium">{system.performance.response_time}</span>
                      </div>
                      <ProgressBar value={90} color="#10b981" showValue={false} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Error Rate</span>
                        <span className="text-sm font-medium">{system.performance.error_rate}</span>
                      </div>
                      <ProgressBar value={99} color="#ef4444" showValue={false} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Resource Usage</h3>
                    <p className="text-sm text-muted-foreground">Current system resources</p>
                  </div>
                  <CpuIcon className="size-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CpuGauge className="size-4 text-blue-600" />
                        <span className="text-sm">CPU Usage</span>
                      </div>
                      <span className="text-sm font-medium">{system.resources.cpu_usage}%</span>
                    </div>
                    <ProgressBar value={system.resources.cpu_usage} color="#3b82f6" />
                  </div>
                  
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MemoryStick className="size-4 text-purple-600" />
                        <span className="text-sm">Memory Usage</span>
                      </div>
                      <span className="text-sm font-medium">{system.resources.memory_usage}%</span>
                    </div>
                    <ProgressBar value={system.resources.memory_usage} color="#8b5cf6" />
                  </div>
                  
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDriveIcon className="size-4 text-emerald-600" />
                        <span className="text-sm">Storage</span>
                      </div>
                      <span className="text-sm font-medium">
                        {system.resources.storage.used}/{system.resources.storage.total} {system.resources.storage.unit}
                      </span>
                    </div>
                    <ProgressBar value={system.resources.storage.percentage} color="#10b981" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Quick Stats */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                  <p className="text-sm text-muted-foreground">Latest system events</p>
                </div>
                <Activity className="size-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {timeline.recent_activity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`flex size-10 items-center justify-center rounded-full ${
                      activity.status === 'success' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      activity.status === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      <span className="text-sm font-medium">{activity.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">By {activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Distribution */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Team Overview</h3>
                  <p className="text-sm text-muted-foreground">Developer utilization</p>
                </div>
                <UsersIcon className="size-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                <div className="rounded-lg bg-sidebar p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Utilization Rate</p>
                      <p className="text-2xl font-bold">{developers.utilization_rate}%</p>
                    </div>
                    <div className="relative size-16">
                      <svg className="size-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeDasharray={`${developers.utilization_rate}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold">{developers.utilization_rate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {developers.skills_distribution.slice(0, 4).map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="size-4 text-muted-foreground" />
                        <span className="text-sm">{skill.skill}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{skill.count}</span>
                        <span className="text-xs text-muted-foreground">({skill.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Insights & Tasks */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Quick Insights */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Performance Insights</h3>
                <p className="text-sm text-muted-foreground">Key metrics overview</p>
              </div>
              <TrendingUp className="size-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {[
                { label: 'Portal Traffic', value: insights.portal_traffic_growth, icon: Globe, color: 'text-blue-600' },
                { label: 'Developer Productivity', value: insights.developer_productivity, icon: Users, color: 'text-emerald-600' },
                { label: 'Request Approval', value: insights.request_approval_rate, icon: CheckCircle, color: 'text-green-600' },
                { label: 'System Reliability', value: insights.system_reliability, icon: ShieldCheck, color: 'text-purple-600' },
              ].map((insight, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${insight.color.replace('text-', 'bg-')}/10`}>
                      <insight.icon className={`size-4 ${insight.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{insight.label}</p>
                      <p className="text-xs text-muted-foreground">Monthly growth</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${insight.value > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {insight.value > 0 ? '+' : ''}{insight.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
                <p className="text-sm text-muted-foreground">Action items & deadlines</p>
              </div>
              <Calendar className="size-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {timeline.upcoming_tasks.map((task) => (
                <div key={task.id} className="rounded-lg border border-sidebar-border/70 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-muted-foreground">Assigned to: {task.assigned_to}</p>
                    </div>
                    <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="size-4" />
                      <span>Due {task.due_date}</span>
                    </div>
                    <button className="text-sm font-medium text-primary hover:underline">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portal Status */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Portal Status</h3>
                <p className="text-sm text-muted-foreground">Current portal distribution</p>
              </div>
              <Layers className="size-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-emerald-500" />
                  <span className="text-sm">Active Portals</span>
                </div>
                <span className="font-medium">{portals.active}</span>
              </div>
              
              <div className="space-y-3">
                {portals.status_distribution.map((status, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full" style={{ backgroundColor: status.color }} />
                      <span className="text-sm">{status.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{status.value}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round((status.value / portals.total) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="mb-2 text-sm font-medium">Recently Created</h4>
                <div className="space-y-2">
                  {portals.recently_created.map((portal, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm truncate">{portal.name}</span>
                      <span className="text-xs text-muted-foreground">{portal.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}