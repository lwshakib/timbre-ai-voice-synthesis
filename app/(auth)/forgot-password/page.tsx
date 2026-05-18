'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Icon } from '@iconify/react';
import { ScrambleText } from '@/components/marketing/scramble-text';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password',
    });

    if (error) {
      toast.error(error.message || 'Failed to initiate recovery.');
      setLoading(false);
    } else {
      toast.success('Password reset email sent.');
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full animate-in fade-in zoom-in-95 duration-700 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mb-6 bg-primary/10">
          <Icon
            icon="solar:shield-keyhole-linear"
            className="text-primary text-3xl animate-pulse"
          />
        </div>

        <h2 className="text-foreground text-2xl font-light tracking-tight mb-3">
          Check your email
        </h2>
        <p className="text-muted-foreground text-[0.875rem] leading-relaxed max-w-[280px] mb-10">
          We&apos;ve sent a password recovery link to <span className="text-primary">{email}</span>.
          Please authorize via the link in your inbox.
        </p>

        <div className="w-full space-y-4">
          <Button
            asChild
            className="w-full h-12 text-[0.875rem] rounded-lg font-medium cursor-pointer"
          >
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">
              <ScrambleText text="Open Inbox" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full h-12 bg-secondary/50 hover:bg-secondary text-muted-foreground text-[0.875rem] hover:text-foreground rounded-lg font-medium"
          >
            <Link href="/sign-in">
              <ScrambleText text="Back to Login" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border w-full">
          <p className="text-xs text-muted-foreground/30 leading-relaxed">
            Secure Password Recovery
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-foreground text-xl font-light tracking-tight mb-1">
          Reset your password
        </h2>
        <p className="text-muted-foreground text-xs">
          We&apos;ll send a secure link to your email.
        </p>
      </div>

      {/* Email Form */}
      <form onSubmit={handleForgetPassword} className="space-y-6">
        <div>
          <Label className="block text-xs text-muted-foreground mb-2 font-normal">
            Email Address
          </Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-border px-3 h-11 text-[0.875rem] text-foreground focus-visible:border-primary focus-visible:ring-0 transition-colors"
            placeholder="name@domain.com"
          />
          <p className="mt-2 text-xs text-muted-foreground/30">
            We will send a secure link to reset your password.
          </p>
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="w-full h-12 text-[0.875rem] rounded-lg font-medium"
        >
          {loading ? (
            <Icon icon="line-md:loading-loop" className="mx-auto text-xl" />
          ) : (
            <ScrambleText text="Send recovery link" />
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Remembered?{' '}
          <Link href="/sign-in" className="text-primary hover:underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
