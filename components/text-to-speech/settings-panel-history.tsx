'use client';

import { useEffect, useState, useCallback } from 'react';
import { Mic, History, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

import { api } from '@/lib/api-client';
import { Spinner } from '@/components/ui/spinner';

interface Generation {
  id: string;
  text: string;
  voiceName: string;
  voiceId: string;
  createdAt: string;
}

export function SettingsPanelHistory() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get<Generation[]>('/api/tts', { params: { limit: 20 } });
      setGenerations(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 min-h-0 gap-4">
        <Spinner className="size-6 text-primary" />
        <p className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">
          Fetching history...
        </p>
      </div>
    );
  }

  if (generations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 min-h-0 gap-4 opacity-50">
        <History className="size-8 text-border" />
        <p className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">
          No history found
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 p-6 pb-2">
        <div className="flex flex-col gap-1 mb-6 px-2">
          <h3 className="text-sm font-medium text-foreground">Recent activity</h3>
          <p className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">
            Generation history
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2">
        {generations.map((gen) => (
          <Link
            key={gen.id}
            href={`/text-to-speech/${gen.id}`}
            className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-secondary transition-all group"
          >
            <div className="size-10 shrink-0 rounded-lg bg-secondary flex items-center justify-center border border-border group-hover:border-primary/20">
              <Mic className="size-4 text-muted-foreground group-hover:text-primary" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-[11px] text-foreground font-medium truncate">{gen.text}</p>
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-primary font-mono-custom uppercase tracking-wider">
                  {gen.voiceName}
                </span>
                <span className="flex items-center gap-1 text-[9px] text-muted-foreground/60 font-mono-custom uppercase tracking-wider">
                  <Calendar className="size-2.5" />
                  {format(new Date(gen.createdAt), 'MMM d, HH:mm')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
