import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { 
  Building2, 
  Lock, 
  Mail, 
  Shield, 
  Users, 
  FileText, 
  CheckCircle,
  ChevronRight,
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
            <Head title="Log in - ONGC RMS" />
            
            <div className="flex min-h-screen">
                {/* Left Panel - Branding & Info */}
                <div className="hidden lg:flex lg:w-1/2 flex-col p-12 bg-gradient-to-b from-blue-900 to-emerald-900 text-white">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                            <span className="text-2xl font-extrabold tracking-wider drop-shadow">
                                <span className="text-orange-400">O</span>
                                <span className="text-emerald-400">N</span>
                                <span className="text-sky-400">G</span>
                                <span className="text-rose-400">C</span>
                            </span>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold">ONGC</h1>
                            <p className="text-blue-200 text-sm">Oil and Natural Gas Corporation</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="max-w-md">
                            <div className="mb-10">
                                <h2 className="text-4xl font-bold mb-4">
                                    Changes Request Management <span className="text-emerald-300">System</span>
                                </h2>
                                <p className="text-blue-200 text-lg">
                                    Streamline your portal <span className="text-emerald-300">changes</span> requests, project approvals, and resource management
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                    <div className="p-3 bg-emerald-500/20 rounded-lg">
                                        <FileText className="size-6 text-emerald-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Portal Requests</h3>
                                        <p className="text-blue-200 text-sm">Submit and track portal access requests</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                    <div className="p-3 bg-blue-500/20 rounded-lg">
                                        <Users className="size-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Team Collaboration</h3>
                                        <p className="text-blue-200 text-sm">Manage developers and project teams</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                    <div className="p-3 bg-amber-500/20 rounded-lg">
                                        <Shield className="size-6 text-amber-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Role-Based Access</h3>
                                        <p className="text-blue-200 text-sm">Secure access based on your role</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-blue-200">
                                        <span className="text-white font-medium">Need Help?</span>
                                        <p>Contact IT Support at ext. 6121</p>
                                    </div>
                                    <div className="text-sm text-blue-200">
                                        <span className="text-white font-medium">Security Level</span>
                                        <div className="flex items-center gap-1">
                                            <div className="size-2 rounded-full bg-emerald-500"></div>
                                            <div className="size-2 rounded-full bg-emerald-500"></div>
                                            <div className="size-2 rounded-full bg-emerald-500"></div>
                                            <span className="ml-2">High</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    {/* Header for mobile */}
                    <div className="lg:hidden p-6 bg-gradient-to-r from-blue-900 to-emerald-900 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Building2 className="size-8" />
                                <div>
                                    <h1 className="text-xl font-bold">ONGC RMS</h1>
                                    <p className="text-blue-200 text-xs">Request Management System</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                        <div className="w-full max-w-md">
                            {/* Security Notice */}
                            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="size-5 text-amber-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-amber-900">
                                            Secure Access Required
                                        </p>
                                        <p className="text-xs text-amber-700 mt-1">
                                            Use your ONGC corporate credentials. Unauthorized access is prohibited.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Welcome Back
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Sign in to access the Request Management System
                                </p>
                            </div>

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="space-y-6">
                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                                                    <Mail className="size-4" />
                                                    Corporate Email
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="email"
                                                        type="text"
                                                        name="email"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="email"
                                                        placeholder="firstname.lastname@ongc.co.in"
                                                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                        @
                                                    </div>
                                                </div>
                                                <InputError message={errors.email} />
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="password" className="flex items-center gap-2 text-gray-700">
                                                        <Lock className="size-4" />
                                                        Password
                                                    </Label>
                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="text-sm text-blue-600 hover:text-blue-700"
                                                            tabIndex={5}
                                                        >
                                                            Forgot password?
                                                        </TextLink>
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="current-password"
                                                        placeholder="Enter your password"
                                                        className="pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="size-5" />
                                                        ) : (
                                                            <Eye className="size-5" />
                                                        )}
                                                    </button>
                                                </div>
                                                <InputError message={errors.password} />
                                            </div>

                                            {/* Remember & Role Selection */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        id="remember"
                                                        name="remember"
                                                        tabIndex={3}
                                                    />
                                                    <Label htmlFor="remember" className="text-gray-700">
                                                        Remember this device
                                                    </Label>
                                                </div>
                                                
                                                <div className="text-xs">
                                                    <span className="text-gray-500">Select Role:</span>
                                                    <select className="ml-2 text-gray-700 bg-transparent border-none focus:outline-none">
                                                        <option value="developer">Developer</option>
                                                        <option value="project-manager">Project Manager</option>
                                                        <option value="requestor">Requestor</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Login Button */}
                                            <Button
                                                type="submit"
                                                className="w-full py-6 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                {processing ? (
                                                    <Spinner className="text-white" />
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Shield className="size-5" />
                                                        <span>Secure Login</span>
                                                        <ChevronRight className="size-5" />
                                                    </div>
                                                )}
                                            </Button>

                                            
                                        </div>

                                        {canRegister && (
                                            <div className="text-center pt-6 border-t border-gray-200">
                                                <p className="text-sm text-gray-600">
                                                    New to ONGC RMS?{' '}
                                                    <TextLink 
                                                        href={register()} 
                                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                                        tabIndex={5}
                                                    >
                                                        Request Access
                                                    </TextLink>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Access requires manager approval
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Form>

                            {/* Footer Info */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span>v2.4.1</span>
                                        <span>•</span>
                                        <span>Last Updated: Nov 2024</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-emerald-500"></div>
                                        <span>System Status: Operational</span>
                                    </div>
                                </div>
                            </div>

                            {status && (
                                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="size-5 text-green-600" />
                                        <p className="text-sm font-medium text-green-800">{status}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Banner
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-emerald-900 text-white py-2 px-6 text-sm hidden lg:block">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span>ONGC Corporate Network Access Required</span>
                        <span className="text-blue-200">•</span>
                        <span>All activities are monitored and logged</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-blue-200">IT Support: support@ongc.co.in</span>
                        <span className="text-blue-200">•</span>
                        <span>Emergency: +91-XXX-XXXX-XXXX</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
}