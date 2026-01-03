import {
  Activity,
  Zap,
  Users,
  HardDrive,
  BarChart3,
} from "lucide-react";

export default function Blocks({ portalData:[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      
      {/* Uptime */}
      <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-100 p-2.5 dark:bg-emerald-900/30">
            <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Uptime
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              12
            </p>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-900/30">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Response Time
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              13
            </p>
          </div>
        </div>
      </div>

      {/* Daily Visitors */}
      <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2.5 dark:bg-purple-900/30">
            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Daily Visitors
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              23
            </p>
          </div>
        </div>
      </div>

      {/* Storage Used */}
      <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-100 p-2.5 dark:bg-amber-900/30">
            <HardDrive className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Storage Used
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              455
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Growth */}
      <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-100 p-2.5 dark:bg-green-900/30">
            <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Monthly Growth
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              973
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
