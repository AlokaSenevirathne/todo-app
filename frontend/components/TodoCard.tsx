"use client";

import { useState } from "react";
import api from "@/services/api";
import { Edit, Save, Trash2, CheckCircle, Clock, X, RotateCcw } from "lucide-react";

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

export default function TodoCard({
    todo,
    onRefresh
}: Props) {

    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDelete = async () => {

        if (!confirm("Delete this todo?"))
            return;

        setIsDeleting(true);

        try {

            await api.delete(`/todos/${todo.id}`);
            onRefresh();

        } catch (error) {

            console.log(error);

        } finally {

            setIsDeleting(false);

        }

    };

    const handleStatus = async () => {

        setIsUpdating(true);

        try {

            if (todo.status === "pending") {

                await api.patch(
                    `/todos/${todo.id}/complete`
                );

            } else {

                await api.patch(
                    `/todos/${todo.id}/pending`
                );

            }

            onRefresh();

        } catch (error) {

            console.log(error);

        } finally {

            setIsUpdating(false);

        }

    };

    const handleUpdate = async () => {

        setIsUpdating(true);

        try {

            await api.put(
                `/todos/${todo.id}`,
                {
                    title,
                    description,
                    status: todo.status
                }
            );

            setEditing(false);
            onRefresh();

        } catch (error) {

            console.log(error);

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

        <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all duration-200 relative overflow-hidden">

            {/* Status Indicator Line */}
            <div className={`absolute top-0 left-0 w-1 h-full transition-colors duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}`} />

            {editing ? (

                // Edit Mode
                <div className="space-y-4">

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Title
                        </label>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-slate-50 focus:bg-white"
                            placeholder="Enter title"
                        />

                    </div>

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-slate-50 focus:bg-white resize-none"
                            placeholder="Enter description"
                        />

                    </div>

                    <div className="flex gap-2">

                        <button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >

                            {isUpdating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Save</span>
                                </>
                            )}

                        </button>

                        <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                        </button>

                    </div>

                </div>

            ) : (

                // View Mode
                <>

                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">

                        <h3 className={`text-base font-semibold text-slate-900 flex-1 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                            {todo.title}
                        </h3>

                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                            isCompleted
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                        }`}>

                            {isCompleted ? (
                                <CheckCircle className="w-3 h-3" />
                            ) : (
                                <Clock className="w-3 h-3" />
                            )}

                            {todo.status}

                        </span>

                    </div>

                    {/* Description */}
                    <p className={`text-sm text-slate-600 mt-3 line-clamp-3 ${isCompleted ? 'text-slate-400' : ''}`}>
                        {todo.description || "No description"}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">

                        <button
                            onClick={() => setEditing(true)}
                            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                        </button>

                        <button
                            onClick={handleStatus}
                            disabled={isUpdating}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                isCompleted
                                    ? "bg-amber-50 hover:bg-amber-100 text-amber-700"
                                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                            }`}
                        >

                            {isUpdating ? (
                                <div className={`w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin ${isCompleted ? 'border-amber-700' : 'border-emerald-700'}`} />
                            ) : isCompleted ? (
                                <>
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Pending</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>Complete</span>
                                </>
                            )}

                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ml-auto"
                        >

                            {isDeleting ? (
                                <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                </>
                            )}

                        </button>

                    </div>

                </>

            )}

        </div>

    );

}