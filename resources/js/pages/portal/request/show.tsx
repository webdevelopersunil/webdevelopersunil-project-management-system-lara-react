import { useState, useEffect, useRef } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';
import {
  Globe,
  CheckCircle,
  XCircle,
  Edit,
  Filter,
  Search,
  Calendar,
  User,
  FileText,
  Download,
  MessageSquare,
  Paperclip,
  Send,
  ChevronDown,
  ChevronUp,
  X,
  MoreVertical,
  RefreshCw,
  Upload,
  File,
  Plus,
  Eye,
  Clock,
  AlertCircle,
  Check,
  SlidersHorizontal,
  Trash2
} from 'lucide-react';

interface PortalRequestsPageProps extends PageProps {
  portalRequests: {
    data: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters?: {
    search?: string;
    status?: string;
    priority?: string;
    portal_id?: number;
    per_page?: number;
    sort_by?: string;
    sort_direction?: string;
  };
  portals?: any[];
  statuses?: string[];
  priorities?: string[];
}

export default function PortalRequestsPage({ 
  portalRequests, 
  filters: initialFilters, 
  portals: allPortals,
  statuses,
  priorities 
}: PortalRequestsPageProps) {
  const { auth } = usePage<PageProps>().props;
  
  // Get portal from the first request or use portal_id from filters
  const portal = portalRequests.data[0]?.portal || 
    (initialFilters?.portal_id && allPortals?.find(p => p.id === initialFilters.portal_id)) || 
    { id: 0, name: 'Portal', status: 'Active', active: true };
  
  const [requests, setRequests] = useState<any[]>(portalRequests.data || []);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeRequest, setActiveRequest] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [filters, setFilters] = useState({
    search: initialFilters?.search || '',
    status: initialFilters?.status || '',
    priority: initialFilters?.priority || '',
    sort_by: initialFilters?.sort_by || 'created_at',
    sort_direction: initialFilters?.sort_direction || 'desc'
  });
  
