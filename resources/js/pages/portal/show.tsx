// portal/show.tsx
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { router } from "@inertiajs/react";
import Blocks from '@/components/portal/Blocks';
import Collaborations from '@/components/portal/portal-tab-contents/CollaborationsTab';
import Informationtab from '@/components/portal/portal-tab-contents/InformationTab';
import SettingsTab  from '@/components/portal/portal-tab-contents/SettingsTab';
import PortalDetailSideBar from '@/components/portal/PortalDetailSideBar';

type props = {
  portal: any;
  owner: any;
  collaborators: any;
}

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
    href: '/portals',
  },
  {
    title: 'Portal Details',
    href: '#',
  },
];

// Configuration data
const configurationData = {
  server: {
    cpu_cores: 8,
    memory_gb: 32,
    storage_gb: 500,
    os_version: 'Ubuntu 22.04 LTS',
    kernel_version: '5.15.0-91-generic',
    php_version: '8.2',
    node_version: '18.17.0',
    redis_enabled: true,
    varnish_enabled: false,
    load_balancer: 'nginx'
  },
  network: {
    firewall: 'enabled',
    ssl_cert: 'Let\'s Encrypt',
    ssl_expiry: '2024-06-30',
    cdn: 'Cloudflare',
    ddos_protection: true,
    bandwidth_limit: '100 GB/month',
    ports_open: [80, 443, 22]
  },
  security: {
    two_factor_auth: true,
    password_policy: 'strict',
    session_timeout: '30 minutes',
    audit_logging: true
  }
};


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

const goToEdit = async (id:any) => {
  router.get(`/portals/${id}/edit`);
};

export default function PortalShow( { portal, owner, collaborators } : props ) {
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
      <Head title={`${portal.name} - Portal Details`} />
      
      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 dark:from-primary/20">
          
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {portal.name}
                  </h1>
                  <div className="mt-1 flex items-center gap-3">
                    <StatusBadge status={portal.status as keyof typeof statusConfig} />
                    {portal.active ? (
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
                {portal.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => { window.open(portal.url, "_blank", "noopener,noreferrer"); }} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Eye className="h-4 w-4" />
                View Live
              </button>
              <button onClick={() => goToEdit(portal.id)} className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
                <Edit className="h-4 w-4" />
                  Edit Portal
              </button>
            </div>
          </div>
        </div>


        {/* Stats Information Blocks */}
        {/* <Blocks portalData={[ { first: "suni" }, { second: "12" } ]} /> */}


        {/* Tabs Navigation */}
        <div className="border-b border-sidebar-border/70 dark:border-sidebar-border">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'collaborations', 'settings'].map((tab) => (
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

            {/* Basic Information Card */}
            {activeTab === 'overview' && ( <Informationtab portal={portal} /> )}

            {/* Collaborations Stack Card */}
            {activeTab === 'collaborations' && ( <Collaborations collaborators={collaborators} /> )}

            {/* Settings Tab */}
            {activeTab === 'settings' && ( <SettingsTab portal={portal} /> )}

          </div>



          {/* Right Column - Sidebar Cards */}
          
            <PortalDetailSideBar portal={portal} owner={owner} />

        </div>
      </div>
    </AppLayout>
  );
}