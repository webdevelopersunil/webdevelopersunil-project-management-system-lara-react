import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Edit,
  Shield,
  UserCheck,
  UserX,
  Clock,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Key,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EditUserModal from '@/components/users/EditUserModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  status: string;
  roles: string[];
  permissions: string[];
  is_verified: boolean;
  last_login?: string;
}

interface PageProps {
  users: User[];
  availableRoles: string[];
  availablePermissions: string[];
  statistics: {
    total: number;
    active: number;
    pending: number;
    inactive: number;
    verified: number;
    by_role: Record<string, number>;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Users',
    href: '/users',
  },
];

export default function UsersIndex() {
  
  const { props } = usePage<PageProps>();
  const { users: initialUsers, statistics, availableRoles } = props;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  // Refresh users data
  const refreshUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error refreshing users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics from current filtered users
  const currentStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    verified: users.filter(u => u.is_verified).length,
    admins: users.filter(u => u.roles.includes('admin')).length,
    developers: users.filter(u => u.roles.includes('developer')).length,
    projectManagers: users.filter(u => u.roles.includes('project-manager')).length,
    requestors: users.filter(u => u.roles.includes('requestor')).length,
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || 
                       (selectedRole === 'has-role' && user.roles.length > 0) ||
                       (selectedRole === 'no-role' && user.roles.length === 0) ||
                       user.roles.includes(selectedRole);
    
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status badge configuration
  const getStatusBadge = (status: string) => {
    const config = {
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: UserCheck },
      pending: { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock },
      inactive: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300', icon: UserX },
      suspended: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: XCircle }
    }[status] || { color: 'bg-gray-100 text-gray-800', icon: Users };

    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.color}`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Role badge configuration
  const getRoleBadges = (roles: string[]) => {
    if (roles.length === 0) {
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          No Role
        </span>
      );
    }

    return (
      <div className="flex flex-wrap gap-1">
        {roles.map((role) => {
          const colors: Record<string, string> = {
            'admin': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            'project-manager': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            'developer': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            'requestor': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
          };

          return (
            <span 
              key={role}
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                colors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {role}
            </span>
          );
        })}
      </div>
    );
  };

  // Handle edit user
  const handleEditUser = (userId: number) => {
    setEditingUserId(userId);
    setIsEditModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setEditingUserId(null);
  };

  // Handle success after editing
  const handleEditSuccess = () => {
    refreshUsers();
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Management" />
      
      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              User Management
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manage all users and their permissions
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={refreshUsers}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90">
              <UserPlus className="h-4 w-4" />
              Add New User
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Users */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{currentStats.total}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 dark:bg-primary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{currentStats.active}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {currentStats.total > 0 ? Math.round((currentStats.active / currentStats.total) * 100) : 0}% of total
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Verified Users */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Verified Users</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{currentStats.verified}</p>
                <p className="mt-1 text-sm text-gray-500">Email verified</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Role Distribution */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Role Distribution</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Admins</span>
                    <span className="font-medium">{currentStats.admins}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Project Managers</span>
                    <span className="font-medium">{currentStats.projectManagers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Developers</span>
                    <span className="font-medium">{currentStats.developers}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <Key className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table Section */}
        <div className="rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
          {/* Table Header */}
          <div className="border-b border-sidebar-border/70 p-6 dark:border-sidebar-border">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Users</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {filteredUsers.length} users found
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="h-10 w-full rounded-lg border border-gray-300 bg-transparent pl-10 pr-4 text-sm focus:border-primary focus:outline-none dark:border-gray-600 sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Role Filter */}
                <select
                  className="h-10 rounded-lg border border-gray-300 bg-transparent px-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="has-role">Has Role</option>
                  <option value="no-role">No Role</option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                
                {/* Status Filter */}
                <select
                  className="h-10 rounded-lg border border-gray-300 bg-transparent px-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
                
                <button className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 px-3 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-sidebar-border/70 bg-gray-50/50 hover:bg-transparent dark:border-sidebar-border dark:bg-gray-800/50 dark:hover:bg-transparent">
                  <TableHead className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    User
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Status
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Roles
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Email Verified
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Joined
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="border-sidebar-border/70 hover:bg-gray-50/50 dark:border-sidebar-border dark:hover:bg-gray-800/50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                            <span className="font-medium text-white">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>
                      {getRoleBadges(user.roles)}
                    </TableCell>
                    <TableCell>
                      {user.is_verified ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">Pending</span>
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button 
                          className="text-gray-400 hover:text-primary dark:hover:text-primary"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-primary dark:hover:text-primary">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No users found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-sidebar-border/70 px-6 py-4 dark:border-sidebar-border">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredUsers.length}</span> users
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="inline-flex h-8 items-center justify-center rounded-lg border border-gray-300 px-3 text-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-800"
                  >
                    <ChevronLeft className="mr-1 h-3 w-3" />
                    Previous
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                          currentPage === pageNum
                            ? 'bg-primary text-white'
                            : 'border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="inline-flex h-8 items-center justify-center rounded-lg border border-gray-300 px-3 text-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-800"
                  >
                    Next
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        userId={editingUserId}
        onSuccess={handleEditSuccess}
      />
    </AppLayout>
  );
}