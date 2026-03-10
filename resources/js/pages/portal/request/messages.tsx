import { useState, useRef } from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { toast } from 'sonner';
import {
  ArrowLeft,
  User,
  FileText,
  Download,
  MessageSquare,
  Paperclip,
  Send,
  File,
  RefreshCw,
  Upload,
  Trash2,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';

interface MessagesPageProps {
  portalRequest: any;
}

export default function MessagesPage({ portalRequest }: MessagesPageProps) {
  const { auth } = usePage<SharedData>().props;
  const [newMessage, setNewMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const portal = portalRequest.portal;

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
      href: `/portal-requests`, // assuming this is the correct route to go back
    },
    {
      title: 'Messages',
      href: '#',
    },
  ];

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => file.size <= 10 * 1024 * 1024);
    
    // For comments, let's restrict to 1 file for simplicity matching the text
    if (validFiles.length > 0) {
        setAttachedFiles([{
            id: Date.now() + Math.random(),
            file: validFiles[0],
            name: validFiles[0].name,
            size: validFiles[0].size
        }]);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachedFile = (fileId: number) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('text', newMessage);
      
      if (attachedFiles.length > 0) {
        formData.append('document', attachedFiles[0].file);
      }

      await axios.post(`/portal-requests/${portalRequest.request_uuid}/messages`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      toast.success('Message sent successfully!');
      setNewMessage('');
      setAttachedFiles([]);
      
      router.reload({ only: ['portalRequest'] });
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Request Details - ${portal.name}`} />
      
      <div className="container mx-auto flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 max-w-5xl">
        
        {/* Header Options */}
        <div className="flex items-center justify-between mb-2">
            <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="size-4" />
                Back to Requests
            </button>
        </div>

        {/* Request Overview Card */}
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-gray-900 shadow-sm">
            <div className="border-b border-sidebar-border/70 p-6 dark:border-sidebar-border bg-sidebar/30">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityColor(portalRequest.priority)}`}>
                                {portalRequest.priority} Priority
                            </span>
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusColor(portalRequest.status)}`}>
                                Status: {portalRequest.status}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="size-3" />
                                {formatDate(portalRequest.created_at)}
                            </span>
                        </div>
                        <h1 className="text-xl font-semibold mb-2">Request Details</h1>
                        <p className="text-sm text-foreground whitespace-pre-wrap rounded-lg bg-card border border-sidebar-border/50 p-4">
                            {portalRequest.comments}
                        </p>
                    </div>

                    <div className="flex-shrink-0 min-w-[200px] flex flex-col gap-3">
                        <div className="rounded-lg border border-sidebar-border/70 p-3 bg-card">
                            <p className="text-xs text-muted-foreground mb-1">Submitted by</p>
                            <div className="flex items-center gap-2">
                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-sm font-semibold text-primary">
                                        {portalRequest.submitter?.name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <span className="text-sm font-medium">{portalRequest.submitter?.name || 'Unknown User'}</span>
                            </div>
                        </div>

                        {portalRequest.documents && portalRequest.documents.length > 0 && (
                            <div className="rounded-lg border border-sidebar-border/70 p-3 bg-card">
                                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                    <Paperclip className="size-3" /> Attachments
                                </p>
                                <div className="space-y-2">
                                    {portalRequest.documents.map((doc: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center bg-sidebar/50 p-2 rounded text-xs">
                                            <span className="truncate max-w-[120px]" title={doc.original_name || doc.name}>
                                                {doc.original_name || doc.name}
                                            </span>
                                            <a href={doc.path.startsWith('http') ? doc.path : `/storage/${doc.path}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                <Download className="size-3" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Messages Thread */}
        <div className="flex flex-col flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-gray-900 shadow-sm mt-2">
            <div className="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border bg-sidebar/20 flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="size-5 text-primary" />
                    Discussion
                </h2>
                <span className="text-xs font-medium bg-sidebar px-2 py-1 rounded text-muted-foreground border border-sidebar-border/40">
                    {portalRequest.messages?.length || 0} messages
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-sidebar/5 min-h-[400px]">
                {!portalRequest.messages || portalRequest.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-70">
                        <MessageSquare className="size-12 mb-3 stroke-1" />
                        <p>No messages yet. Be the first to comment!</p>
                    </div>
                ) : (
                    portalRequest.messages.map((message: any) => {
                        const isCurrentUser = message.submitted_by === auth.user?.id;
                        
                        return (
                            <div key={message.id} className={`flex gap-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className="flex-shrink-0">
                                    <div className={`size-10 rounded-full flex items-center justify-center text-white font-semibold ${isCurrentUser ? 'bg-primary' : 'bg-slate-600'}`}>
                                        {message.submitter?.name?.charAt(0) || 'U'}
                                    </div>
                                </div>
                                <div className={`flex flex-col max-w-[80%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-baseline gap-2 mb-1 px-1">
                                        <span className="text-sm font-medium">{isCurrentUser ? 'You' : message.submitter?.name}</span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            {formatDate(message.created_at)}
                                        </span>
                                    </div>
                                    
                                    <div className={`p-4 rounded-2xl shadow-sm text-sm ${
                                        isCurrentUser 
                                            ? 'bg-primary text-white rounded-tr-none' 
                                            : 'bg-card border border-sidebar-border/70 rounded-tl-none text-foreground'
                                    }`}>
                                        <p className="whitespace-pre-wrap">{message.text}</p>
                                        
                                        {message.document && (
                                            <div className={`mt-3 pt-3 flex items-center gap-3 border-t ${isCurrentUser ? 'border-primary-foreground/20' : 'border-sidebar-border'}`}>
                                                <File className="size-5 opacity-80" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium truncate">{message.document.original_name || message.document.name}</p>
                                                    <p className="text-[10px] opacity-70">{formatFileSize(message.document.size)}</p>
                                                </div>
                                                <a 
                                                    href={message.document.path.startsWith('http') ? message.document.path : `/storage/${message.document.path}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className={`p-1.5 rounded transition-colors ${isCurrentUser ? 'hover:bg-primary-foreground/10 text-white' : 'hover:bg-sidebar-accent text-primary'}`}
                                                    title="Download Attachment"
                                                >
                                                    <Download className="size-4" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Message Input Box */}
            <div className="border-t border-sidebar-border/70 p-4 dark:border-sidebar-border bg-card">
                <form onSubmit={handleSubmitMessage} className="flex flex-col gap-3">
                    {attachedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-1">
                            {attachedFiles.map(file => (
                                <div key={file.id} className="flex items-center gap-2 bg-sidebar border border-sidebar-border rounded-full px-3 py-1.5 text-xs">
                                    <File className="size-3" />
                                    <span className="max-w-[150px] truncate">{file.name}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => removeAttachedFile(file.id)}
                                        className="text-red-500 hover:text-red-700 p-0.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950"
                                    >
                                        <Trash2 className="size-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="flex items-end gap-2 relative">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-shrink-0 p-3 rounded-xl border border-sidebar-border/70 bg-sidebar text-muted-foreground hover:bg-sidebar-accent hover:text-primary transition-colors h-[52px]"
                            title="Attach File"
                        >
                            <Paperclip className="size-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type an update or comment..."
                            className="flex-1 min-h-[52px] max-h-[150px] rounded-xl border border-sidebar-border/70 bg-sidebar/30 p-3.5 text-sm focus:border-primary focus:outline-none resize-y"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    if (newMessage.trim()) handleSubmitMessage(e);
                                }
                            }}
                        />
                        
                        <button
                            type="submit"
                            disabled={submitting || !newMessage.trim()}
                            className="flex-shrink-0 p-3 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-colors h-[52px]"
                            title="Send Message"
                        >
                            {submitting ? <RefreshCw className="size-5 animate-spin" /> : <Send className="size-5" />}
                        </button>
                    </div>
                    <div className="text-[10px] text-muted-foreground px-1 pl-14">
                        Press Enter to send, Shift+Enter for new line
                    </div>
                </form>
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
