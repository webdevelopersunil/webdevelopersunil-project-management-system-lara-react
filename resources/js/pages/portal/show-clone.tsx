// portal/show.tsx
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
  Globe,
  Server,
  Database,
  Cpu,
  Shield,
  Users,
  Calendar,
  Link,
  Activity,
  Folder,
  Code,
  Terminal,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Upload,
  Download,
  ExternalLink,
  Eye,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Key,
  Wrench,
  Bell,
  Lock,
  Unlock,
  BarChart3,
  Network,
  HardDrive,
  MemoryStick,
  Cloud,
  Zap,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Portals',
    href: dashboard().url,
  },
  {
    title: 'Portal Details',
    href: '#',
  },
];

// Mock data for portal details
const portalData = {
  id: 1,
  name: 'Customer Portal Pro',
  description: 'Advanced customer management portal with AI-powered insights and real-time analytics dashboard.',
  owner: {
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    role: 'System Administrator'
  },
  url: 'https://portal.customerpro.com',
  domain: 'customerpro.com',
  ip_address: '192.168.1.100',
  status: 'completed',
  active: true,
  server_backup: true,
  db_backup: true,
  migrate_to_new_server: false,
  is_public: true,
  framework: 'Laravel',
  framework_version: 10.2,
  database: 'MySQL',
  database_version: 8.0,
  vm_name: 'vm-customerpro-01',
  machine_type: 'Ubuntu',
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-03-20T14:15:00Z',
  stats: {
    uptime: '99.9%',
    response_time: '145ms',
    daily_visitors: 12500,
    storage_used: '78%',
    monthly_growth: '24%'
  }
};

// Mock collaborations data
const collaborations = [
  {
    id: 1,
    user: {
      name: 'Sarah Chen',
      email: 'sarah.chen@dev.com',
      avatar: 'SC',
      role: 'Lead Developer'
    },
    permissions: ['view', 'edit', 'deploy', 'manage'],
    status: 'active',
    start_date: '2024-01-20',
    end_date: '2024-12-31',
    notes: 'Primary developer for core features'
  },
  {
    id: 2,
    user: {
      name: 'Mike Rodriguez',
      email: 'mike.rod@dev.com',
      avatar: 'MR',
      role: 'DevOps Engineer'
    },
    permissions: ['view', 'deploy', 'monitor'],
    status: 'active',
    start_date: '2024-02-10',
    end_date: null,
    notes: 'Server maintenance and deployments'
  },
  {
    id: 3,
    user: {
      name: 'Emma Wilson',
      email: 'emma.w@design.com',
      avatar: 'EW',
      role: 'UI/UX Designer'
    },
    permissions: ['view', 'edit'],
    status: 'pending',
    start_date: null,
    end_date: null,
    notes: 'Design system updates'
  },
  {
    id: 4,
    user: {
      name: 'David Park',
      email: 'david.park@qa.com',
      avatar: 'DP',
      role: 'QA Engineer'
    },
    permissions: ['view', 'test'],
    status: 'active',
    start_date: '2024-03-01',
    end_date: '2024-06-30',
    notes: 'Automated testing setup'
  }
];

// Status badge configuration
const statusConfig = {
  completed: {
    color: 'bg-emerald-500',
    text: 'Completed',
    icon: CheckCircle
  },
  pending: {
    color: 'bg-amber-500',
    text: 'Pending',
    icon: Clock
  },
  'in-progress': {
    color: 'bg-blue-500',
    text: 'In Progress',
    icon: Settings
  }
};

// Permission badges configuration
const permissionColors = {
  view: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  edit: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  deploy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  manage: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  monitor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  test: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
};

