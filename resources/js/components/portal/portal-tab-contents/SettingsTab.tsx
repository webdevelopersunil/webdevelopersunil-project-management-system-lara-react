import {  Settings, Bell } from 'lucide-react';

/**
 * Portal type
 */
type Portal = {
  name: string;
  status: boolean;
};

/**
 * Props type
 */
type Props = {
  portal: Portal;
};

export default function SettingsTab( { portal }: Props ){

    return(

        <div className="space-y-6">

            <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Settings className="h-5 w-5" />
                General Settings
                </h2>
                <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Portal Name</label>
                    <input
                        type="text"
                        defaultValue={11}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
                    />
                    </div>
                    <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800">
                        <option>UTC</option>
                        <option>America/New_York</option>
                        <option>Europe/London</option>
                    </select>
                    </div>
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                    <input
                    type="email"
                    defaultValue={portal.name}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
                    />
                </div>
                </div>
            </div>

            <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Bell className="h-5 w-5" />
                Notifications
                </h2>
                <div className="space-y-3">
                <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Email Alerts</span>
                    <input
                    type="checkbox"
                    defaultChecked={portal.status}
                    className="h-4 w-4 rounded border-gray-300"
                    />
                </label>
                <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Slack Alerts</span>
                    <input
                    type="checkbox"
                    defaultChecked={portal.status}
                    className="h-4 w-4 rounded border-gray-300"
                    />
                </label>
                <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">System Down Alerts</span>
                    <input
                    type="checkbox"
                    defaultChecked={portal.status}
                    className="h-4 w-4 rounded border-gray-300"
                    />
                </label>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3">
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-700">
                    Cancel
                </button>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90">
                    Save Changes
                </button>
            </div>

        </div>
    )
}