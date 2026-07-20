"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import Navbar from "@/components/Navbar";
import TodoForm from "@/components/TodoForm";
import TodoCard from "@/components/TodoCard";
import ProtectedRoute from "@/components/ProtectedRoute";

import {
    PlusCircle,
    Search,
    Filter,
    ClipboardList,
    Clock,
    CheckCircle2,
    TrendingUp,
    X,
    LayoutGrid,
    Sparkles,
    ArrowUp,
    Calendar,
    ChevronDown,
    Zap
} from "lucide-react";

interface Todo {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at?: string;
}

export default function DashboardPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await api.get("/todos", {
                params: { search, status }
            });
            setTodos(response.data.todos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => fetchTodos(), 300);
        return () => clearTimeout(timeout);
    }, [search, status]);

    const totalTodos = todos.length;
    const pendingTodos = todos.filter(todo => todo.status === "pending").length;
    const completedTodos = todos.filter(todo => todo.status === "completed").length;
    const completionRate = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);
    const hasActiveFilters = search.length > 0 || status.length > 0;

    const sortedTodos = useMemo(() => {
        return [...todos].sort((a, b) => {
            if (sortBy === "newest") {
                return (b.id || 0) - (a.id || 0);
            } else {
                return (a.id || 0) - (b.id || 0);
            }
        });
    }, [todos, sortBy]);

    const getMotivationMessage = () => {
        if (completionRate === 100 && totalTodos > 0) return "🎉 Perfect! All done!";
        if (completionRate >= 75) return "🔥 Amazing progress!";
        if (completionRate >= 50) return "💪 Keep going, you're doing great!";
        if (completionRate >= 25) return "🌟 Good start! Keep pushing!";
        if (totalTodos === 0) return "✨ Ready to start your journey?";
        return "📈 Every task completed is a step forward!";
    };

    return (
        <ProtectedRoute>
            <Navbar />

            {/* Clean background - no dark gradients */}
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Enhanced Header with Glass Effect */}
                    <div className="relative mb-8">
                        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-lg">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                        <LayoutGrid className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                            Dashboard
                                        </h1>
                                        <p className="text-slate-500 text-sm flex items-center gap-2">
                                            <span>{getMotivationMessage()}</span>
                                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowForm(!showForm)}
                                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg ${
                                    showForm
                                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-slate-200/50"
                                        : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 hover:scale-105"
                                }`}
                            >
                                {showForm ? (
                                    <>
                                        <X size={18} />
                                        Close Form
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle size={18} />
                                        New Todo
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    {showForm && (
                        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl">
                                <TodoForm
                                    onCreated={() => {
                                        fetchTodos();
                                        setShowForm(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Enhanced Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {[
                            {
                                label: "Total Tasks",
                                value: totalTodos,
                                color: "indigo",
                                icon: ClipboardList,
                                trend: "All tasks",
                                gradient: "from-indigo-50 to-indigo-100/50"
                            },
                            {
                                label: "Pending",
                                value: pendingTodos,
                                color: "amber",
                                icon: Clock,
                                trend: "Awaiting completion",
                                gradient: "from-amber-50 to-amber-100/50"
                            },
                            {
                                label: "Completed",
                                value: completedTodos,
                                color: "emerald",
                                icon: CheckCircle2,
                                trend: "Done and dusted",
                                gradient: "from-emerald-50 to-emerald-100/50"
                            },
                            {
                                label: "Progress",
                                value: `${completionRate}%`,
                                color: "indigo",
                                icon: TrendingUp,
                                trend: `${completionRate}% complete`,
                                gradient: "from-indigo-50 to-indigo-100/50",
                                progress: completionRate
                            }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            {stat.label}
                                        </p>
                                        <p className={`text-3xl font-bold mt-2 ${
                                            stat.color === "indigo" ? "text-indigo-600" :
                                            stat.color === "amber" ? "text-amber-600" :
                                            "text-emerald-600"
                                        }`}>
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className={`w-6 h-6 ${
                                            stat.color === "indigo" ? "text-indigo-600" :
                                            stat.color === "amber" ? "text-amber-600" :
                                            "text-emerald-600"
                                        }`} />
                                    </div>
                                </div>
                                {stat.progress !== undefined ? (
                                    <div className="mt-4">
                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${stat.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                                        <ArrowUp className="w-3.5 h-3.5 text-emerald-500" />
                                        <span>{stat.trend}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Search & Filter */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-lg shadow-slate-200/30">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search tasks..."
                                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all bg-slate-50/50 focus:bg-white"
                                />
                            </div>

                            <div className="relative sm:w-52">
                                <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border-2 border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none appearance-none bg-white transition-all cursor-pointer"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>

                            <div className="relative sm:w-48">
                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                                    className="w-full pl-10 pr-10 py-3 border-2 border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none appearance-none bg-white transition-all cursor-pointer"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>

                            {hasActiveFilters && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setStatus("");
                                    }}
                                    className="inline-flex items-center gap-2 px-5 py-3 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border-2 border-transparent hover:border-indigo-200"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Clear</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Todo List Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl flex items-center justify-center">
                                <LayoutGrid className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Your Tasks
                                </h2>
                                <p className="text-xs text-slate-400">
                                    {totalTodos} {totalTodos === 1 ? "task" : "tasks"} in your list
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                {completedTodos}/{totalTodos} done
                            </span>
                        </div>
                    </div>

                    {/* Todo List Content */}
                    {loading ? (
                        <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center shadow-xl">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-3 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                                <p className="text-slate-500 text-sm font-medium">
                                    Loading tasks...
                                </p>
                            </div>
                        </div>
                    ) : sortedTodos.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center shadow-xl">
                            <div className="max-w-sm mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <ClipboardList className="w-10 h-10 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    No tasks found
                                </h3>
                                <p className="text-slate-500 text-sm mb-6">
                                    {hasActiveFilters 
                                        ? "Try adjusting your filters to see more tasks" 
                                        : "Create your first task to get started on your journey"}
                                </p>
                                {!hasActiveFilters && (
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 hover:scale-105"
                                    >
                                        <PlusCircle className="w-4 h-4" />
                                        <span>Create First Task</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {sortedTodos.map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onRefresh={fetchTodos}
                                />
                            ))}
                        </div>
                    )}

                    {/* Quick Action Footer */}
                    {sortedTodos.length > 0 && (
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200">
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Zap className="w-4 h-4 text-amber-500" />
                                <span>Quick tip: Use filters to find tasks faster</span>
                            </div>
                            <button
                                onClick={() => setShowForm(true)}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors flex items-center gap-1"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Add another task
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </ProtectedRoute>
    );
}