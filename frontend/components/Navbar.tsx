"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";
import api from "@/services/api";
import { LogOut, CheckSquare, User, ShieldCheck } from "lucide-react";

export default function Navbar() {

    const router = useRouter();
    const [userName, setUserName] = useState<string>("Workspace User");

    useEffect(() => {
        // Fetch authenticated user details
        api.get("/user")
            .then((res) => {
                if (res.data?.user?.name) {
                    setUserName(res.data.user.name);
                }
            })
            .catch(() => {});
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error(error);
        } finally {
            removeToken();
            router.push("/login");
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Left Brand Area */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-xs">
                        <CheckSquare className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-slate-900 tracking-tight">
                                TaskFlow
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Online &amp; Synced
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Actions & User Profile */}
                <div className="flex items-center gap-4">
                    
                    <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">
                            {getInitials(userName)}
                        </div>
                        <div className="text-left text-xs">
                            <p className="font-semibold text-slate-800 leading-tight">{userName}</p>
                            <p className="text-slate-400 font-mono text-[10px]">Authenticated</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-red-700 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-all"
                        title="Sign out of your session"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                    </button>

                </div>

            </div>
        </header>
    );
}