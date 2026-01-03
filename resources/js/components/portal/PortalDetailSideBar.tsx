import { 
  Server,
  Database,
  Shield,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  ExternalLink,
  Eye,
  Trash2,
  User,
  Mail,
  Bell,
  Zap,
} from 'lucide-react';

/**
 * Portal type
 */
type Portal = {
  name: string;
  status: boolean;
  server_backup: boolean;
  db_backup: boolean;
  migrate_to_new_server: boolean;
};

/**
 * Owner type
 */
type Owner = {
    name: string;
    email: string;
}

/**
 * Props type
 */
type Props = {
  portal: Portal;
  owner: Owner;
};

export default function PortalDetailSideBar( {portal, owner} : Props){

    return (
        <>
            <div className="space-y-6">

                {/* Owner Card */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <User className="h-5 w-5" />
                    Portal Developer
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                        <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{owner.name}</h3>
                        <p className="text-sm text-border text-gray-600 dark:text-gray-400">{owner?.email.toUpperCase()}</p>
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
                    {portal.server_backup ? (
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
                    {portal.db_backup ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Migrated To New Server {portal.migrate_to_new_server}</span>
                    </div>
                    {portal.migrate_to_new_server == true ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                        <span className="text-xs text-gray-500">Not Required</span>
                    )}

                    </div>
                </div>
                <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
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
        </>
    )
}