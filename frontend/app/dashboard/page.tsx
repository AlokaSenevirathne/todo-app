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
    LayoutGrid
} from "lucide-react";

interface Todo {
    id: number;
    title: string;
    description: string;
    status: string;
}

export default function DashboardPage() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [showForm, setShowForm] = useState(false);

    const fetchTodos = async () => {
        try {
            setLoading(true);

            const response = await api.get("/todos", {
                params: {
                    search,
                    status
                }
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
        const timeout = setTimeout(() => {
            fetchTodos();
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, status]);

    const totalTodos = useMemo(() => {
        return todos.length;
    }, [todos]);

    const pendingTodos = useMemo(() => {
        return todos.filter(todo => todo.status === "pending").length;
    }, [todos]);

    const completedTodos = useMemo(() => {
        return todos.filter(todo => todo.status === "completed").length;
    }, [todos]);

    const completionRate = useMemo(() => {
        if (totalTodos === 0) return 0;
        return Math.round((completedTodos / totalTodos) * 100);
    }, [totalTodos, completedTodos]);

    const hasActiveFilters = search.length > 0 || status.length > 0;

    return (
        <ProtectedRoute>

            <Navbar />

            <div className="min-h-screen bg-slate-50">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                                Dashboard
                            </h1>
                            <p className="text-slate-500 mt-1 text-sm">
                                Manage your tasks and track progress
                            </p>
                        </div>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors duration-150 shadow-sm whitespace-nowrap"
                        >
                            {showForm ? (
                                <>
                                    <X size={16} />
                                    Close Form
                                </>
                            ) : (
                                <>
                                    <PlusCircle size={16} />
                                    New Todo
                                </>
                            )}
                        </button>
                    </div>

                    {/* Form */}
                    {showForm && (
                        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                            <TodoForm
                                onCreated={() => {
                                    fetchTodos();
                                    setShowForm(false);
                                }}
                            />
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        Total Tasks
                                    </p>
                                    <p className="text-2xl font-semibold text-slate-900 mt-2">
                                        {totalTodos}
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                                    <ClipboardList className="w-5 h-5 text-indigo-600" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>All tasks</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        Pending
                                    </p>
                                    <p className="text-2xl font-semibold text-amber-600 mt-2">
                                        {pendingTodos}
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-amber-600" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                                <span>Awaiting completion</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        Completed
                                    </p>
                                    <p className="text-2xl font-semibold text-emerald-600 mt-2">
                                        {completedTodos}
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                                <span>Done and dusted</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        Progress
                                    </p>
                                    <p className="text-2xl font-semibold text-indigo-600 mt-2">
                                        {completionRate}%
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div
                                        className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                                        style={{ width: `${completionRate}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Search & Filter */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8">
                        <div className="flex flex-col sm:flex-row gap-3">

                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search tasks..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-colors bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="relative sm:w-48">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none appearance-none bg-white transition-colors cursor-pointer"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            {hasActiveFilters && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setStatus("");
                                    }}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Clear Filters</span>
                                </button>
                            )}

                        </div>
                    </div>

                    {/* Todo List */}
                    <div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <LayoutGrid className="w-4 h-4 text-slate-400" />
                                <h2 className="text-base font-semibold text-slate-900">
                                    Your Tasks
                                </h2>
                            </div>
                            <span className="text-xs font-medium text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                                {totalTodos} {totalTodos === 1 ? "task" : "tasks"}
                            </span>
                        </div>

                        {loading ? (

                            <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                                    <p className="text-slate-500 text-sm">
                                        Loading tasks...
                                    </p>
                                </div>
                            </div>

                        ) : todos.length === 0 ? (

                            <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
                                <div className="max-w-sm mx-auto">
                                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ClipboardList className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <h3 className="text-base font-semibold text-slate-900 mb-1.5">
                                        No tasks found
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-5">
                                        {hasActiveFilters ? "Try adjusting your filters" : "Create your first task to get started"}
                                    </p>

                                    {!hasActiveFilters && (
                                        <button
                                            onClick={() => setShowForm(true)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            <PlusCircle className="w-4 h-4" />
                                            <span>Create Task</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                        ) : (

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {todos.map((todo) => (
                                    <TodoCard
                                        key={todo.id}
                                        todo={todo}
                                        onRefresh={fetchTodos}
                                    />
                                ))}
                            </div>

                        )}

                    </div>

                </div>

            </div>

        </ProtectedRoute>
    );
}