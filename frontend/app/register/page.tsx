"use client";

import { useState } from "react";
import api from "@/services/api";
import { saveToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, UserPlus, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");

        // Password validation
        if (form.password !== form.password_confirmation) {
            setError("Passwords do not match");
            return;
        }

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setIsLoading(true);

        try {

            const response = await api.post(
                "/register",
                form
            );

            saveToken(response.data.token);

            router.push("/dashboard");


        } catch (error: any) {

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setIsLoading(false);

        }

    };

    // Password strength indicator
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
        const colors = ['bg-red-500', 'bg-amber-500', 'bg-slate-500', 'bg-emerald-500'];
        return {
            label: labels[strength - 1] || 'Weak',
            color: colors[strength - 1] || 'bg-red-500',
            width: `${(strength / 4) * 100}%`
        };
    };

    const strengthInfo = getStrengthLabel();

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">

            <div className="w-full max-w-md">

                {/* Logo/Brand Section */}
                <div className="text-center mb-8">

                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4">
                        <UserPlus className="w-5 h-5 text-white" />
                    </div>

                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Create Account
                    </h1>

                    <p className="text-slate-500 mt-1.5 text-sm">
                        Start managing your tasks efficiently
                    </p>

                </div>

                {/* Register Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">

                    {/* Error Message */}
                    {error && (

                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-3">

                            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />

                            <div>
                                <p className="text-sm font-medium text-red-800">
                                    Registration Failed
                                </p>
                                <p className="text-sm text-red-600 mt-0.5">
                                    {error}
                                </p>
                            </div>

                        </div>

                    )}

                    {/* Register Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name Field */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name
                            </label>

                            <div className="relative">

                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-slate-50 focus:bg-white"
                                    required
                                />

                            </div>

                        </div>

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
                                    placeholder="example@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-slate-50 focus:bg-white"
                                    required
                                />

                            </div>

                        </div>

                        {/* Password Field */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-11 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-slate-50 focus:bg-white"
                                    required
                                    minLength={8}
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

                            {/* Password Strength Indicator */}
                            {form.password.length > 0 && strengthInfo && (

                                <div className="mt-2.5">

                                    <div className="flex items-center justify-between mb-1.5">

                                        <span className="text-xs text-slate-500">
                                            Password strength
                                        </span>

                                        <span className={`text-xs font-medium ${
                                            strength === 4 ? 'text-emerald-600' :
                                            strength === 3 ? 'text-slate-600' :
                                            strength === 2 ? 'text-amber-600' :
                                            'text-red-600'
                                        }`}>
                                            {strengthInfo.label}
                                        </span>

                                    </div>

                                    <div className="w-full bg-slate-100 rounded-full h-1.5">

                                        <div
                                            className={`${strengthInfo.color} h-1.5 rounded-full transition-all duration-300`}
                                            style={{ width: strengthInfo.width }}
                                        />

                                    </div>

                                    <p className="text-xs text-slate-400 mt-1.5">
                                        {strength === 1 && 'Add uppercase, numbers, or special characters'}
                                        {strength === 2 && 'Add more variety for a stronger password'}
                                        {strength === 3 && 'Good password, almost there!'}
                                        {strength === 4 && 'Excellent password strength!'}
                                    </p>

                                </div>

                            )}

                        </div>

                        {/* Confirm Password Field */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm Password
                            </label>

                            <div className="relative">

                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    name="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-11 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-slate-50 focus:bg-white"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >

                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}

                                </button>

                            </div>

                            {/* Password Match Indicator */}
                            {form.password_confirmation.length > 0 && (

                                <div className="mt-2 flex items-center gap-1.5">

                                    {form.password === form.password_confirmation ? (
                                        <>
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                            <span className="text-xs text-emerald-600">
                                                Passwords match
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                            <span className="text-xs text-red-600">
                                                Passwords do not match
                                            </span>
                                        </>
                                    )}

                                </div>

                            )}

                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 mt-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-sm flex items-center justify-center gap-2"
                        >

                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    <span>Create Account</span>
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
                                    Already have an account?
                                </span>
                            </div>

                        </div>

                        {/* Login Link */}
                        <p className="text-center text-sm text-slate-600">
                            Already have an account?
                            <a
                                href="/login"
                                className="text-indigo-600 font-medium ml-1.5 hover:text-indigo-700 hover:underline transition-colors"
                            >
                                Sign in here
                            </a>
                        </p>

                    </form>

                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-slate-400 mt-6">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>

            </div>

        </div>

    );

}