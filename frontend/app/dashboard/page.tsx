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
    ArrowUpRight,
    Calendar,
    ChevronDown,
    Layers,
    ListFilter
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

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
                <Navbar />

                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                    {/* Page Top Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                    Task Management
                                </h1>
                                <span className="text-xs font-mono font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                                    Workspace
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs mt-1">
                                Overview of your personal tasks, progress, and daily goals.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs transition-all shadow-xs ${
                                showForm
                                    ? "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                                    : "bg-slate-900 text-white hover:bg-slate-800"
                            }`}
                        >
                            {showForm ? (
                                <>
                                    <X size={15} />
                                    <span>Hide Form</span>
                                </>
                            ) : (
                                <>
                                    <PlusCircle size={15} />
                                    <span>Create New Task</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Collapsible Form Container */}
                    {showForm && (
                        <div className="animate-in fade-in duration-200">
                            <TodoForm
                                onCreated={() => {
                                    fetchTodos();
                                    setShowForm(false);
                                }}
                            />
                        </div>
                    )}

                    {/* Stats Metrics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Total Tasks",
                                value: totalTodos,
                                subtext: "All created items",
                                icon: ClipboardList,
                                badge: "Total",
                                badgeBg: "bg-slate-100 text-slate-700 border-slate-200"
                            },
                            {
                                label: "Pending Tasks",
                                value: pendingTodos,
                                subtext: "Needs attention",
                                icon: Clock,
                                badge: "Pending",
                                badgeBg: "bg-amber-50 text-amber-700 border-amber-200"
                            },
                            {
                                label: "Completed Tasks",
                                value: completedTodos,
                                subtext: "Successfully finished",
                                icon: CheckCircle2,
                                badge: "Completed",
                                badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200"
                            },
                            {
                                label: "Completion Rate",
                                value: `${completionRate}%`,
                                subtext: `${completedTodos} of ${totalTodos} items`,
                                icon: TrendingUp,
                                badge: "Progress",
                                badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200"
                            }
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        {stat.label}
                                    </span>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${stat.badgeBg}`}>
                                        {stat.badge}
                                    </span>
                                </div>

                                <div className="mt-3 flex items-baseline justify-between">
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {stat.value}
                                    </p>
                                    <stat.icon className="w-5 h-5 text-slate-400" />
                                </div>

                                <p className="text-[11px] text-slate-400 mt-2">
                                    {stat.subtext}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Toolbar: Search, Filter Tabs & Sort */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                            
                            {/* Search Bar */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search tasks by title..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 focus:bg-white transition-all"
                                />
                                {search && (
                                    <button 
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            {/* Status Quick Tabs */}
                            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80 text-xs">
                                <button
                                    onClick={() => setStatus("")}
                                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                                        status === ""
                                            ? "bg-white text-slate-900 shadow-xs font-semibold"
                                            : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    All ({totalTodos})
                                </button>
                                <button
                                    onClick={() => setStatus("pending")}
                                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                                        status === "pending"
                                            ? "bg-white text-amber-700 shadow-xs font-semibold"
                                            : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    Pending
                                </button>
                                <button
                                    onClick={() => setStatus("completed")}
                                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                                        status === "completed"
                                            ? "bg-white text-emerald-700 shadow-xs font-semibold"
                                            : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    Completed
                                </button>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                                        className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-slate-800 cursor-pointer appearance-none"
                                    >
                                        <option value="newest">Sort: Newest First</option>
                                        <option value="oldest">Sort: Oldest First</option>
                                    </select>
                                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>

                                {hasActiveFilters && (
                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setStatus("");
                                        }}
                                        className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        <span>Reset</span>
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Todo Cards Section */}
                    {loading ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center shadow-xs">
                            <div className="flex flex-col items-center justify-center space-y-3">
                                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                                <p className="text-xs text-slate-500 font-medium">
                                    Loading your tasks...
                                </p>
                            </div>
                        </div>
                    ) : sortedTodos.length === 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
                            <div className="max-w-xs mx-auto space-y-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto text-slate-400">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">
                                    No matching tasks found
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {hasActiveFilters 
                                        ? "No tasks match your current search query or filter criteria." 
                                        : "Your task list is empty. Click the button below to add your first item."}
                                </p>
                                {!hasActiveFilters ? (
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-all shadow-xs mt-2"
                                    >
                                        <PlusCircle className="w-4 h-4" />
                                        <span>Create First Task</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setStatus("");
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-all mt-2"
                                    >
                                        <span>Clear Active Filters</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sortedTodos.map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onRefresh={fetchTodos}
                                />
                            ))}
                        </div>
                    )}

                </main>
            </div>
        </ProtectedRoute>
    );
}