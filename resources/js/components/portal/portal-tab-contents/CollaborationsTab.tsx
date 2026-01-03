import {
  Users,
  Calendar,
  Settings,
} from "lucide-react";

/**
 * Types
 */
type User = {
  avatar: string;
  name: string;
  email: string;
  role: string;
};

type Collaborator = {
  id: number;
  user: User;
  status: "active" | "pending" | "inactive";
  permissions: string[];
  notes?: string;
  start_date?: string;
  end_date?: string;
};

type Props = {
  collaborators: Collaborator[];
};

/**
 * Permission badge colors
 */
const permissionColors: Record<string, string> = {
  read: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  write: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function CollaborationsTab({ collaborators }: Props) {
  return (
    <div className="rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">

      {/* Header */}
      <div className="border-b border-sidebar-border/70 p-6 dark:border-sidebar-border">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Users className="h-5 w-5" />
          Team Collaborations
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {collaborators.length} team members have access to this portal
        </p>
      </div>

      {/* List */}
      <div className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
        {collaborators.map((collab) => (
          <div key={collab.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                  <span className="font-medium text-primary">
                    {collab.user.avatar}
                  </span>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {collab.user.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {collab.user.email}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {collab.user.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    collab.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : collab.status === "pending"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}
                </span>

                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Permissions */}
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Permissions
              </p>
              <div className="flex flex-wrap gap-2">
                {collab.permissions.map((perm) => (
                  <span
                    key={perm}
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      permissionColors[perm] ||
                      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {perm.charAt(0).toUpperCase() + perm.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            {collab.notes && (
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {collab.notes}
              </div>
            )}

            {/* Dates */}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
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

      {/* Footer */}
      <div className="border-t border-sidebar-border/70 p-6 dark:border-sidebar-border">
        <button
          onClick={() => alert("hello")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <Users className="h-4 w-4" />
          Invite New Collaborator
        </button>
      </div>
    </div>
  );
}
