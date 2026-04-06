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
    <div
      className="
      rounded-[22px] bg-gradient-to-br from-primary/50 via-muted-foreground/20 to-background p-0.5 shadow-2xl shadow-primary/10
    "
    >
      <div className="rounded-[20px] bg-background p-1">
        <div className="space-y-4 rounded-2xl bg-card p-6 border border-border">
          <Textarea
            placeholder="Start typing or paste your text here..."
            className="min-h-[160px] resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 text-foreground text-lg font-light placeholder:text-muted-foreground/20"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={TEXT_MAX_LENGTH}
          />

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <Badge
              variant="outline"
              className="gap-1.5 border-dashed border-primary/30 bg-primary/5 text-primary"
            >
              <Coins className="size-3" />
              <span className="text-[10px] font-mono-custom tracking-wider uppercase">
                {text.length === 0 ? (
                  'READY_FOR_INPUT'
                ) : (
                  <>
                    <span className="tabular-nums">
                      ${(text.length * COST_PER_UNIT).toFixed(4)}
                    </span>{' '}
                    EST_CREDIT
                  </>
                )}
              </span>
            </Badge>
            <span className="text-[10px] text-muted-foreground font-mono-custom tracking-widest uppercase">
              {text.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()} [CHAR_LIMIT]
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end p-4">
          <Button
            size="lg"
            disabled={!text.trim()}
            onClick={handleGenerate}
            className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 rounded-full shadow-lg shadow-primary/20"
          >
            <Sparkles className="size-4 mr-2" />
            Generate speech
          </Button>
        </div>
      </div>
    </div>
  );
}
