import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import ConfirmDelete from '@/components/confirm-delete';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Search,
    Plus,
    MoreVertical,
    Edit,
    Eye,
    Info,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Portals',
        href: '/portals',
    },
];


export interface Portal {
 
  id: number;
  name: string;
  description: string | null;
  owner_id: number | null;

  url: string;
  domain: string | null;

  active: boolean;

  ip_address: string | null;

  status: 'completed' | 'pending' | 'in-progress';

  server_backup: boolean;
  db_backup: boolean;
  migrate_to_new_server: boolean;

  vm_name: string | null;

  framework: string | null;
  framework_version: number | null;

  database: string | null;
  database_version: number | null;

  is_public: boolean;

  machine_type:
    | 'Windows'
    | 'RHEL'
    | 'Ubuntu'
    | 'CentOS'
    | 'Other'
    | 'Not-Defined';

  created_at: string;
  updated_at: string;
  deleted_at?: string | null;

  user_count: number;
document_count: number;
}


interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PortalProps {
    portals: Portal[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    filters: {
        search: string;
        status: string;
    };
    links: PaginationLink[];
}

const getDomain = (url:string) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
};


export default function PortalPage({ portals, total, current_page, last_page, per_page, from, to, filters, links  }: PortalProps) {

    const { url } = usePage();
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string };
    };
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setMessageType('success');
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 4000);

            return () => clearTimeout(timer);
        }

        if (flash?.error) {
            setMessage(flash.error);
            setMessageType('error');
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [flash]);



    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Apply filters when they change
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        
        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }
        
        if (status && status !== 'all') {
            params.set('status', status);
        } else {
            params.delete('status');
        }
        
        // Reset to first page when filters change
        params.delete('page');
        
        router.get(`${url.split('?')[0]}?${params.toString()}`, {}, {
            preserveState: true,
            replace: true,
        });
    }, [debouncedSearch, status]);

    const handleDelete = (id: number) => {
        console.log('Deleting portal:', id);
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > last_page) return;
        
        const params = new URLSearchParams(window.location.search);
        params.set('page', page.toString());
        
        router.get(`${url.split('?')[0]}?${params.toString()}`, {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handlePerPageChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('per_page', value);
        params.delete('page'); // Reset to first page
        
        router.get(`${url.split('?')[0]}?${params.toString()}`, {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portals" />

            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Portals</h1>
                            <p className="text-muted-foreground mt-2">
                                Manage all your portals and their settings
                            </p>
                        </div>
                        <Link href="/portals/create">
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Create New Portal
                            </Button>
                        </Link>
                    </div>
                </div>

                {showMessage && (
                    <div className="mb-6">
                        <Alert
                            variant={
                                messageType === 'error' ? 'destructive' : undefined
                            }
                        >
                            {messageType === 'error' ? (
                                <AlertCircle className="h-4 w-4" />
                            ) : (
                                <CheckCircle className="h-4 w-4" />
                            )}
                            <AlertTitle>
                                {messageType === 'error' ? 'Error' : 'Success'}
                            </AlertTitle>
                            <AlertDescription>{message}</AlertDescription>
                            <button
                                type="button"
                                onClick={() => setShowMessage(false)}
                                className="ml-auto text-xs font-medium text-muted-foreground hover:text-foreground"
                            >
                                ×
                            </button>
                        </Alert>
                    </div>
                )}


                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search portals by name or description..."
                                    className="pl-10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                <Button variant="outline" onClick={() => { setSearch(''); setStatus(''); }} >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                

                {/* Portals Table */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle>Portal List</CardTitle>
                                <CardDescription>
                                    All portals with their details and actions
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Show:</span>
                                <select
                                    className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={per_page}
                                    onChange={(e) => handlePerPageChange(e.target.value)}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <span className="text-sm text-muted-foreground">per page</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Portal Detail</TableHead>
                                    {/* <TableHead>More Info.</TableHead> */}
                                    <TableHead>
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-700">
                                            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span>Status</span>
                                            </div>
                                            <span className="text-gray-400">|</span>
                                            <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <span>DB Backup</span>
                                            </div>
                                            <span className="text-gray-400">|</span>
                                            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Server Backup</span>
                                            </div>
                                            <span className="text-gray-400">|</span>
                                            {/* <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                <span>Migration</span>
                                            </div>
                                            <span className="text-gray-400">|</span> */}
                                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span>Public</span>
                                            </div>


                                            <span className="text-gray-400">|</span>
                                            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Framework(Version)</span>
                                            </div>
                                            <span className="text-gray-400">|</span>
                                            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>DB(Version)</span>
                                            </div>
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>


                            



                            <TableBody>
                                {portals.length > 0 ? (
                                    portals.map((portal, index) => (
                                        <TableRow key={portal.id}>
                                            <TableCell className="font-medium">
                                                {index+1}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{portal.name}</div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {getDomain(portal.url)}
                                                </p>
                                            </TableCell>

                                            {/* <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Link href={'/portals/' + portal.id} className="text-muted-foreground hover:text-primary" aria-label="More info" >
                                                        <Info size={16} className="text-muted-foreground cursor-pointer hover:text-primary" aria-label="More info"/>
                                                    </Link>
                                                </div>
                                            </TableCell> */}

                                            <TableCell>
                                                <div className="flex flex-wrap gap-1.5">
                                                    
                                                    {/* Status of Portal */}
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${portal.active ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                                                        {portal.active ? '✓ Active' : '✗ Inactive'}
                                                    </div>

                                                    {/* Server Backup */}
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${
                                                        portal.db_backup 
                                                            ? 'bg-green-100 border-green-300 text-green-800' 
                                                            : 'bg-red-100 border-red-300 text-red-800'
                                                    }`}>
                                                        {portal.db_backup ? '✓' : '✗'} DB Backup
                                                    </div>

                                                    {/* DB Backup */}
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${
                                                        portal.server_backup 
                                                            ? 'bg-green-100 border-green-300 text-green-800' 
                                                            : 'bg-red-100 border-red-300 text-red-800'
                                                    }`}>
                                                        {portal.server_backup ? '✓' : '✗'} Server Backup
                                                    </div>

                                                    {/* Migration */}
                                                    {/* <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${portal.migrate_to_new_server ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
                                                        {portal.migrate_to_new_server ? '↗' : '—'} Migrated To New
                                                    </div> */}

                                                    {/* Exposed to Internet */}
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${portal.is_public ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                                                        {portal.is_public ? '✓' : '✗'} Exposed To Internet
                                                    </div>

                                                    {/* Framework Version */}
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${portal.is_public ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                                                        <span className="font-medium text-red-800">{portal.framework}</span>
                                                        <span className={`text-xs px-1 py-0.5 rounded ${
                                                            portal.framework_version 
                                                                ? 'bg-gray-100 text-gray-700' 
                                                                : 'bg-red-100 text-red-700 font-bold'
                                                        }`}>
                                                            ({portal.framework_version || '?'})
                                                        </span>
                                                    </div>

                                                    {/* Database Version */}
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${portal.is_public ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                                                        <span className="font-medium text-red-800">{portal.database}</span>
                                                        <span className={`text-xs px-1 py-0.5 rounded ${
                                                            portal.database_version 
                                                                ? 'bg-gray-100 text-gray-700' 
                                                                : 'bg-red-100 text-red-700 font-bold'
                                                        }`}>
                                                            ({portal.database_version || '?'})
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <Link href={`/portals/${portal.id}`}>
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <Link href={`/portals/${portal.id}/edit`}>
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit Portal
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <DropdownMenuSeparator />

                                                        {/* Diallog Alert */}
                                                        <ConfirmDelete itemId={portal.id} itemName={portal.name} deleteUrl={`/portals/${portal.id}`} dropItemMenuItemLabel = "Portal Delete"/>


                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                            
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <PlaceholderPattern className="h-32 w-32" />
                                                <div className="text-center">
                                                    <h3 className="text-lg font-semibold">No portals found</h3>
                                                    <p className="text-muted-foreground mt-1">
                                                        Get started by creating your first portal.
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {portals.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium">{from}</span> to{' '}
                            <span className="font-medium">{to}</span> of{' '}
                            <span className="font-medium">{total}</span> results
                        </div>
                        
                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(1)}
                                disabled={current_page === 1}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(current_page - 1)}
                                disabled={current_page === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            
                            <div className="flex items-center gap-1 mx-2">
                                {links.slice(1, -1).map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(parseInt(link.label))}
                                        disabled={!link.url || link.active}
                                    >
                                        {link.label}
                                    </Button>
                                ))}
                            </div>
                            
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(current_page + 1)}
                                disabled={current_page === last_page}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(last_page)}
                                disabled={current_page === last_page}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                            Page <span className="font-medium">{current_page}</span> of{' '}
                            <span className="font-medium">{last_page}</span>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
