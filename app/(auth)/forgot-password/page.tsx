"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleForgetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await authClient.requestPasswordReset({
            email,
            redirectTo: "/reset-password",
        });

        if (error) {
            toast.error(error.message || "Failed to initiate recovery.");
            setLoading(false);
        } else {
            toast.success("Password reset email sent.");
            setIsSuccess(true);
        }
    };

    if (isSuccess) {
        return (
            <div className="glass-panel p-10 rounded-sm animate-in fade-in zoom-in-95 duration-700 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-[#d4b87a] flex items-center justify-center mb-6 bg-[#d4b87a]/10">
                    <Icon icon="solar:shield-keyhole-linear" className="text-[#d4b87a] text-3xl animate-pulse" />
                </div>
                
                <h2 className="text-[#f5f5f0] text-2xl font-light tracking-tight mb-3">
                    Check your email
                </h2>
                <p className="text-[#828179] text-[0.875rem] leading-relaxed max-w-[280px] mb-10">
                    We've sent a password recovery link to <span className="text-[#f5f5f0]">{email}</span>. Please authorize via the link in your inbox.
                </p>

                <div className="w-full space-y-4">
                    <a 
                        href="https://mail.google.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn-swiss w-full py-4 font-mono-custom text-[0.8125rem] tracking-[0.1em]"
                    >
                        <ScrambleText text="Open Inbox" className="relative z-10" />
                    </a>
                    
                    <Link 
                        href="/sign-in" 
                        className="btn-ghost-swiss w-full flex items-center justify-center py-4 bg-[#0a0a0a]/50 text-[#828179] font-mono-custom text-[0.8125rem] tracking-[0.1em] hover:text-[#f5f5f0]"
                    >
                        <ScrambleText text="Back to Login" />
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1f1f1e] w-full">
                    <p className="font-mono-custom text-[0.625rem] text-[#555] uppercase tracking-widest leading-relaxed">
                        [SYS·REC // ENCRYPTED_HANDSHAKE]
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel p-8 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-[#f5f5f0] text-xl font-light tracking-tight mb-1">
                    Reset your password
                </h2>
                <p className="text-[#828179] text-xs font-mono-custom tracking-wider">
                    We'll send a secure link to your email.
                </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleForgetPassword} className="space-y-6">
                <div>
                    <label className="block font-mono-custom text-[0.625rem] text-[#828179] mb-2 tracking-[0.1em] uppercase">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#050505] border border-[#1f1f1e] p-3 text-[0.875rem] text-[#f5f5f0] outline-none focus:border-[#d4b87a] transition-colors"
                        placeholder="institutional@entity.com"
                    />
                    <p className="mt-2 font-mono-custom text-[0.625rem] text-[#555] tracking-tight">
                        We will send a secure link to reset your password.
                    </p>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="btn-swiss w-full py-4 font-mono-custom text-[0.8125rem] tracking-[0.1em] disabled:opacity-50"
                >
                    {loading ? (
                        <Icon icon="line-md:loading-loop" className="mx-auto text-xl" />
                    ) : ( 
                        <ScrambleText text="Send recovery link" className="relative z-10" />
                    )}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#1f1f1e] text-center">
                <p className="font-mono-custom text-[0.6875rem] text-[#828179] tracking-wider uppercase">
                    Remembered? {" "}
                    <Link
                        href="/sign-in"
                        className="text-[#d4b87a] hover:underline underline-offset-4"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
