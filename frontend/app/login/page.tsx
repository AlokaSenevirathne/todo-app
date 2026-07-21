"use client";

import { useState } from "react";
import api from "@/services/api";
import { saveToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, CheckSquare, ArrowRight } from "lucide-react";

export default function LoginPage() {

    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await api.post("/login", form);
            saveToken(response.data.token);
            router.push("/dashboard");
        } catch(error: any) {
            setError(
                error.response?.data?.message ||
                "Invalid email address or password. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

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
                <Link href="/register" className="text-xs font-medium text-slate-600 hover:text-slate-900">
                    Need an account? <span className="text-indigo-600 font-semibold">Sign Up</span>
                </Link>
            </div>

            {/* Login Card Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
                        
                        <div className="text-center space-y-1">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-slate-500 text-xs">
                                Enter your credentials to access your workspace
                            </p>
                        </div>

                        {/* Error Callout */}
                        {error && (
                            <div className="bg-red-50/80 border border-red-200/90 rounded-lg p-3.5 flex items-start gap-3 text-left">
                                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-semibold text-red-800">Authentication Error</p>
                                    <p className="text-xs text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            
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
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-medium text-slate-700">
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-11 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In to Dashboard</span>
                                        <ArrowRight className="w-4 h-4 text-slate-400" />
                                    </>
                                )}
                            </button>

                        </form>

                        <div className="pt-2 text-center border-t border-slate-100">
                            <p className="text-xs text-slate-500">
                                Don't have an account yet?{" "}
                                <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </div>

                    </div>

                    <p className="text-center text-xs text-slate-400 mt-6">
                        Protected by end-to-end account security
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