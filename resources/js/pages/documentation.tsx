import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import {
    BookOpen,
    FileText,
    Users,
    Globe,
    HelpCircle,
    Download,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    Search,
    Hash,
    ArrowRight,
    GitBranch,
    Workflow,
    Layers,
    Target,
    Filter,
    Mail,
    Bell,
    Shield,
    Database,
    Cpu,
    Zap,
    TrendingUp,
    AlertTriangle,
    UserCheck,
    Calendar,
    BarChart,
    Settings,
    Home,
    ChevronLeft,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Documentation',
        href: '',
    },
];

export default function Documentation() {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedSections, setExpandedSections] = useState<string[]>([
        'getting-started',
        'workflow',
        'user-roles'
    ]);

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const documentationSections = [
        {
            id: 'overview',
            title: 'System Overview',
            icon: <BookOpen className="size-5" />,
            content: (
                <div className="space-y-6">
                    <div className="rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 p-6 dark:from-blue-900/20 dark:to-emerald-900/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                                <Globe className="size-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">ONGC Request Management System</h3>
                                <p className="text-gray-600 dark:text-gray-400">Version 2.4.1 • Updated: Nov 2024</p>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                            The Request Management System (RMS) is a comprehensive platform designed to streamline 
                            portal development requests, resource allocation, and project tracking within ONGC. 
                            This system facilitates efficient communication between requestors, project managers, 
                            and developers while maintaining security and compliance standards.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/30">
                                    <Target className="size-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h4 className="font-semibold">Primary Objectives</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Streamline portal request submission
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Optimize developer resource allocation
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Ensure timely project delivery
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Maintain security and compliance
                                </li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                                    <Shield className="size-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="font-semibold">Security Features</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Role-based access control
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    End-to-end encryption
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Audit trail logging
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Multi-factor authentication
                                </li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900/30">
                                    <Zap className="size-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h4 className="font-semibold">Key Benefits</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    40% faster request processing
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    25% increase in developer productivity
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Real-time progress tracking
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                    Comprehensive analytics
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'workflow',
            title: 'Workflow Process',
            icon: <Workflow className="size-5" />,
            content: (
                <div className="space-y-8">
                    <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-6">Complete Request Lifecycle</h3>
                        
                        {/* Workflow Visualization */}
                        <div className="relative">
                            {/* Connection Lines */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2" />
                            
                            {/* Steps */}
                            <div className="relative flex justify-between items-center">
                                {[
                                    { id: 1, title: 'Request Submission', icon: <FileText className="size-6" />, color: 'blue' },
                                    { id: 2, title: 'Review & Approval', icon: <CheckCircle className="size-6" />, color: 'amber' },
                                    { id: 3, title: 'Developer Assignment', icon: <UserCheck className="size-6" />, color: 'purple' },
                                    { id: 4, title: 'Development', icon: <Cpu className="size-6" />, color: 'emerald' },
                                    { id: 5, title: 'Testing', icon: <AlertTriangle className="size-6" />, color: 'orange' },
                                    { id: 6, title: 'Deployment', icon: <Globe className="size-6" />, color: 'green' },
                                    { id: 7, title: 'Monitoring', icon: <BarChart className="size-6" />, color: 'indigo' },
                                ].map((step) => (
                                    <div key={step.id} className="relative z-10 flex flex-col items-center">
                                        <div className={`size-16 rounded-full flex items-center justify-center mb-3 ${
                                            step.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                            step.color === 'amber' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                                            step.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                                            step.color === 'emerald' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                            step.color === 'orange' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                                            step.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                            'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                                        }`}>
                                            {step.icon}
                                        </div>
                                        <div className="text-center">
                                            <div className="size-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-bold mb-2">
                                                {step.id}
                                            </div>
                                            <p className="text-sm font-medium">{step.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Steps */}
                        <div className="mt-12 space-y-8">
                            {[
                                {
                                    step: 'Step 1: Request Submission',
                                    description: 'Requestors submit portal development requests through the system with detailed requirements, priority levels, and expected timelines.',
                                    responsibilities: ['Requestor fills out request form', 'Upload supporting documents', 'Set priority and deadline'],
                                    estimatedTime: '15-30 minutes',
                                    roles: ['Requestor']
                                },
                                {
                                    step: 'Step 2: Review & Approval',
                                    description: 'Project managers review submitted requests, validate requirements, and approve or request modifications.',
                                    responsibilities: ['Validate requirements', 'Check resource availability', 'Approve or send for revision'],
                                    estimatedTime: '1-2 business days',
                                    roles: ['Project Manager', 'Admin']
                                },
                                {
                                    step: 'Step 3: Developer Assignment',
                                    description: 'Based on skills and availability, developers are assigned to approved requests. Project managers monitor workload distribution.',
                                    responsibilities: ['Match developer skills', 'Assign based on availability', 'Set initial timeline'],
                                    estimatedTime: '1 business day',
                                    roles: ['Project Manager', 'Admin']
                                },
                                {
                                    step: 'Step 4: Development Phase',
                                    description: 'Developers work on the portal implementation with regular progress updates and milestone tracking.',
                                    responsibilities: ['Code development', 'Regular progress updates', 'Milestone completion'],
                                    estimatedTime: '2-4 weeks',
                                    roles: ['Developer']
                                },
                                {
                                    step: 'Step 5: Testing & QA',
                                    description: 'Comprehensive testing including unit tests, integration tests, and user acceptance testing (UAT).',
                                    responsibilities: ['Bug identification', 'Performance testing', 'Security validation'],
                                    estimatedTime: '3-5 days',
                                    roles: ['Developer', 'Quality Analyst']
                                },
                                {
                                    step: 'Step 6: Deployment',
                                    description: 'Deploy the portal to production environment with proper monitoring and backup procedures.',
                                    responsibilities: ['Production deployment', 'Database migration', 'DNS configuration'],
                                    estimatedTime: '1-2 days',
                                    roles: ['Developer', 'DevOps']
                                },
                                {
                                    step: 'Step 7: Monitoring & Support',
                                    description: 'Post-deployment monitoring, performance optimization, and ongoing support for the deployed portal.',
                                    responsibilities: ['Performance monitoring', 'Issue resolution', 'Regular updates'],
                                    estimatedTime: 'Ongoing',
                                    roles: ['Developer', 'Support Team']
                                }
                            ].map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="text-lg font-semibold">{item.step}</h4>
                                            <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400">
                                            {item.estimatedTime}
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h5 className="font-medium mb-3 flex items-center gap-2">
                                                <Users className="size-4" />
                                                Key Responsibilities
                                            </h5>
                                            <ul className="space-y-2">
                                                {item.responsibilities.map((resp, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <ChevronRight className="size-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                        {resp}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium mb-3 flex items-center gap-2">
                                                <Shield className="size-4" />
                                                Involved Roles
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {item.roles.map((role, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium dark:bg-gray-700 dark:text-gray-300">
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'user-roles',
            title: 'User Roles & Permissions',
            icon: <Users className="size-5" />,
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                role: 'Requestor',
                                description: 'Submits portal development requests and tracks progress',
                                icon: <FileText className="size-6" />,
                                color: 'blue',
                                permissions: [
                                    'Submit new requests',
                                    'View request status',
                                    'Upload documents',
                                    'Track progress',
                                    'Receive notifications'
                                ]
                            },
                            {
                                role: 'Developer',
                                description: 'Implements and maintains portal solutions',
                                icon: <Cpu className="size-6" />,
                                color: 'emerald',
                                permissions: [
                                    'View assigned requests',
                                    'Update progress status',
                                    'Submit deliverables',
                                    'Communicate with requestors',
                                    'Access development tools'
                                ]
                            },
                            {
                                role: 'Project Manager',
                                description: 'Oversees request processing and resource allocation',
                                icon: <Target className="size-6" />,
                                color: 'purple',
                                permissions: [
                                    'Approve/reject requests',
                                    'Assign developers',
                                    'Monitor project timelines',
                                    'Generate reports',
                                    'Manage priorities'
                                ]
                            },
                            {
                                role: 'Admin',
                                description: 'Manages system configuration and user access',
                                icon: <Shield className="size-6" />,
                                color: 'amber',
                                permissions: [
                                    'Manage all users',
                                    'Configure system settings',
                                    'Access audit logs',
                                    'Manage permissions',
                                    'System maintenance'
                                ]
                            }
                        ].map((role) => (
                            <div key={role.role} className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 rounded-lg ${
                                        role.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                        role.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                                        role.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                                        'bg-amber-100 dark:bg-amber-900/30'
                                    }`}>
                                        <div className={`${
                                            role.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                                            role.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                                            role.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                                            'text-amber-600 dark:text-amber-400'
                                        }`}>
                                            {role.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{role.role}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium mb-3">Permissions</h4>
                                    <ul className="space-y-2">
                                        {role.permissions.map((permission, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <div className={`size-2 rounded-full ${
                                                    role.color === 'blue' ? 'bg-blue-500' :
                                                    role.color === 'emerald' ? 'bg-emerald-500' :
                                                    role.color === 'purple' ? 'bg-purple-500' :
                                                    'bg-amber-500'
                                                }`} />
                                                <span className="text-gray-700 dark:text-gray-300">{permission}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'priority-levels',
            title: 'Priority Levels',
            icon: <AlertCircle className="size-5" />,
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        {[
                            {
                                level: 'High',
                                color: 'red',
                                description: 'Critical issues affecting core operations',
                                responseTime: '4 hours',
                                resolutionTime: '24 hours',
                                examples: [
                                    'Security vulnerabilities',
                                    'System outages',
                                    'Compliance violations',
                                    'Major functionality failure'
                                ]
                            },
                            {
                                level: 'Medium',
                                color: 'orange',
                                description: 'Important features affecting productivity',
                                responseTime: '8 hours',
                                resolutionTime: '3 days',
                                examples: [
                                    'Feature enhancements',
                                    'Performance optimization',
                                    'Minor bug fixes',
                                    'Data reporting issues'
                                ]
                            },
                            {
                                level: 'Low',
                                color: 'blue',
                                description: 'Minor improvements and cosmetic changes',
                                responseTime: '24 hours',
                                resolutionTime: '7 days',
                                examples: [
                                    'UI/UX improvements',
                                    'Documentation updates',
                                    'Non-critical bug fixes',
                                    'General inquiries'
                                ]
                            }
                        ].map((priority) => (
                            <div key={priority.level} className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-3 rounded-full bg-${priority.color}-500`} />
                                        <h3 className="text-lg font-semibold">{priority.level} Priority</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                                        <p className="font-semibold">{priority.responseTime}</p>
                                    </div>
                                </div>
                                
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{priority.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium mb-3">Examples</h4>
                                        <ul className="space-y-2">
                                            {priority.examples.map((example, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <div className={`size-2 rounded-full mt-1.5 bg-${priority.color}-500`} />
                                                    <span className="text-gray-600 dark:text-gray-400">{example}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                        <h4 className="font-medium mb-3">Service Level Agreement</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Initial Response</p>
                                                <p className="font-semibold">{priority.responseTime}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Target Resolution</p>
                                                <p className="font-semibold">{priority.resolutionTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'best-practices',
            title: 'Best Practices',
            icon: <CheckCircle className="size-5" />,
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">For Requestors</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="p-1.5 bg-blue-100 rounded-lg dark:bg-blue-900/30 mt-0.5">
                                        <Hash className="size-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Provide Clear Requirements</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Include detailed specifications and expected outcomes</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1.5 bg-blue-100 rounded-lg dark:bg-blue-900/30 mt-0.5">
                                        <Calendar className="size-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Set Realistic Timelines</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Consider complexity and resource availability</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1.5 bg-blue-100 rounded-lg dark:bg-blue-900/30 mt-0.5">
                                        <Bell className="size-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Regular Communication</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Provide timely feedback and clarifications</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">For Developers</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="p-1.5 bg-emerald-100 rounded-lg dark:bg-emerald-900/30 mt-0.5">
                                        <Clock className="size-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Regular Progress Updates</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Update status at least twice weekly</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1.5 bg-emerald-100 rounded-lg dark:bg-emerald-900/30 mt-0.5">
                                        <Database className="size-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Code Quality Standards</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Follow ONGC development guidelines</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1.5 bg-emerald-100 rounded-lg dark:bg-emerald-900/30 mt-0.5">
                                        <Mail className="size-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Proactive Communication</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Report blockers and seek clarifications early</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700 md:col-span-2">
                            <h3 className="text-lg font-semibold mb-4">General Guidelines</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Security</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Regular security audits
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Data encryption at rest and transit
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Access control reviews
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Documentation</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Maintain project documentation
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Update change logs
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Create user guides
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Compliance</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Follow ONGC IT policies
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Regular compliance checks
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="size-4 text-blue-500 mt-0.5" />
                                            Audit trail maintenance
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documentation - Request Management System" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Documentation</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Complete guide to ONGC Request Management System workflow and processes
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search documentation..."
                                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                            <Download className="size-4" />
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Fixed Left Sidebar - Navigation */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Documentation Menu */}
                            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Documentation</h3>
                                </div>
                                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                                    <div className="space-y-1 p-2">
                                        {documentationSections.map((section) => (
                                            <div key={section.id} className="space-y-1">
                                                <button
                                                    onClick={() => {
                                                        toggleSection(section.id);
                                                        if (expandedSections.includes(section.id)) {
                                                            scrollToSection(section.id);
                                                        }
                                                    }}
                                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition-colors ${
                                                        activeSection === section.id
                                                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`${
                                                            activeSection === section.id
                                                                ? 'text-blue-600 dark:text-blue-400'
                                                                : 'text-gray-500 dark:text-gray-400'
                                                        }`}>
                                                            {section.icon}
                                                        </div>
                                                        <span className="font-medium">{section.title}</span>
                                                    </div>
                                                    {expandedSections.includes(section.id) ? (
                                                        <ChevronUp className="size-4 text-gray-400" />
                                                    ) : (
                                                        <ChevronDown className="size-4 text-gray-400" />
                                                    )}
                                                </button>
                                                
                                                {expandedSections.includes(section.id) && section.id !== 'overview' && (
                                                    <div className="ml-11 space-y-1 pl-4 border-l border-gray-200 dark:border-gray-700">
                                                        {section.id === 'workflow' && (
                                                            <>
                                                                <button
                                                                    onClick={() => scrollToSection('workflow-process')}
                                                                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                >
                                                                    Complete Workflow
                                                                </button>
                                                                <button
                                                                    onClick={() => scrollToSection('workflow-steps')}
                                                                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                >
                                                                    Detailed Steps
                                                                </button>
                                                            </>
                                                        )}
                                                        {section.id === 'user-roles' && (
                                                            <>
                                                                <button
                                                                    onClick={() => scrollToSection('roles-overview')}
                                                                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                >
                                                                    Role Overview
                                                                </button>
                                                                <button
                                                                    onClick={() => scrollToSection('permissions')}
                                                                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                >
                                                                    Permissions Matrix
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Quick Links</h4>
                                <div className="space-y-2">
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                    >
                                        <ArrowRight className="size-3" />
                                        Request Submission Form
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                    >
                                        <ArrowRight className="size-3" />
                                        Progress Tracking Guide
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                    >
                                        <ArrowRight className="size-3" />
                                        Reporting Dashboard
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                    >
                                        <ArrowRight className="size-3" />
                                        Support Contact
                                    </a>
                                </div>
                            </div>

                            {/* Version Info */}
                            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                                        <Settings className="size-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">System Version</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">v2.4.1 • Nov 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {documentationSections.map((section) => (
                            <div key={section.id} id={section.id} className="scroll-mt-6">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                                        <div className="text-blue-600 dark:text-blue-400">
                                            {section.icon}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                                </div>
                                {section.content}
                            </div>
                        ))}

                        {/* Help Section */}
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-emerald-50 p-8 dark:border-gray-700 dark:from-blue-900/20 dark:to-emerald-900/20">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 p-4 bg-white rounded-full shadow-lg dark:bg-gray-800">
                                    <HelpCircle className="size-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Need Additional Help?</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
                                    Our support team is available to assist you with any questions or issues
                                    regarding the Request Management System.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
                                        <Mail className="size-4" />
                                        Contact Support
                                    </button>
                                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <FileText className="size-4" />
                                        Download Full Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}