export default function PortalShow() {
  const [activeTab, setActiveTab] = useState('overview');

  const StatusBadge = ({ status }: { status: keyof typeof statusConfig }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white ${config.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {config.text}
      </span>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`${portalData.name} - Portal Details`} />
      
      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 dark:from-primary/20">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8">
            <PlaceholderPattern className="size-full stroke-primary/10 dark:stroke-primary/20" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {portalData.name}
                  </h1>
                  <div className="mt-1 flex items-center gap-3">
                    <StatusBadge status={portalData.status as keyof typeof statusConfig} />
                    {portalData.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle className="h-3 w-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        <XCircle className="h-3 w-3" /> Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="max-w-2xl text-gray-600 dark:text-gray-400">
                {portalData.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Eye className="h-4 w-4" />
                View Live
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90">
                <Edit className="h-4 w-4" />
                Edit Portal
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2.5 dark:bg-emerald-900/30">
                <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Uptime</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {portalData.stats.uptime}
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-900/30">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Response Time</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {portalData.stats.response_time}
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2.5 dark:bg-purple-900/30">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Visitors</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {portalData.stats.daily_visitors.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-2.5 dark:bg-amber-900/30">
                <HardDrive className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Storage Used</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {portalData.stats.storage_used}
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2.5 dark:bg-green-900/30">
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Growth</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  +{portalData.stats.monthly_growth}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-sidebar-border/70 dark:border-sidebar-border">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'configuration', 'collaborations', 'monitoring', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Portal Details */}
          <div className="space-y-6 lg:col-span-2">
            {activeTab === 'overview' && (
              <>
                {/* Basic Information Card */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <Globe className="h-5 w-5" />
                    Portal Information
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Domain</p>
                        <p className="mt-1 flex items-center gap-2 text-gray-900 dark:text-white">
                          <Link className="h-4 w-4" />
                          <a href={`https://${portalData.domain}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            {portalData.domain}
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Full URL</p>
                        <p className="mt-1 flex items-center gap-2 text-gray-900 dark:text-white">
                          <ExternalLink className="h-4 w-4" />
                          <a href={portalData.url} target="_blank" rel="noopener noreferrer" className="truncate hover:text-primary">
                            {portalData.url}
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">IP Address</p>
                        <p className="mt-1 text-gray-900 dark:text-white">{portalData.ip_address}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</p>
                        <p className="mt-1 flex items-center gap-2 text-gray-900 dark:text-white">
                          <Calendar className="h-4 w-4" />
                          {new Date(portalData.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                        <p className="mt-1 flex items-center gap-2 text-gray-900 dark:text-white">
                          <Calendar className="h-4 w-4" />
                          {new Date(portalData.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Visibility</p>
                        <p className="mt-1 flex items-center gap-2">
                          {portalData.is_public ? (
                            <>
                              <Globe className="h-4 w-4 text-green-500" />
                              <span className="text-green-600 dark:text-green-400">Public</span>
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 text-amber-500" />
                              <span className="text-amber-600 dark:text-amber-400">Private</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Stack Card */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <Code className="h-5 w-5" />
                    Technical Stack
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                          <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Framework</p>
                          <p className="text-gray-900 dark:text-white">
                            {portalData.framework} v{portalData.framework_version}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                          <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Database</p>
                          <p className="text-gray-900 dark:text-white">
                            {portalData.database} v{portalData.database_version}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                          <Server className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Server Type</p>
                          <p className="text-gray-900 dark:text-white">{portalData.machine_type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
                          <Terminal className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Virtual Machine</p>
                          <p className="text-gray-900 dark:text-white">{portalData.vm_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'collaborations' && (
              <div className="rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                <div className="border-b border-sidebar-border/70 p-6 dark:border-sidebar-border">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <Users className="h-5 w-5" />
                    Team Collaborations
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {collaborations.length} team members have access to this portal
                  </p>
                </div>
                
                <div className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                  {collaborations.map((collab) => (
                    <div key={collab.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                            <span className="font-medium text-primary">{collab.user.avatar}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{collab.user.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{collab.user.email}</p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{collab.user.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                            collab.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : collab.status === 'pending'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Permissions</p>
                        <div className="flex flex-wrap gap-2">
                          {collab.permissions.map((perm) => (
                            <span 
                              key={perm} 
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${permissionColors[perm as keyof typeof permissionColors] || 'bg-gray-100 text-gray-800'}`}
                            >
                              {perm.charAt(0).toUpperCase() + perm.slice(1)}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {collab.notes && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{collab.notes}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                        {collab.start_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Started {new Date(collab.start_date).toLocaleDateString()}
                          </span>
                        )}
                        {collab.end_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Ends {new Date(collab.end_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-sidebar-border/70 p-6 dark:border-sidebar-border">
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <Users className="h-4 w-4" />
                    Invite New Collaborator
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar Cards */}
          <div className="space-y-6">
            {/* Owner Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <User className="h-5 w-5" />
                Portal Owner
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{portalData.owner.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{portalData.owner.role}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{portalData.owner.email}</span>
                  </div>
                </div>
                <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <Mail className="h-4 w-4" />
                  Contact Owner
                </button>
              </div>
            </div>

            {/* Backup Status Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Shield className="h-5 w-5" />
                Backup Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Server Backup</span>
                  </div>
                  {portalData.server_backup ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Database Backup</span>
                  </div>
                  {portalData.db_backup ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Migration Ready</span>
                  </div>
                  {portalData.migrate_to_new_server ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <span className="text-xs text-gray-500">Not Required</span>
                  )}
                </div>
              </div>
              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90">
                <Shield className="h-4 w-4" />
                Configure Backups
              </button>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Zap className="h-5 w-5" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Analytics
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Logs
                  </span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                  <span className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Set Alerts
                  </span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-red-200 p-3 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Portal
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}