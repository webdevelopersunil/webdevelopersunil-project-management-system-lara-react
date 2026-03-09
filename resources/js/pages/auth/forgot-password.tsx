import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email as emailRoute } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import {
    AlertTriangle,
    Building2,
    ChevronRight,
    FileText,
    LoaderCircle,
    Shield,
    Users
} from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
            <Head title="Forgot Password - ONGC RMS" />

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
                                    Account <span className="text-emerald-300">Recovery</span>
                                </h2>
                                <p className="text-blue-200 text-lg">
                                    Securely reset your password for the Request Management System
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                    <div className="p-3 bg-emerald-500/20 rounded-lg">
                                        <FileText className="size-6 text-emerald-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Verify Identity</h3>
                                        <p className="text-blue-200 text-sm">Use your registered corporate email</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                    <div className="p-3 bg-blue-500/20 rounded-lg">
                                        <Shield className="size-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Secure Link</h3>
                                        <p className="text-blue-200 text-sm">Receive an encrypted password reset link</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Recovery Form */}
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
                        <div className="w-full max-w-md border border-gray-100 bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8">
                            {/* Notice */}
                            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="size-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-900">
                                            Password Reset Request
                                        </p>
                                        <p className="text-xs text-blue-700 mt-1">
                                            Enter your email address and we will send you a password reset link.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Forgot Password?
                                </h2>
                            </div>

                            {status && (
                                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm font-medium text-center">
                                    {status}
                                </div>
                            )}

                            <Form {...emailRoute.form()} className="space-y-6">
                                {({ processing, errors }) => (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-700 font-medium">
                                                Corporate Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="off"
                                                autoFocus
                                                placeholder="e.g. name@ongc.co.in"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <Button
                                            className="w-full py-6 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
                                            disabled={processing}
                                            data-test="email-password-reset-link-button"
                                        >
                                            {processing ? (
                                                <LoaderCircle className="h-5 w-5 animate-spin text-white" />
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <span>Send Reset Link</span>
                                                    <ChevronRight className="size-5" />
                                                </div>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </Form>

                            <div className="mt-8 text-center text-sm text-gray-600 border-t pt-6">
                                Remember your password?{' '}
                                <TextLink href={login()} className="text-blue-600 hover:text-blue-800 font-medium font-semibold underline-offset-4 hover:underline">
                                    Return to login
                                </TextLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
