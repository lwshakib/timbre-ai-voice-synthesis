"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) {
            toast.error("Invalid or expired session token.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Access keys do not match.");
            return;
        }

        setLoading(true);

        const { error } = await authClient.resetPassword({
            newPassword: password,
            token: token,
        });

        if (error) {
            toast.error(error.message || "Failed to reset password.");
            setLoading(false);
        } else {
            toast.success("Password updated. Redirecting.");
            setTimeout(() => {
                router.push("/sign-in");
            }, 2000);
        }
    };

    if (!token) {
        return (
            <div className="glass-panel p-10 rounded-sm animate-in fade-in duration-700 text-center">
                <div className="w-16 h-16 rounded-full border border-destructive flex items-center justify-center mx-auto mb-6 bg-destructive/10">
                    <Icon icon="solar:shield-warning-linear" className="text-destructive text-3xl" />
                </div>
                <h2 className="text-foreground text-xl font-light tracking-tight mb-4">
                    Invalid Session
                </h2>
                <p className="text-muted-foreground text-[0.8125rem] mb-8">
                    Your password reset link is invalid or has expired. Please request a new one.
                </p>
                <button
                    onClick={() => router.push("/forgot-password")}
                    className="btn-swiss w-full py-4 font-mono-custom text-[0.8125rem] tracking-[0.1em]"
                >
                    <ScrambleText text="Request New Link" className="relative z-10" />
                </button>
            </div>
        );
    }

    return (
        <div className="glass-panel p-8 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-foreground text-xl font-light tracking-tight mb-1">
                    Set New Password
                </h2>
                <p className="text-muted-foreground text-xs font-mono-custom tracking-wider">
                    Update your credentials to regain access.
                </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                    <label className="block font-mono-custom text-[0.625rem] text-muted-foreground mb-2 tracking-[0.1em] uppercase">
                        New Password
                    </label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-background border border-border p-3 text-[0.875rem] text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <label className="block font-mono-custom text-[0.625rem] text-muted-foreground mb-2 tracking-[0.1em] uppercase">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-background border border-border p-3 text-[0.875rem] text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <div className="pt-2">
                    <button
                        disabled={loading}
                        type="submit"
                        className="btn-swiss w-full py-4 font-mono-custom text-[0.8125rem] tracking-[0.1em] disabled:opacity-50"
                    >
                        {loading ? (
                            <Icon icon="line-md:loading-loop" className="mx-auto text-xl" />
                        ) : ( 
                            <ScrambleText text="Reset Password" className="relative z-10" />
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="font-mono-custom text-[0.625rem] text-muted-foreground/30 tracking-widest uppercase">
                    Security Level: High
                </p>
            </div>
        </div>
    );
}
