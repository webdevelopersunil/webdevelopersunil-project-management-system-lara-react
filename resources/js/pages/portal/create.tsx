import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Portals',
        href: '/portals',
    },
    {
        title: 'Create Portal',
        href: '/portals/create',
    },
];

export default function PortalCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        url: '',
        active: true,
        ip_address: '',
        status: 'pending',
        server_backup: false,
        db_backup: false,
        migrate_to_new_server: false,
        domain: '',
        vm_name: '',
        framework: '',
        framework_version: '',
        database: '',
        database_version: '',
        machine_type: 'Windows',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/portals');
    }; 

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Portal" />
            
            <div className="container mx-auto py-6 max-w-4xl">
                <div className="mb-6">
                    <Link href="/portals">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Portals
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Create New Portal</CardTitle>
                        <CardDescription>
                            Fill in the details below to create a new portal
                        </CardDescription>
                    </CardHeader>
                    
                    <form onSubmit={handleSubmit} method='post' >
                        <CardContent className="space-y-6">
                            {Object.keys(errors).length > 0 && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Please correct the errors in the form.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Basic Information Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Basic Information</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Portal Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter portal name"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="url">
                                            URL <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="url"
                                            type="url"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                            placeholder="https://example.com"
                                            className={errors.url ? 'border-red-500' : ''}
                                        />
                                        {errors.url && (
                                            <p className="text-sm text-red-500">{errors.url}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Describe the purpose of this portal"
                                        rows={3}
                                    />
                                </div>
                            </div>

                            {/* Server Configuration Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Server Configuration</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="domain">Domain</Label>
                                        <Input
                                            id="domain"
                                            value={data.domain}
                                            onChange={(e) => setData('domain', e.target.value)}
                                            placeholder="example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ip_address">IP Address</Label>
                                        <Input
                                            id="ip_address"
                                            value={data.ip_address}
                                            onChange={(e) => setData('ip_address', e.target.value)}
                                            placeholder="192.168.1.1"
                                            className={errors.ip_address ? 'border-red-500' : ''}
                                        />
                                        {errors.ip_address && (
                                            <p className="text-sm text-red-500">{errors.ip_address}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="vm_name">VM Name</Label>
                                        <Input
                                            id="vm_name"
                                            value={data.vm_name}
                                            onChange={(e) => setData('vm_name', e.target.value)}
                                            placeholder="Virtual machine name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="machine_type">
                                            Machine Type <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={data.machine_type}
                                            onValueChange={(value) => setData('machine_type', value)}
                                        >
                                            <SelectTrigger className={errors.machine_type ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select machine type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Windows">Windows</SelectItem>
                                                <SelectItem value="RHEL">RHEL</SelectItem>
                                                <SelectItem value="Ubuntu">Ubuntu</SelectItem>
                                                <SelectItem value="CentOS">CentOS</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.machine_type && (
                                            <p className="text-sm text-red-500">{errors.machine_type}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Framework & Database Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Framework & Database</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="framework">Framework</Label>
                                        <Input
                                            id="framework"
                                            value={data.framework}
                                            onChange={(e) => setData('framework', e.target.value)}
                                            placeholder="e.g., Laravel, Django"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="framework_version">Framework Version</Label>
                                        <Input
                                            id="framework_version"
                                            type="number"
                                            step="0.01"
                                            value={data.framework_version}
                                            onChange={(e) => setData('framework_version', e.target.value)}
                                            placeholder="e.g., 10.0"
                                            className={errors.framework_version ? 'border-red-500' : ''}
                                        />
                                        {errors.framework_version && (
                                            <p className="text-sm text-red-500">{errors.framework_version}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="database">Database</Label>
                                        <Input
                                            id="database"
                                            value={data.database}
                                            onChange={(e) => setData('database', e.target.value)}
                                            placeholder="e.g., MySQL, PostgreSQL"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="database_version">Database Version</Label>
                                        <Input
                                            id="database_version"
                                            type="number"
                                            step="0.01"
                                            value={data.database_version}
                                            onChange={(e) => setData('database_version', e.target.value)}
                                            placeholder="e.g., 8.0"
                                            className={errors.database_version ? 'border-red-500' : ''}
                                        />
                                        {errors.database_version && (
                                            <p className="text-sm text-red-500">{errors.database_version}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Status & Settings Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Status & Settings</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="status">
                                            Status <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => setData('status', value)}
                                        >
                                            <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="in-progress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-sm text-red-500">{errors.status}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Toggle Switches */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="active">Active Portal</Label>
                                            <p className="text-sm text-gray-500">
                                                Is this portal currently active?
                                            </p>
                                        </div>
                                        <Switch
                                            id="active"
                                            checked={data.active}
                                            onCheckedChange={(checked) => setData('active', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="server_backup">Server Backup</Label>
                                            <p className="text-sm text-gray-500">
                                                Enable server backup for this portal
                                            </p>
                                        </div>
                                        <Switch
                                            id="server_backup"
                                            checked={data.server_backup}
                                            onCheckedChange={(checked) => setData('server_backup', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="db_backup">Database Backup</Label>
                                            <p className="text-sm text-gray-500">
                                                Enable database backup for this portal
                                            </p>
                                        </div>
                                        <Switch
                                            id="db_backup"
                                            checked={data.db_backup}
                                            onCheckedChange={(checked) => setData('db_backup', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="migrate_to_new_server">Migrate to New Server</Label>
                                            <p className="text-sm text-gray-500">
                                                Schedule migration to new server
                                            </p>
                                        </div>
                                        <Switch
                                            id="migrate_to_new_server"
                                            checked={data.migrate_to_new_server}
                                            onCheckedChange={(checked) => setData('migrate_to_new_server', checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-between border-t px-6 py-4">
                            <Link href="/portals">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="gap-2">
                                <Save className="h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Portal'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}