import {
  Globe,
  Server,
  Database,
  Calendar,
  Link,
  Code,
  Terminal,
  ExternalLink,
  Lock,
} from "lucide-react";

/**
 * Portal type
 */
type Portal = {
  domain: string;
  url: string;
  ip_address: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  framework: string;
  framework_version: string;
  database: string;
  database_version: string;
  machine_type: string;
  vm_name: string;
};

/**
 * Props type
 */
type Props = {
  portal: Portal;
};

export default function Informationtab({ portal }: Props) {
  return (
    <>
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
                    <a href={`https://${portal.domain}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {portal.domain}
                    </a>
                </p>
                </div>
                <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Full URL</p>
                <p className="mt-1 flex items-center gap-2 text-gray-900 dark:text-white">
                    <ExternalLink className="h-4 w-4" />
                    <a href={portal.url} target="_blank" rel="noopener noreferrer" className="truncate hover:text-primary">
                    {portal.url}
                    </a>
                </p>
                </div>
                <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">IP Address</p>
                <p className="mt-1 text-gray-900 dark:text-white">{portal.ip_address}</p>
                </div>
            </div>
            <div className="space-y-3">
                <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</p>
                <p className="mt-1 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Calendar className="h-4 w-4" />
                    {new Date(portal.created_at).toLocaleDateString('en-US', {
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
                    {new Date(portal.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    })}
                </p>
                </div>
                <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Visibility</p>
                <p className="mt-1 flex items-center gap-2">
                    {portal.is_public ? (
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
                    {portal.framework} v{portal.framework_version}
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
                    {portal.database} v{portal.database_version}
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Machine Type</p>
                    <p className="text-gray-900 dark:text-white">{portal.machine_type}</p>
                </div>
                </div>
                <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
                    <Terminal className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Virtual Machine</p>
                    <p className="text-gray-900 dark:text-white">{portal.vm_name}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  );
}
