import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  Shield, 
  UserCog, 
  CheckCircle, 
  XCircle,
  Mail,
  Calendar,
  Key,
  AlertCircle,
  X,
  Plus,
  User,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  onSuccess?: () => void;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  status: string;
  roles: string[];
  permissions: string[];
}

const EditUserModal: React.FC<EditUserModalProps> = ({ 
  isOpen, 
  onClose, 
  userId, 
  onSuccess 
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [allRoles, setAllRoles] = useState<string[]>([]);
  const [allPermissions, setAllPermissions] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [newRole, setNewRole] = useState('');
  const [newPermission, setNewPermission] = useState('');
  const [userStatus, setUserStatus] = useState('active');
  const [showPermissions, setShowPermissions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserData();
    }
  }, [isOpen, userId]);

  // Scroll to bottom when permissions section is shown
  useEffect(() => {
    if (showPermissions && scrollAreaRef.current) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [showPermissions]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/users/${userId}`);
      const { user, all_roles, all_permissions } = response.data;
      
      setUser(user);
      setAllRoles(all_roles);
      setAllPermissions(all_permissions);
      setSelectedRoles(user.roles);
      setSelectedPermissions(user.permissions);
      setUserStatus(user.status);
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleAddRole = () => {
    if (newRole.trim() && !selectedRoles.includes(newRole.trim())) {
      setSelectedRoles(prev => [...prev, newRole.trim()]);
      setNewRole('');
    }
  };

  const handleAddPermission = () => {
    if (newPermission.trim() && !selectedPermissions.includes(newPermission.trim())) {
      setSelectedPermissions(prev => [...prev, newPermission.trim()]);
      setNewPermission('');
    }
  };

  const handleRemoveRole = (role: string) => {
    setSelectedRoles(prev => prev.filter(r => r !== role));
  };

  const handleRemovePermission = (permission: string) => {
    setSelectedPermissions(prev => prev.filter(p => p !== permission));
  };

  const handleStatusChange = async (status: string) => {
    try {
      await axios.put(`/users/${userId}/status`, { status });
      setUserStatus(status);
      if (user) {
        setUser({ ...user, status });
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      await axios.put(`/users/${userId}/roles`, {
        roles: selectedRoles,
        permissions: selectedPermissions,
      });

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'admin': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700',
      'project-manager': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700',
      'developer': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700',
      'requestor': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-300 dark:border-cyan-700',
    };
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  };

  const togglePermissions = () => {
    setShowPermissions(!showPermissions);
  };

  if (!isOpen || !userId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] p-0 overflow-hidden flex flex-col">
        <div className="flex flex-col h-full">
          {/* Header - Fixed */}
          <div className="px-6 py-4 border-b flex-shrink-0">
            <DialogHeader className="text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <UserCog className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-semibold">
                      Edit User: {user?.name || 'Loading...'}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                      Manage user roles, permissions, and account status
                    </DialogDescription>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Main Content - Scrollable */}
          <ScrollArea 
            ref={scrollAreaRef}
            className="flex-1 px-6 py-4"
          >
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchUserData}
                  className="mt-4"
                >
                  Retry
                </Button>
              </div>
            ) : user && (
              <div className="space-y-6 pb-4">
                {/* Error Message */}
                {error && (
                  <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  </div>
                )}

                {/* User Info Card */}
                <div className="rounded-lg border bg-card p-5">
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                        <span className="text-lg font-semibold text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold truncate">{user.name}</h3>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Section */}
                    <div className="flex-shrink-0">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="user-status" className="text-sm font-medium">
                            Status:
                          </Label>
                          <select
                            id="user-status"
                            value={userStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </div>
                        <Badge 
                          className={`px-3 py-1.5 text-xs font-medium border ${getStatusColor(userStatus)}`}
                        >
                          {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Email Verification Status */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      {user.email_verified_at ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700">
                          <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                          Email Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700">
                          <XCircle className="mr-1.5 h-3.5 w-3.5" />
                          Email Not Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Roles Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Roles Management</h4>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={togglePermissions}
                      className="gap-2"
                    >
                      <Key className="h-3.5 w-3.5" />
                      {showPermissions ? (
                        <>
                          <ChevronUp className="h-3.5 w-3.5" />
                          Hide Permissions
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3.5 w-3.5" />
                          Show Permissions
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Selected Roles */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Selected Roles</Label>
                    <div className="flex flex-wrap gap-2 min-h-[40px]">
                      {selectedRoles.length === 0 ? (
                        <div className="text-sm text-gray-500 italic px-3 py-2">
                          No roles assigned
                        </div>
                      ) : (
                        selectedRoles.map((role) => (
                          <Badge 
                            key={role} 
                            className={`px-3 py-1.5 text-sm font-medium border ${getRoleColor(role)} flex items-center gap-1.5`}
                          >
                            <span>{role}</span>
                            <button
                              onClick={() => handleRemoveRole(role)}
                              className="hover:text-red-600 transition-colors"
                              aria-label={`Remove ${role} role`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Available Roles */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Available Roles</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {allRoles.map((role) => (
                        <div 
                          key={role} 
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedRoles.includes(role)
                              ? 'bg-primary/10 border-primary'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }`}
                          onClick={() => handleRoleToggle(role)}
                        >
                          <Checkbox
                            id={`role-${role}`}
                            checked={selectedRoles.includes(role)}
                            className="h-4 w-4"
                          />
                          <Label
                            htmlFor={`role-${role}`}
                            className="flex-1 cursor-pointer text-sm font-medium truncate"
                          >
                            {role}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Custom Role */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Add Custom Role</Label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="Enter role name"
                        className="flex-1"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
                      />
                      <Button 
                        size="sm" 
                        onClick={handleAddRole}
                        disabled={!newRole.trim()}
                        className="gap-1.5"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Permissions Section (Collapsible) */}
                {showPermissions && (
                  <>
                    <Separator />
                    <div className="space-y-4" id="permissions-section">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Direct Permissions</h4>
                        <Badge variant="outline" className="ml-2">
                          {selectedPermissions.length} selected
                        </Badge>
                      </div>

                      {/* Selected Permissions */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Selected Direct Permissions</Label>
                        <div className="flex flex-wrap gap-2 min-h-[40px]">
                          {selectedPermissions.length === 0 ? (
                            <div className="text-sm text-gray-500 italic px-3 py-2">
                              No direct permissions assigned
                            </div>
                          ) : (
                            selectedPermissions.map((permission) => (
                              <Badge 
                                key={permission}
                                variant="secondary"
                                className="px-3 py-1.5 text-sm font-medium border flex items-center gap-1.5"
                              >
                                <span>{permission}</span>
                                <button
                                  onClick={() => handleRemovePermission(permission)}
                                  className="hover:text-red-600 transition-colors"
                                  aria-label={`Remove ${permission} permission`}
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </Badge>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Available Permissions */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Available Permissions</Label>
                        <ScrollArea className="h-48 rounded-lg border">
                          <div className="grid grid-cols-1 gap-2 p-4">
                            {allPermissions.map((permission) => (
                              <div 
                                key={permission} 
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                  selectedPermissions.includes(permission)
                                    ? 'bg-primary/10 border border-primary'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                                onClick={() => handlePermissionToggle(permission)}
                              >
                                <Checkbox
                                  id={`permission-${permission}`}
                                  checked={selectedPermissions.includes(permission)}
                                  className="h-4 w-4"
                                />
                                <Label
                                  htmlFor={`permission-${permission}`}
                                  className="flex-1 cursor-pointer text-sm truncate"
                                >
                                  {permission}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      {/* Add Custom Permission */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Add Custom Permission</Label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={newPermission}
                            onChange={(e) => setNewPermission(e.target.value)}
                            placeholder="Enter permission name"
                            className="flex-1"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddPermission()}
                          />
                          <Button 
                            size="sm" 
                            onClick={handleAddPermission}
                            disabled={!newPermission.trim()}
                            className="gap-1.5"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Effective Permissions */}
                <div className="rounded-lg border bg-gray-50 dark:bg-gray-800/30 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold">Effective Permissions</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    Permissions inherited from assigned roles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.permissions.length === 0 ? (
                      <div className="text-sm text-gray-500 italic">
                        No permissions available. Assign roles to see permissions.
                      </div>
                    ) : (
                      user.permissions.map((permission) => (
                        <Badge 
                          key={permission} 
                          variant="outline" 
                          className="px-2.5 py-1 text-xs"
                        >
                          {permission}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div className="flex justify-end gap-3 pt-6 pb-2">
                  <Button 
                    variant="outline" 
                    onClick={onClose} 
                    disabled={saving}
                    className="min-w-[80px]"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="min-w-[120px]"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;