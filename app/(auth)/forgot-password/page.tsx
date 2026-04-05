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
            toast.success("Recovery protocol initiated.");
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
                    Recovery Sent
                </h2>
                <p className="text-[#828179] text-[0.875rem] leading-relaxed max-w-[280px] mb-10">
                    A secure password recovery uplink has been sent to <span className="text-[#f5f5f0]">{email}</span>. Valid for 60 minutes.
                </p>

                <div className="w-full space-y-4">
                    <a 
                        href="https://mail.google.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn-swiss w-full py-4 font-mono-custom text-[0.8125rem] tracking-[0.1em]"
                    >
                        <ScrambleText text="CHECK_INBOX" />
                    </a>
                    
                    <Link 
                        href="/sign-in" 
                        className="btn-ghost-swiss w-full flex items-center justify-center py-4 bg-[#0a0a0a]/50 text-[#828179] font-mono-custom text-[0.8125rem] tracking-[0.1em] hover:text-[#f5f5f0]"
                    >
                        <ScrambleText text="BACK_TO_LOGIN" />
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
                    Clearance Recovery
                </h2>
                <p className="text-[#828179] text-xs font-mono-custom tracking-wider">
                    [RECOV·PROT] // IDENTIFY_ACCOUNT
                </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleForgetPassword} className="space-y-6">
                <div>
                    <label className="block font-mono-custom text-[0.625rem] text-[#828179] mb-2 tracking-[0.1em] uppercase">
                        ACCOUNT_EMAIL
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
                        Verification of identity required for uplink dispatch.
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
                        <ScrambleText text="INITIATE_RECOVERY" />
                    )}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#1f1f1e] text-center">
                <p className="font-mono-custom text-[0.6875rem] text-[#828179] tracking-wider uppercase">
                    REMEMBERED? {" "}
                    <Link
                        href="/sign-in"
                        className="text-[#d4b87a] hover:underline underline-offset-4"
                    >
                        LOGIN
                    </Link>
                </p>
            </div>
        </div>
    );
}
