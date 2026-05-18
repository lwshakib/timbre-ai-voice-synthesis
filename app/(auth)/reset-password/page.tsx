'use client';

import React, { useState, Suspense } from 'react';
import { authClient } from '@/lib/auth-client';
import { Icon } from '@iconify/react';
import { ScrambleText } from '@/components/marketing/scramble-text';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid or expired session token.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Access keys do not match.');
      return;
    }

    setLoading(true);

    const { error } = await authClient.resetPassword({
      newPassword: password,
      token: token,
    });

    if (error) {
      toast.error(error.message || 'Failed to reset password.');
      setLoading(false);
    } else {
      toast.success('Password updated. Redirecting.');
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);
    }
  };

  if (!token) {
    return (
      <div className="w-full animate-in fade-in duration-700 text-center">
        <div className="w-16 h-16 rounded-full border border-destructive flex items-center justify-center mx-auto mb-6 bg-destructive/10">
          <Icon icon="solar:shield-warning-linear" className="text-destructive text-3xl" />
        </div>
        <h2 className="text-foreground text-xl font-light tracking-tight mb-4">Invalid Session</h2>
        <p className="text-muted-foreground text-[0.8125rem] mb-8">
          Your password reset link is invalid or has expired. Please request a new one.
        </p>
        <Button
          onClick={() => router.push('/forgot-password')}
          className="w-full h-12 text-[0.875rem] rounded-lg font-medium"
        >
          <ScrambleText text="Request New Link" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-foreground text-xl font-light tracking-tight mb-1">Set New Password</h2>
        <p className="text-muted-foreground text-xs">Update your credentials to regain access.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleResetPassword} className="space-y-5">
        <div>
          <Label className="block text-xs text-muted-foreground mb-2 font-normal">
            New Password
          </Label>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-border px-3 h-11 text-[0.875rem] text-foreground focus-visible:border-primary focus-visible:ring-0 transition-colors"
            placeholder="••••••••"
          />
        </div>
        <div>
          <Label className="block text-xs text-muted-foreground mb-2 font-normal">
            Confirm Password
          </Label>
          <Input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-background border border-border px-3 h-11 text-[0.875rem] text-foreground focus-visible:border-primary focus-visible:ring-0 transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div className="pt-2">
          <Button
            disabled={loading}
            type="submit"
            className="w-full h-12 text-[0.875rem] rounded-lg font-medium"
          >
            {loading ? (
              <Icon icon="line-md:loading-loop" className="mx-auto text-xl" />
            ) : (
              <ScrambleText text="Reset Password" />
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground/30">Security Level: High</p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
          <Icon icon="line-md:loading-loop" className="text-primary text-3xl mb-4" />
          <p className="text-muted-foreground text-xs">Synchronizing...</p>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
