"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";
import { LogOut, ClipboardList } from "lucide-react";

export default function Navbar() {

    const router = useRouter();

    const handleLogout = () => {

        removeToken();

        router.push("/login");

    };

    return (

        <nav className="bg-white border-b border-slate-200 px-6 sm:px-8 py-3.5 flex justify-between items-center">

            <div className="flex items-center gap-2.5">

                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-white" />
                </div>

                <h1 className="text-base font-semibold text-slate-900 tracking-tight">
                    Todo App
                </h1>

            </div>

            <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 px-3.5 py-2 rounded-lg transition-colors"
            >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
            </button>

        </nav>

    );

}