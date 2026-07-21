"use client";

import { useState } from "react";
import api from "@/services/api";
import { Plus, Loader2, CheckSquare, Sparkles } from "lucide-react";

interface Props {
    onCreated: () => void;
}

export default function TodoForm({ onCreated }: Props) {

    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
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
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = form.title.trim().length > 0;

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center text-white">
                        <Plus className="w-3.5 h-3.5" />
                    </div>
                    <h2 className="text-sm font-bold text-slate-900">
                        Create New Task
                    </h2>
                </div>
                <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    Auto-Saved
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Title */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Prepare weekly report or schedule appointment"
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value
                            })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 focus:bg-white transition-all disabled:opacity-60"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Description */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-700">
                            Description <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        {form.description.length > 0 && (
                            <span className="text-[10px] text-slate-400 font-mono">
                                {form.description.length} chars
                            </span>
                        )}
                    </div>
                    <textarea
                        placeholder="Add additional details, context, or acceptance criteria..."
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })
                        }
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 focus:bg-white transition-all resize-none disabled:opacity-60"
                        disabled={loading}
                    />
                </div>

                {/* Submit */}
                <div className="pt-1 flex items-center justify-between">
                    <p className="text-[11px] text-slate-400">
                        Task will default to <span className="font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">pending</span> status
                    </p>

                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-xs font-medium transition-all shadow-xs"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Save Task</span>
                            </>
                        )}
                    </button>
                </div>

            </form>

        </div>
    );
}