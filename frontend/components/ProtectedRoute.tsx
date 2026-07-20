"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {

    const router = useRouter();

    useEffect(() => {

        const token = getToken();

        if (!token) {
            router.replace("/login");
        }

    }, [router]);

    if (!getToken()) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                    <p className="text-slate-500 text-sm">
                        Redirecting...
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}