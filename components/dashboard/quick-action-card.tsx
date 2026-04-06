'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  title: string;
  description: string;
  gradient: string;
  href: string;
}

export function QuickActionCard({ title, description, gradient, href }: QuickActionCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-3 hover:border-primary/50 transition-all duration-300">
      <div
        className={cn(
          'relative h-28 w-36 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br',
          gradient
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-10 rounded-full bg-white/10 backdrop-blur-sm" />
        </div>
        <div className="absolute inset-2 rounded-md ring-1 ring-inset ring-white/10" />
      </div>

      <div className="flex flex-col justify-between py-1 min-w-0">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-fit h-7 text-[10px] uppercase font-mono-custom tracking-wider border-primary text-primary hover:bg-primary/10"
          asChild
        >
          <Link href={href}>
            Try now
            <ArrowRight className="size-3 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
