'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Icon } from '@iconify/react';
import { ScrambleText } from '@/components/marketing/scramble-text';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch {
      toast.error('Google authentication failed.');
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      toast.error(error.message || 'Invalid credentials.');
      setLoading(false);
    } else {
      toast.success('Welcome back.');
      router.push('/');
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-foreground text-xl font-light tracking-tight mb-1">Sign In</h2>
        <p className="text-muted-foreground text-xs">Sign in to your account</p>
      </div>

      {/* Social Login */}
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full h-11 gap-3 mb-6 bg-card/50 hover:bg-secondary/50 text-[0.875rem] text-foreground rounded-lg font-medium"
      >
        <Icon icon="logos:google-icon" width="18" />
        Continue with Google
      </Button>

      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-full h-[1px] bg-border"></div>
        <span className="relative z-10 bg-card px-3 text-xs text-muted-foreground">
          Or sign in with email
        </span>
      </div>

      {/* Email Form */}
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div>
          <Label className="block text-xs text-muted-foreground mb-2 font-normal">
            Email address
          </Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-border px-3 h-11 text-[0.875rem] text-foreground focus-visible:border-primary focus-visible:ring-0 transition-colors"
            placeholder="institutional@entity.com"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label className="block text-xs text-muted-foreground font-normal">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:opacity-70 transition-opacity"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-border px-3 h-11 text-[0.875rem] text-foreground focus-visible:border-primary focus-visible:ring-0 transition-colors"
            placeholder="••••••••"
          />
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="w-full h-12 mt-2 text-[0.875rem] rounded-lg font-medium"
        >
          {loading ? (
            <Icon icon="line-md:loading-loop" className="mx-auto text-xl" />
          ) : (
            <ScrambleText text="Sign In" />
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-primary hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
