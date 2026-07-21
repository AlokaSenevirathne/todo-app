"use client";

import { useState } from "react";
import api from "@/services/api";
import { saveToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, AlertCircle, Eye, EyeOff, CheckCircle2, CheckSquare, ArrowRight } from "lucide-react";

export default function RegisterPage() {

    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.password_confirmation) {
            setError("Passwords do not match.");
            return;
        }

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post("/register", form);
            saveToken(response.data.token);
            router.push("/dashboard");
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please check your inputs and try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrength = () => {
        const password = form.password;
        if (password.length === 0) return null;
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        return score;
    };

    const strength = getPasswordStrength();

    const getStrengthLabel = () => {
        if (strength === null) return null;
        const labels = ['Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['bg-red-500', 'bg-amber-500', 'bg-slate-500', 'bg-emerald-600'];
        return {
            label: labels[strength - 1] || 'Weak',
            color: colors[strength - 1] || 'bg-red-500',
            width: `${(strength / 4) * 100}%`
        };
    };

    const strengthInfo = getStrengthLabel();

    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* Header branding */}
            <div className="px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                    <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white">
                        <CheckSquare className="w-4 h-4" />
                    </div>
                    <span>TaskFlow</span>
                </Link>
                <Link href="/login" className="text-xs font-medium text-slate-600 hover:text-slate-900">
                    Already registered? <span className="text-indigo-600 font-semibold">Sign In</span>
                </Link>
            </div>

            {/* Register Card Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
                        
                        <div className="text-center space-y-1">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                Create Account
                            </h1>
                            <p className="text-slate-500 text-xs">
                                Set up your workspace credentials to get started
                            </p>
                        </div>

                        {/* Error Callout */}
                        {error && (
                            <div className="bg-red-50/80 border border-red-200/90 rounded-lg p-3.5 flex items-start gap-3 text-left">
                                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-semibold text-red-800">Registration Error</p>
                                    <p className="text-xs text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="name@company.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="At least 8 characters"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-11 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>

                                {form.password.length > 0 && strengthInfo && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-slate-500">Security strength</span>
                                            <span className="font-medium text-slate-700">{strengthInfo.label}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`${strengthInfo.color} h-1.5 rounded-full transition-all duration-300`}
                                                style={{ width: strengthInfo.width }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Repeat password"
                                        value={form.password_confirmation}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-11 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>

                                {form.password_confirmation.length > 0 && (
                                    <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                                        {form.password === form.password_confirmation ? (
                                            <>
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                <span className="text-emerald-700 font-medium">Passwords match</span>
                                            </>
                                        ) : (
                                            <>
                                                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                                <span className="text-red-600">Passwords do not match</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Workspace Account</span>
                                        <ArrowRight className="w-4 h-4 text-indigo-200" />
                                    </>
                                )}
                            </button>

                        </form>

                        <div className="pt-2 text-center border-t border-slate-100">
                            <p className="text-xs text-slate-500">
                                Already have an account?{" "}
                                <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                    </div>

                    <p className="text-center text-xs text-slate-400 mt-6">
                        Protected by industry-standard data encryption
                    </p>

                </div>
            </div>

            {/* Footer */}
            <div className="py-4 text-center text-xs text-slate-400">
                TaskFlow App • Enterprise Todo Management
            </div>

        </div>
    );
}