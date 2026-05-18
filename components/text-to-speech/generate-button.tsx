'use client';

import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export function GenerateButton({
  size = 'lg',
  disabled,
  isSubmitting,
  type = 'button',
  onClick,
  className,
}: {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled: boolean;
  isSubmitting: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      type={type}
      size={size}
      className={cn(
        'bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl min-w-[160px]',
        className
      )}
      onClick={onClick}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Spinner className="size-4 mr-2" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="size-4 mr-2" />
          Generate Speech
        </>
      )}
    </Button>
  );
}
