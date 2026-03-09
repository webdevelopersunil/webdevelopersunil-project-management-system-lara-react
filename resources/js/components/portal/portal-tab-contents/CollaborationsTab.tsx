import {
  Users,
  Calendar,
  Settings,
  X,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner"; // Assuming you have sonner for toasts

/**
 * Types
 */
type User = {
  id: number;
  avatar: string;
  name: string;
  email: string;
  role: string;
};

type Collaborator = {
  id: number | string;
  user: User;
  status: "active" | "pending" | "inactive";
  permissions: string[];
  notes?: string;
  start_date?: string;
  end_date?: string;
};

type Developer = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  portal: any;
  collaborators: Collaborator[];
  available_developers: Developer[];
};

/**
 * Permission badge colors
 */
const permissionColors: Record<string, string> = {
  read: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  write: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  manage: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  deploy: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
};

export default function CollaborationsTab({ portal, collaborators, available_developers }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: "",
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    post(route("portal.collaborators.store", portal.id), {
      onSuccess: () => {
        toast.success("Collaborator added successfully");
        setIsModalOpen(false);
        reset();
      },
      onError: () => {
        toast.error("Failed to add collaborator");
      }
    });
  };

  return (
    <>
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
                    <p className="mt-1 text-xs text-primary font-medium capitalize">
                      Role: {collab.user.role || 'User'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`capitalize inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      collab.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : collab.status === "pending"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {collab.status || 'unknown'}
                  </span>
                  
                  {/* Hide settings gear for the owner */}
                  {typeof collab.id === 'string' && collab.id.startsWith('owner_') ? null : (
                    <button className="text-gray-400 hover:text-gray-600 ml-2">
                      <Settings className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Permissions */}
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Permissions
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(collab.permissions) ? collab.permissions : []).map((perm) => (
                    <span
                      key={perm}
                      className={`capitalize inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        permissionColors[perm] ||
                        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {perm}
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
            onClick={() => setIsModalOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Plus className="h-4 w-4" />
            Invite New Collaborator
          </button>
        </div>
      </div>

      {/* Invite Collaborator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl border border-sidebar-border/70 bg-white shadow-xl dark:border-sidebar-border dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
              <h3 className="text-lg font-semibold">Invite Collaborator</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 hover:bg-sidebar text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            
            <form onSubmit={handleInvite} className="p-6">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Select Developer</label>
                <select
                  value={data.user_id}
                  onChange={(e) => setData("user_id", e.target.value)}
                  className="w-full rounded-lg border border-sidebar-border/70 bg-card p-2.5 text-sm focus:border-primary focus:outline-none dark:border-sidebar-border"
                  required
                >
                  <option value="">Select a developer...</option>
                  {(available_developers || []).map((dev) => (
                    <option key={dev.id} value={dev.id}>
                      {dev.name} ({dev.email})
                    </option>
                  ))}
                </select>
                {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
                
                {(!available_developers || available_developers.length === 0) && (
                  <p className="mt-2 text-sm text-muted-foreground italic">
                    No available developers found.
                  </p>
                )}
              </div>
              
              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-sidebar-border/70 px-4 py-2 text-sm font-medium hover:bg-sidebar"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing || !data.user_id}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                >
                  {processing ? 'Inviting...' : 'Invite Collaborator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
