'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Coins, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const COST_PER_UNIT = 0.0005;
const TEXT_MAX_LENGTH = 5000;

export function TextInputPanel() {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="glass-panel rounded-xl p-6 border border-border bg-card/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-4">
        <Textarea
          placeholder="Start typing or paste your text here to synthesize..."
          className="min-h-[180px] resize-none border border-border/40 bg-background/30 p-4 rounded-lg text-foreground text-sm font-normal placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:border-primary/40 transition-all leading-relaxed"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={TEXT_MAX_LENGTH}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="gap-1.5 border-primary/20 bg-primary/5 text-primary py-1 px-2.5 rounded-md text-[11px] font-medium"
            >
              <Coins className="size-3.5" />
              <span>
                {text.length === 0 ? (
                  'Ready for input'
                ) : (
                  <>
                    <span className="tabular-nums">
                      ${(text.length * COST_PER_UNIT).toFixed(4)}
                    </span>{' '}
                    est. credit cost
                  </>
                )}
              </span>
            </Badge>

            <span className="text-[11px] text-muted-foreground/60 font-medium">
              {text.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()} characters
            </span>
          </div>

          <Button
            size="lg"
            disabled={!text.trim()}
            onClick={handleGenerate}
            className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-primary-foreground font-medium px-6 h-10 rounded-lg shadow-md shadow-primary/10 select-none cursor-pointer transition-all"
          >
            <Sparkles className="size-4 mr-2" />
            Generate Speech
          </Button>
        </div>
      </div>
    </div>
  );
}
