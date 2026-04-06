'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useQueryState } from 'nuqs';
import { toast } from 'sonner';

import { VoicesToolbar } from '@/components/voices/voices-toolbar';
import { VoicesList } from '@/components/voices/voices-list';
import { voicesSearchParams } from '@/components/voices/lib/params';
import { api } from '@/lib/api-client';
import { VoiceItem } from '@/components/voices/voice-card';
import { Spinner } from '@/components/ui/spinner';
import { PageHeader } from '@/components/dashboard/page-header';

interface VoicesData {
  custom: VoiceItem[];
  system: VoiceItem[];
}

function VoicesContent() {
  const [query] = useQueryState('query', voicesSearchParams.query);
  const [data, setData] = useState<VoicesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVoices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<VoicesData>('/api/voices', {
        params: { query },
      });
      setData(response);
    } catch (error) {
      toast.error('Failed to fetch voices');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchVoices();
  }, [fetchVoices]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      <PageHeader title="Voices" className="lg:hidden" />

      <div className="flex-1 p-6 lg:p-16 max-w-[1400px] mx-auto w-full space-y-12">
        <VoicesToolbar />

        {isLoading && !data ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Spinner className="size-8 text-primary" />
            <p className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">
              [SYS_STATUS // INDEXING_MODELS]
            </p>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-500">
            <VoicesList title="Team Voices" voices={data?.custom || []} />
            <VoicesList title="System Voices" voices={data?.system || []} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function VoicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Spinner className="size-8 text-primary" />
          <p className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">
            [SYS_STATUS // INITIALIZING_LIBRARY]
          </p>
        </div>
      }
    >
      <VoicesContent />
    </Suspense>
  );
}
