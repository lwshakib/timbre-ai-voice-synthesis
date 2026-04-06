'use client';

import { Headphones, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export function DashboardHeader() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-mono-custom tracking-wider uppercase">
          System Overview
        </p>
        <h1 className="text-2xl lg:text-3xl font-light tracking-tight text-foreground">
          Welcome back,{' '}
          <span className="text-primary">
            {isPending ? '...' : user?.name?.split(' ')[0] || 'Creator'}
          </span>
        </h1>
      </div>

      <div className="lg:flex items-center gap-3 hidden">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-border bg-secondary text-foreground hover:bg-secondary/80 hover:border-primary/50"
        >
          <Link href="mailto:support@timbreai.build">
            <ThumbsUp className="size-4 mr-2 text-primary" />
            <span>Feedback</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-border bg-secondary text-foreground hover:bg-secondary/80 hover:border-primary/50"
        >
          <Link href="mailto:support@timbreai.build">
            <Headphones className="size-4 mr-2 text-primary" />
            <span>Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
