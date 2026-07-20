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
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600 text-lg">
                    Redirecting...
                </p>
            </div>
        );
    }

    return <>{children}</>;
}