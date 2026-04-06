"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("Google authentication failed.");
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || "Invalid credentials.");
            setLoading(false);
        } else {
            toast.success("Welcome back.");
            router.push("/");
        }
    };

    return (
        <div className="glass-panel p-8 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-[#f5f5f0] text-xl font-light tracking-tight mb-1">
                    Sign In
                </h2>
                <p className="text-[#828179] text-xs font-mono-custom tracking-wider">
                    [AUTH·PROT] // ENTER_CREDENTIALS
                </p>
            </div>

            {/* Social Login */}
            <button
                onClick={handleGoogleSignIn}
                className="btn-ghost-swiss w-full flex items-center justify-center gap-3 py-3 mb-6 bg-[#0a0a0a]/50 hover:bg-[#111111] transition-all"
            >
                <Icon icon="logos:google-icon" width="18" />
                <span className="font-mono-custom text-[0.75rem] tracking-[0.05em] text-[#f5f5f0]">
                    CONTINUE WITH GOOGLE
                </span>
            </button>

            <div className="relative flex items-center justify-center mb-6">
                <div className="absolute w-full h-[1px] bg-[#1f1f1e]"></div>
                <span className="relative z-10 bg-[#0a0a0a] px-3 font-mono-custom text-[0.625rem] text-[#555] tracking-widest">
                    OR_EMAIL_AUTH
                </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div>
                    <label className="block font-mono-custom text-[0.625rem] text-[#828179] mb-2 tracking-[0.1em] uppercase">
                        EMAIL_UPLINK
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#050505] border border-[#1f1f1e] p-3 text-[0.875rem] text-[#f5f5f0] outline-none focus:border-[#d4b87a] transition-colors"
                        placeholder="institutional@entity.com"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block font-mono-custom text-[0.625rem] text-[#828179] tracking-[0.1em] uppercase">
                            ACCESS_KEY
                        </label>
                        <Link
                            href="/forgot-password"
                            className="font-mono-custom text-[0.625rem] text-[#d4b87a] hover:opacity-70 transition-opacity uppercase tracking-widest"
                        >
                            RECOVER?
                        </Link>
                    </div>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#050505] border border-[#1f1f1e] p-3 text-[0.875rem] text-[#f5f5f0] outline-none focus:border-[#d4b87a] transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="btn-swiss w-full py-4 mt-2 font-mono-custom text-[0.8125rem] tracking-[0.1em] disabled:opacity-50"
                >
                    {loading ? (
                        <Icon icon="line-md:loading-loop" className="mx-auto text-xl" />
                    ) : ( 
                        <ScrambleText text="AUTHENTICATE_SESSION" className="relative z-10" />
                    )}
                </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[#1f1f1e] text-center">
                <p className="font-mono-custom text-[0.6875rem] text-[#828179] tracking-wider uppercase">
                    NO_CLEARANCE? {" "}
                    <Link
                        href="/sign-up"
                        className="text-[#d4b87a] hover:underline underline-offset-4"
                    >
                        APPLY_FOR_ACCESS
                    </Link>
                </p>
            </div>
        </div>
    );
}