  // Calculate statistics from requests
  const statistics = {
    total_requests: portalRequests.total || 0,
    pending_requests: requests.filter(r => r.status === 'Pending').length,
    approved_requests: requests.filter(r => r.status === 'Approved').length,
    rejected_requests: requests.filter(r => r.status === 'Rejected').length
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Portals',
      href: '/portals',
    },
    {
      title: portal.name,
      href: `/portal-requests`,
    },
    {
      title: 'Requests',
      href: `/portals/${portal.id}/requests`,
    },
  ];

  useEffect(() => {
    applyFilters();
  }, [filters, requests]);

  const applyFilters = () => {
    let filtered = [...requests];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(request => 
        (request.comments?.toLowerCase().includes(searchTerm) || '') ||
        (request.reason?.toLowerCase().includes(searchTerm) || '') ||
        (request.submitter?.name?.toLowerCase().includes(searchTerm) || '')
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(request => request.status === filters.status);
    }
    
    if (filters.priority) {
      filtered = filtered.filter(request => request.priority === filters.priority);
    }
    
    filtered.sort((a, b) => {
      const aVal = a[filters.sort_by];
      const bVal = b[filters.sort_by];
      
      if (filters.sort_direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return filtered;
  };

  const filteredRequests = applyFilters();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => file.size <= 10 * 1024 * 1024);
    
    setAttachedFiles(prev => [...prev, ...validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size
    }))]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachedFile = (fileId: number) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      alert('Please enter a message');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('portal_id', portal.id.toString());
      formData.append('comments', newMessage);
      formData.append('priority', filters.priority || 'Medium');
      
      attachedFiles.forEach((fileObj, index) => {
        formData.append(`documents[${index}]`, fileObj.file);
      });

      router.post('/portal-requests', formData, {
        onSuccess: () => {
          router.reload();
          setShowNewRequestForm(false);
        },
        onError: (errors) => {
          alert('Failed to submit request. Please try again.');
        },
        onFinish: () => {
          setSubmitting(false);
        }
      });
      
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async (requestUuid: string, newStatus: string) => {
    try {
      router.put(`/portal-requests/${requestUuid}/status`, {
        status: newStatus,
        reason: `Status changed to ${newStatus}`
      }, {
        onSuccess: () => {
          router.reload();
        }
      });
      
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Under Review': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1073741824) {
      return (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return bytes + ' bytes';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const goToEdit = async (id:any) => {
    router.get(`/portals/${id}/edit`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`${portal.name} - Requests`} />
      
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-6 md:p-8 dark:border-sidebar-border">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 opacity-20">
            <div className="size-full rounded-full bg-primary/10"></div>
          </div>
          
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                  <Globe className="size-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {portal.name} Requests
                  </h1>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {portal.status}
                    </span>
                    {portal.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle className="size-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        <XCircle className="size-3" /> Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="max-w-2xl text-sm text-gray-600 md:text-base dark:text-gray-400">
                Manage requests and communications for this portal
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => { window.open(portal.url, "_blank", "noopener,noreferrer"); }} className=" inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Eye className="h-4 w-4" />
                View Live
              </button>
              <button onClick={() => goToEdit(portal.id)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90">
                <Edit className="h-4 w-4" />
                  Edit Portal
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content - WIDER layout for request list */}
        <div className="grid auto-rows-min gap-4 lg:grid-cols-4">
          {/* Left Column - Requests List (WIDER - 3 columns) */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              {/* Header with Add Request button */}
              <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Portal Requests</h2>
                    <p className="text-sm text-muted-foreground">
                      {statistics.total_requests} total • {statistics.pending_requests} pending
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Filter Toggle Button */}
                    <button 
                      onClick={() => setShowFilters(!showFilters)}
                      className="inline-flex items-center gap-2 rounded-lg border border-sidebar-border/70 bg-card px-3 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-sidebar-border"
                    >
                      <SlidersHorizontal className="size-4" />
                      Filters
                      {showFilters ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </button>
                    
                    {/* Add Request Button */}
                    <button 
                      onClick={() => setShowNewRequestForm(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                      <Plus className="size-4" />
                      Add Request
                    </button>
                  </div>
                </div>
                
                {/* Search Bar - Always visible */}
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search requests by comment, submitter, or reason..."
                    className="w-full rounded-lg border border-sidebar-border/70 bg-card py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none dark:border-sidebar-border"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
                
                {/* Advanced Filters Panel */}
                {showFilters && (
                  <div className="mt-4 space-y-4 rounded-lg border border-sidebar-border/70 bg-sidebar p-4 dark:border-sidebar-border">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <label className="text-xs font-medium">Status</label>
                        <div className="flex flex-wrap gap-2">
                          {statuses?.map((status) => (
                            <button
                              key={status}
                              onClick={() => setFilters({ ...filters, status: status === 'All' ? '' : status })}
                              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                                filters.status === status
                                  ? 'bg-primary text-white'
                                  : 'border border-sidebar-border/70 bg-card hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-sidebar-border'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-medium">Priority</label>
                        <div className="flex flex-wrap gap-2">
                          {priorities?.map((priority) => (
                            <button
                              key={priority}
                              onClick={() => setFilters({ ...filters, priority: priority === 'All' ? '' : priority })}
                              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                                filters.priority === priority
                                  ? 'bg-primary text-white'
                                  : 'border border-sidebar-border/70 bg-card hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-sidebar-border'
                              }`}
                            >
                              {priority}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-medium">Sort By</label>
                        <div className="flex gap-2">
                          <select
                            value={filters.sort_by}
                            onChange={(e) => setFilters({ ...filters, sort_by: e.target.value })}
                            className="w-full rounded border border-sidebar-border/70 bg-card px-3 py-1.5 text-sm focus:border-primary focus:outline-none dark:border-sidebar-border"
                          >
                            <option value="created_at">Date Created</option>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                          </select>
                          <button
                            onClick={() => setFilters({ ...filters, sort_direction: filters.sort_direction === 'desc' ? 'asc' : 'desc' })}
                            className="rounded border border-sidebar-border/70 bg-card px-3 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-sidebar-border"
                          >
                            {filters.sort_direction === 'desc' ? '↓' : '↑'}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          setFilters({
                            search: '',
                            status: '',
                            priority: '',
                            sort_by: 'created_at',
                            sort_direction: 'desc'
                          });
                        }}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-3" />
                        Clear all filters
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {filteredRequests.length} requests found
                        </span>
                        <button
                          onClick={() => router.reload({ data: filters })}
                          className="rounded bg-primary px-3 py-1.5 text-sm text-white hover:bg-primary/90"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Requests List */}
              <div className="p-0">
                <div className="h-[500px] overflow-y-auto md:h-[600px]">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <RefreshCw className="size-8 animate-spin text-primary" />
                    </div>
                  ) : filteredRequests.length === 0 ? (
                    <div className="p-8 text-center">
                      <MessageSquare className="mx-auto size-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">No requests found</p>
                      {filters.search || filters.status || filters.priority ? (
                        <button
                          onClick={() => {
                            setFilters({
                              search: '',
                              status: '',
                              priority: '',
                              sort_by: 'created_at',
                              sort_direction: 'desc'
                            });
                          }}
                          className="mt-4 text-sm text-primary hover:underline"
                        >
                          Clear filters to see all requests
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowNewRequestForm(true)}
                          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
                        >
                          <Plus className="size-4" />
                          Create your first request
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                      {filteredRequests.map((request) => (
                        <div
                          key={request.uuid || request.id}
                          className={`p-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors ${
                            activeRequest?.id === request.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                          }`}
                          onClick={() => {
                            setActiveRequest(request);
                            setShowNewRequestForm(false);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                  {request.priority}
                                </span>
                                <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusColor(request.status)}`}>
                                  {request.status}
                                </span>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {formatDate(request.created_at)}
                                </span>
                              </div>
                              
                              <p className="text-sm font-medium mb-2 line-clamp-2">
                                {request.comments?.split('\n')[0] || 'No comment'}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <User className="size-3" />
                                    {request.submitter?.name || 'Unknown'}
                                  </span>
                                  {request.documents?.length > 0 && (
                                    <span className="flex items-center gap-1">
                                      <Paperclip className="size-3" />
                                      {request.documents.length} file{request.documents.length > 1 ? 's' : ''}
                                    </span>
                                  )}
                                  {request.reviewed_at && (
                                    <span className="flex items-center gap-1">
                                      <Check className="size-3" />
                                      Reviewed
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveRequest(request);
                                      setShowNewRequestForm(false);
                                    }}
                                    className="rounded p-1 hover:bg-sidebar text-muted-foreground hover:text-foreground"
                                    title="View details"
                                  >
                                    <Eye className="size-4" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Handle download or other actions
                                    }}
                                    className="rounded p-1 hover:bg-sidebar text-muted-foreground hover:text-foreground"
                                    title="Download files"
                                  >
                                    <Download className="size-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Bottom bar with statistics and refresh */}
              <div className="border-t border-sidebar-border/70 p-4 dark:border-sidebar-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Showing {filteredRequests.length} of {requests.length} requests</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-amber-500"></div>
                        <span>{statistics.pending_requests} Pending</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-emerald-500"></div>
                        <span>{statistics.approved_requests} Approved</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => router.reload()}
                    className="inline-flex items-center gap-2 rounded-lg border border-sidebar-border/70 bg-card px-3 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-sidebar-border"
                  >
                    <RefreshCw className="size-4" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Chat & Details OR New Request Form */}
          <div className="lg:col-span-1">
            {activeRequest && !showNewRequestForm ? (
              <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Request Details</h3>
                      <p className="text-xs text-muted-foreground">#{activeRequest.reference || activeRequest.id}</p>
                    </div>
                    <button
                      onClick={() => setActiveRequest(null)}
                      className="rounded p-1 hover:bg-sidebar"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityColor(activeRequest.priority)}`}>
                          {activeRequest.priority}
                        </span>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusColor(activeRequest.status)}`}>
                          {activeRequest.status}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">Submitted by</p>
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {activeRequest.submitter?.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activeRequest.submitter?.name || 'Unknown'}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(activeRequest.created_at)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Comments</p>
                        <div className="rounded-lg bg-sidebar p-3">
                          <p className="text-sm whitespace-pre-wrap">{activeRequest.comments}</p>
                        </div>
                      </div>
                      
                      {activeRequest.reason && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Status Update</p>
                          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                            <p className="text-sm whitespace-pre-wrap">{activeRequest.reason}</p>
                            {activeRequest.reviewed_at && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Reviewed on {formatDate(activeRequest.reviewed_at)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {activeRequest.documents && activeRequest.documents.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Attachments ({activeRequest.documents.length})</p>
                          <div className="space-y-2">
                            {activeRequest.documents.map((doc: any, index: number) => (
                              <div
                                key={doc.id || index}
                                className="flex items-center justify-between rounded-lg border border-sidebar-border/70 p-2 dark:border-sidebar-border"
                              >
                                <div className="flex items-center gap-2">
                                  <File className="size-4" />
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium truncate">{doc.original_name || doc.name}</p>
                                    <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)}</p>
                                  </div>
                                </div>
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded p-1 hover:bg-sidebar"
                                >
                                  <Download className="size-4" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">Update Status</label>
                        <select
                          value={activeRequest.status}
                          onChange={(e) => handleStatusUpdate(activeRequest.uuid || activeRequest.id.toString(), e.target.value)}
                          className="w-full rounded border border-sidebar-border/70 bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-sidebar-border"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      
                      <button
                        onClick={() => {
                          setActiveRequest(null);
                          setShowNewRequestForm(true);
                        }}
                        className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90"
                      >
                        <Plus className="size-4 inline mr-2" />
                        Add New Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">New Request</h3>
                      <p className="text-xs text-muted-foreground">Submit a new request</p>
                    </div>
                    {showNewRequestForm && (
                      <button
                        onClick={() => setShowNewRequestForm(false)}
                        className="rounded p-1 hover:bg-sidebar"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <form onSubmit={handleSubmitRequest} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Priority</label>
                      <select
                        value={filters.priority || 'Medium'}
                        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                        className="w-full rounded border border-sidebar-border/70 bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-sidebar-border"
                        required
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Request Details</label>
                      <textarea
                        placeholder="Describe your request..."
                        className="w-full rounded border border-sidebar-border/70 bg-card p-3 min-h-[120px] text-sm focus:border-primary focus:outline-none dark:border-sidebar-border"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Attachments</label>
                      <div className="space-y-3">
                        <div className="border-2 border-dashed border-sidebar-border/70 rounded-lg p-4 text-center dark:border-sidebar-border">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                            multiple
                          />
                          <Upload className="mx-auto size-8 text-muted-foreground" />
                          <p className="mt-2 text-xs font-medium">Drop files or click to upload</p>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-2 text-xs text-primary hover:underline"
                          >
                            Select Files
                          </button>
                        </div>
                        
                        {attachedFiles.length > 0 && (
                          <div className="space-y-2">
                            {attachedFiles.map((file) => (
                              <div
                                key={file.id}
                                className="flex items-center justify-between rounded-lg border border-sidebar-border/70 p-2 dark:border-sidebar-border"
                              >
                                <div className="flex items-center gap-2">
                                  <File className="size-4" />
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeAttachedFile(file.id)}
                                  className="rounded p-1 hover:bg-red-50 text-red-600 dark:hover:bg-red-900/30"
                                >
                                  <Trash2 className="size-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submitting || !newMessage.trim()}
                      className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="size-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Submit Request
                        </>
                      )}
                    </button>
                    
                    {activeRequest && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewRequestForm(false);
                          setActiveRequest(null);
                        }}
                        className="w-full rounded-lg border border-sidebar-border/70 bg-card py-2.5 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-sidebar-border"
                      >
                        Cancel
                      </button>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}