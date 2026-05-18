'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Icon } from '@iconify/react';
import { ScrambleText } from '@/components/marketing/scramble-text';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: '/sign-in', // Verification link should redirect to sign-in
    });

    if (error) {
      toast.error(error.message || 'Registration failed.');
      setLoading(false);
    } else {
      toast.success('Account created successfully.');
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-panel p-10 rounded-sm animate-in fade-in zoom-in-95 duration-700 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mb-6 bg-primary/10">
          <Icon icon="solar:letter-linear" className="text-primary text-3xl animate-pulse" />
        </div>

        <h2 className="text-foreground text-2xl font-light tracking-tight mb-3">
          Verify your email
        </h2>
        <p className="text-muted-foreground text-[0.875rem] leading-relaxed max-w-[280px] mb-10">
          We&apos;ve sent a verification link to <span className="text-foreground">{email}</span>.
          Please check your inbox to complete the setup.
        </p>

        <div className="w-full space-y-4">
          <Button
            asChild
            className="w-full h-12 font-mono-custom text-[0.8125rem] tracking-[0.1em] rounded-lg cursor-pointer"
          >
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">
              <ScrambleText text="Open Inbox" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full h-12 bg-secondary/50 hover:bg-secondary text-muted-foreground font-mono-custom text-[0.8125rem] tracking-[0.1em] hover:text-foreground rounded-lg"
          >
            <Link href="/sign-in">
              <ScrambleText text="Back to Login" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border w-full">
          <p className="font-mono-custom text-[0.625rem] text-muted-foreground/30 uppercase tracking-widest">
            Registration Reference: Timbre AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-foreground text-xl font-light tracking-tight mb-1">
          Create an account
        </h2>
        <p className="text-muted-foreground text-xs font-mono-custom tracking-wider">
          Join the Timbre AI network.
        </p>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block font-mono-custom text-[0.625rem] text-muted-foreground mb-2 tracking-[0.1em] uppercase">
            Full Name / Organization
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-background border border-border p-3 text-[0.875rem] text-foreground outline-none focus:border-primary transition-colors"
            placeholder="John Doe / Voice Lab"
          />
        </div>
        <div>
          <label className="block font-mono-custom text-[0.625rem] text-muted-foreground mb-2 tracking-[0.1em] uppercase">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-border p-3 text-[0.875rem] text-foreground outline-none focus:border-primary transition-colors"
            placeholder="team@voice-lab.ai"
          />
        </div>
        <div>
          <label className="block font-mono-custom text-[0.625rem] text-muted-foreground mb-2 tracking-[0.1em] uppercase">
            Create Password
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

        <div className="pt-2">
          <Button
            disabled={loading}
            type="submit"
            className="w-full h-12 font-mono-custom text-[0.8125rem] tracking-[0.1em] rounded-lg"
          >
            {loading ? (
              <Icon icon="line-md:loading-loop" className="mx-auto text-xl" />
            ) : (
              <ScrambleText text="Create account" />
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="font-mono-custom text-[0.6875rem] text-muted-foreground tracking-wider uppercase">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-primary hover:underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
