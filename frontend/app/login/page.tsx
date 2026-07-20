"use client";

import { useState } from "react";
import api from "@/services/api";
import { saveToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {

    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");
        setIsLoading(true);

        try {

            const response = await api.post(
                "/login",
                form
            );

            saveToken(
                response.data.token
            );

            router.push("/dashboard");

        } catch(error:any) {

            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {

            setIsLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">

            <div className="w-full max-w-md">

                {/* Logo/Brand Section */}
                <div className="text-center mb-8">

                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4">
                        <LogIn className="w-5 h-5 text-white" />
                    </div>

                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Welcome Back
                    </h1>

                    <p className="text-slate-500 mt-1.5 text-sm">
                        Sign in to your account to continue
                    </p>

                </div>

                {/* Login Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">

                    {/* Error Message */}
                    {error && (

                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-3">

                            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />

                            <div>
                                <p className="text-sm font-medium text-red-800">
                                    Authentication Failed
                                </p>
                                <p className="text-sm text-red-600 mt-0.5">
                                    {error}
                                </p>
                            </div>

                        </div>

                    )}

                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email Field */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-slate-50 focus:bg-white"
                                    required
                                />

                            </div>

                        </div>

                        {/* Password Field */}
                        <div>

                            <div className="flex items-center justify-between mb-2">

                                <label className="text-sm font-medium text-slate-700">
                                    Password
                                </label>

                                <a
                                    href="/forgot-password"
                                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                                >
                                    Forgot Password?
                                </a>

                            </div>

                            <div className="relative">

                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-11 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-slate-50 focus:bg-white"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >

                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}

                                </button>

                            </div>

                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-sm flex items-center justify-center gap-2"
                        >

                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    <span>Sign In</span>
                                </>
                            )}

                        </button>

                        {/* Divider */}
                        <div className="relative my-6">

                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>

                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-white text-slate-500 uppercase tracking-wide">
                                    New to our platform?
                                </span>
                            </div>

                        </div>

                        {/* Register Link */}
                        <p className="text-center text-sm text-slate-600">
                            Don't have an account?
                            <a
                                href="/register"
                                className="text-indigo-600 font-medium ml-1.5 hover:text-indigo-700 hover:underline transition-colors"
                            >
                                Create an account
                            </a>
                        </p>

                    </form>

                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-slate-400 mt-6">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>

            </div>

        </div>

    );

}