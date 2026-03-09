import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import {
    AlertTriangle,
    Building2,
    CheckCircle,
    ChevronRight,
    Eye,
    EyeOff,
    FileText,
    Lock,
    Mail,
    Shield
} from 'lucide-react';
import { useState } from 'react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
            <Head title="Reset Password - ONGC RMS" />

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

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="max-w-md w-full">
                            <div className="mb-10">
                                <h2 className="text-4xl font-bold mb-4">
                                    Create New <span className="text-emerald-300">Password</span>
                                </h2>
                                <p className="text-blue-200 text-lg">
                                    Set a strong password to secure your account access.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                    <div className="p-3 bg-emerald-500/20 rounded-lg">
                                        <Shield className="size-6 text-emerald-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Strong Password</h3>
                                        <p className="text-blue-200 text-sm">Use a combination of letters, numbers, and symbols</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                    <div className="p-3 bg-blue-500/20 rounded-lg">
                                        <CheckCircle className="size-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Instant Access</h3>
                                        <p className="text-blue-200 text-sm">You can log in immediately after changing your password</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Reset Form */}
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

                    <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                        <div className="w-full max-w-md py-8">
                            {/* Security Notice */}
                            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="size-5 text-amber-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-amber-900">
                                            Password Reset
                                        </p>
                                        <p className="text-xs text-amber-700 mt-1">
                                            Create a new password for your ONGC corporate account.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Set New Password
                                </h2>
                            </div>

                            <Form
                                {...update.form()}
                                transform={(data) => ({ ...data, token, email })}
                                resetOnSuccess={['password', 'password_confirmation']}
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="space-y-4">
                                            {/* Email Field (Read-only) */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                                                    <Mail className="size-4" />
                                                    Corporate Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    readOnly
                                                    className="bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                                                />
                                                <InputError message={errors.email} />
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="flex items-center gap-2 text-gray-700">
                                                    <Lock className="size-4" />
                                                    New Password
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="new-password"
                                                        placeholder="••••••••"
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

                                            {/* Confirm Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation" className="flex items-center gap-2 text-gray-700">
                                                    <Lock className="size-4" />
                                                    Confirm Password
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password_confirmation"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        name="password_confirmation"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="new-password"
                                                        placeholder="••••••••"
                                                        className="pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="size-5" />
                                                        ) : (
                                                            <Eye className="size-5" />
                                                        )}
                                                    </button>
                                                </div>
                                                <InputError message={errors.password_confirmation} />
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="w-full py-6 mt-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
                                                tabIndex={3}
                                                disabled={processing}
                                                data-test="reset-password-button"
                                            >
                                                {processing ? (
                                                    <Spinner className="text-white" />
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Shield className="size-5" />
                                                        <span>Update Password</span>
                                                        <ChevronRight className="size-5" />
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
