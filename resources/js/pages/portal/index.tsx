import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, Filter } from 'lucide-react';

interface PortalProps {
  portals: Portal[];
  total: number;
  filters: {
    search?: string;
    status?: string;
  };
}


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

interface Portal {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'pending';
    created_at: string;
    updated_at: string;
    user_count: number;
    document_count: number;
}

export default function Dashboard({ portals = [], total = 0, filters = { search: '', status: '' } }: PortalProps) {
    // Status badge color mapping
    const statusColors = {
        active: 'bg-green-100 text-green-800 border-green-200',
        inactive: 'bg-gray-100 text-gray-800 border-gray-200',
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this portal?')) {
            // Delete logic here
            console.log('Deleting portal:', id);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portals" />
            
            <div className="container mx-auto p-6">
                {/* Header Section */}
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

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Portals
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Active Portals
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600">
                                {portals.filter(p => p.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Pending Portals
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-yellow-600">
                                {portals.filter(p => p.status === 'pending').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search portals by name or description..."
                                    className="pl-10"
                                    defaultValue={filters.search}
                                />
                            </div>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Status
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>All</DropdownMenuItem>
                                        <DropdownMenuItem>Active</DropdownMenuItem>
                                        <DropdownMenuItem>Inactive</DropdownMenuItem>
                                        <DropdownMenuItem>Pending</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="outline">Clear Filters</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Portals Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Portal List</CardTitle>
                        <CardDescription>
                            All portals with their details and actions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Users</TableHead>
                                    <TableHead>Documents</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {portals.length > 0 ? (
                                    portals.map((portal) => (
                                        <TableRow key={portal.id}>
                                            <TableCell className="font-medium">
                                                #{portal.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{portal.name}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {portal.description}
                                            </TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant="outline" 
                                                    className={`capitalize ${statusColors[portal.status]}`}
                                                >
                                                    {portal.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium">{portal.user_count}</span>
                                                    <span className="text-muted-foreground">users</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium">{portal.document_count}</span>
                                                    <span className="text-muted-foreground">docs</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(portal.created_at).toLocaleDateString()}
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
                                                        <DropdownMenuItem
                                                            className="cursor-pointer text-red-600"
                                                            onClick={() => handleDelete(portal.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Portal
                                                        </DropdownMenuItem>
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

                {/* Pagination (if needed) */}
                {portals.length > 0 && (
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-muted-foreground">
                            Showing {portals.length} of {total} portals
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                1
                            </Button>
                            <Button variant="outline" size="sm">
                                2
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}