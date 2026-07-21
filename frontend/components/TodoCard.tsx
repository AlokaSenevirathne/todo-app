"use client";

import { useState } from "react";
import api from "@/services/api";
import { Edit, Save, Trash2, CheckCircle2, Clock, X, RotateCcw, AlertTriangle } from "lucide-react";

interface Todo {
    id: number;
    title: string;
    description: string;
    status: string;
}

interface Props {
    todo: Todo;
    onRefresh: () => void;
}

export default function TodoCard({ todo, onRefresh }: Props) {

    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const confirmDelete = async () => {
        setIsDeleting(true);

        try {
            await api.delete(`/todos/${todo.id}`);
            onRefresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    const handleStatusToggle = async () => {
        setIsUpdating(true);

        try {
            if (todo.status === "pending") {
                await api.patch(`/todos/${todo.id}/complete`);
            } else {
                await api.patch(`/todos/${todo.id}/pending`);
            }
            onRefresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdate = async () => {
        if (!title.trim()) return;

        setIsUpdating(true);

        try {
            await api.put(`/todos/${todo.id}`, {
                title: title.trim(),
                description: description.trim(),
                status: todo.status
            });

            setEditing(false);
            onRefresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancelEdit = () => {
        setTitle(todo.title);
        setDescription(todo.description);
        setEditing(false);
    };

    const isCompleted = todo.status === "completed";

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between relative group">

            {/* Custom Delete Confirmation Modal Overlay */}
            {showDeleteConfirm && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-xl z-20 p-4 flex flex-col justify-between items-center text-center animate-in fade-in duration-150">
                    <div className="flex flex-col items-center space-y-1.5 my-auto">
                        <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Delete Task?</h4>
                        <p className="text-[11px] text-slate-500 max-w-[200px] leading-tight">
                            This action cannot be undone. Permanent removal.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 w-full pt-2 border-t border-slate-100">
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={isDeleting}
                            className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                            {isDeleting ? (
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <span>Delete</span>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {editing ? (

                /* Edit Mode Form */
                <div className="space-y-3">
                    <div>
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
                            Edit Title
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 focus:bg-white transition-all"
                            placeholder="Task title..."
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
                            Edit Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 focus:bg-white transition-all resize-none"
                            placeholder="Task description..."
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                        <button
                            onClick={handleUpdate}
                            disabled={isUpdating || !title.trim()}
                            className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs"
                        >
                            {isUpdating ? (
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Save className="w-3.5 h-3.5" />
                            )}
                            <span>Save</span>
                        </button>

                        <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>

            ) : (

                /* Read Mode Display */
                <>
                    <div className="space-y-2">
                        {/* Title & Status Badge Header */}
                        <div className="flex items-start justify-between gap-2">
                            <h3 className={`text-sm font-bold tracking-tight text-slate-900 leading-snug flex-1 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                                {todo.title}
                            </h3>

                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider shrink-0 border ${
                                isCompleted
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                    : "bg-amber-50 text-amber-800 border-amber-200"
                            }`}>
                                {isCompleted ? (
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                ) : (
                                    <Clock className="w-3 h-3 text-amber-600" />
                                )}
                                <span>{todo.status}</span>
                            </span>
                        </div>

                        {/* Description */}
                        <p className={`text-xs text-slate-600 leading-relaxed line-clamp-3 ${isCompleted ? 'text-slate-400' : ''}`}>
                            {todo.description || <span className="italic text-slate-400">No additional description</span>}
                        </p>
                    </div>

                    {/* Bottom Toolbar Actions */}
                    <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-100 text-xs">
                        
                        <div className="flex items-center gap-1.5">
                            {/* Toggle Completion */}
                            <button
                                onClick={handleStatusToggle}
                                disabled={isUpdating}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all border ${
                                    isCompleted
                                        ? "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                                }`}
                                title={isCompleted ? "Mark as pending" : "Mark as completed"}
                            >
                                {isUpdating ? (
                                    <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                ) : isCompleted ? (
                                    <>
                                        <RotateCcw className="w-3 h-3" />
                                        <span>Mark Pending</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Complete</span>
                                    </>
                                )}
                            </button>

                            {/* Edit Button */}
                            <button
                                onClick={() => setEditing(true)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                            </button>
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
                            title="Delete task"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>

                    </div>
                </>

            )}

        </div>
    );
}