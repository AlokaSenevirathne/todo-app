"use client";

import { useState } from "react";
import api from "@/services/api";
import { Plus, Loader2, ClipboardList, Check } from "lucide-react";

interface Props {
    onCreated: () => void;
}

export default function TodoForm({ onCreated }: Props) {

    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!form.title.trim()) return;

        setLoading(true);

        try {

            await api.post("/todos", {
                title: form.title.trim(),
                description: form.description.trim(),
                status: "pending"
            });

            setForm({
                title: "",
                description: ""
            });

            onCreated();

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const isFormValid = form.title.trim().length > 0;

    return (

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-5">

                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-indigo-600" />
                </div>

                <h2 className="text-base font-semibold text-slate-900">
                    Create New Task
                </h2>

                <span className="ml-auto text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
                    Required *
                </span>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                {/* Title Input */}
                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Task Title
                    </label>

                    <input
                        type="text"
                        placeholder="Enter task title..."
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value
                            })
                        }
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-colors bg-slate-50 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                        required
                        disabled={loading}
                    />

                </div>

                {/* Description Input */}
                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Description
                        <span className="text-slate-400 font-normal ml-1">
                            (optional)
                        </span>
                    </label>

                    <textarea
                        placeholder="Add some details about your task..."
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })
                        }
                        rows={3}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-colors bg-slate-50 focus:bg-white resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={loading}
                    />

                    {form.description.length > 0 && (
                        <p className="text-xs text-slate-400 mt-1.5 text-right">
                            {form.description.length} characters
                        </p>
                    )}

                </div>

                {/* Submit Button */}
                <div className="pt-2">

                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors duration-150 shadow-sm"
                    >

                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Creating task...</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                <span>Create Task</span>
                            </>
                        )}

                    </button>

                    {/* Quick tip */}
                    {!loading && isFormValid && (

                        <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Ready to create</span>
                        </p>

                    )}

                </div>

            </form>

        </div>

    );

}