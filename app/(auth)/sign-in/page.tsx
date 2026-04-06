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
                <h2 className="text-foreground text-xl font-light tracking-tight mb-1">
                    Sign In
                </h2>
                <p className="text-muted-foreground text-xs font-mono-custom tracking-wider">
                    Sign in to your account
                </p>
            </div>

            {/* Social Login */}
            <button
                onClick={handleGoogleSignIn}
                className="btn-ghost-swiss w-full flex items-center justify-center gap-3 py-3 mb-6 bg-card/50 hover:bg-secondary transition-all"
            >
                <Icon icon="logos:google-icon" width="18" />
                <span className="font-mono-custom text-[0.75rem] tracking-[0.05em] text-foreground">
                    Continue with Google
                </span>
            </button>

            <div className="relative flex items-center justify-center mb-6">
                <div className="absolute w-full h-[1px] bg-border"></div>
                <span className="relative z-10 bg-card px-3 font-mono-custom text-[0.625rem] text-muted-foreground tracking-widest lowercase">
                    or sign in with email
                </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div>
                    <label className="block font-mono-custom text-[0.625rem] text-muted-foreground mb-2 tracking-[0.1em] uppercase">
                        Email address
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border border-border p-3 text-[0.875rem] text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="institutional@entity.com"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block font-mono-custom text-[0.625rem] text-muted-foreground tracking-[0.1em] uppercase">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="font-mono-custom text-[0.625rem] text-primary hover:opacity-70 transition-opacity uppercase tracking-widest"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-background border border-border p-3 text-[0.875rem] text-foreground outline-none focus:border-primary transition-colors"
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
                        <ScrambleText text="Sign In" className="relative z-10" />
                    )}
                </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="font-mono-custom text-[0.6875rem] text-muted-foreground tracking-wider uppercase">
                    Don't have an account? {" "}
                    <Link
                        href="/sign-up"
                        className="text-primary hover:underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
