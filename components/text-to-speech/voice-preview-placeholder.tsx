import { AudioLines, BookOpen, Sparkles, Volume2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function VoicePreviewPlaceholder() {
  return (
    <div className="hidden flex-1 lg:flex h-full flex-col items-center justify-center gap-8 border-t border-border">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex w-48 items-center justify-center">
          <div className="absolute left-0 -rotate-12 rounded-full bg-card border border-border p-5">
            <Volume2 className="size-6 text-muted-foreground/30" />
          </div>

          <div className="relative z-10 rounded-full bg-primary p-6 shadow-2xl shadow-primary/20">
            <Sparkles className="size-6 text-primary-foreground" />
          </div>

          <div className="absolute right-0 rotate-12 rounded-full bg-card border border-border p-5">
            <AudioLines className="size-6 text-muted-foreground/30" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-light tracking-tight text-foreground">Waiting for input</p>
          <p className="max-w-64 text-center text-[11px] text-muted-foreground/60 font-mono-custom tracking-widest uppercase">
            Once you generate, your audio result will appear here. Sit back and relax.
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="rounded-full border-border bg-card hover:bg-secondary hover:border-primary/30 text-muted-foreground h-10 px-6 font-mono-custom text-[10px] uppercase tracking-widest"
      >
        <BookOpen className="size-3.5 mr-2" />
        Documentation
      </Button>
    </div>
  );
}
