'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { TextInputPanel } from './text-input-panel';
import { SettingsPanel } from './settings-panel';
import { TextToSpeechForm, type TTSFormValues } from './text-to-speech-form';
import { TTSVoicesProvider } from './contexts/tts-voices-context';
import { VoicePreviewPanel } from './voice-preview-panel';
import { VoiceItem } from '@/components/voices/voice-card';
import { api } from '@/lib/api-client';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';

interface VoicesData {
  custom: VoiceItem[];
  system: VoiceItem[];
}

interface GenerationData {
  id: string;
  text: string;
  voiceName: string;
  voiceId: string;
  temperature: number;
  topP: number;
  topK: number;
  repetitionPenalty: number;
  audioUrl: string;
}

export function TextToSpeechDetailView({ generationId }: { generationId: string }) {
  const router = useRouter();
  const [voices, setVoices] = useState<VoicesData | null>(null);
  const [generation, setGeneration] = useState<GenerationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [voicesData, genData] = await Promise.all([
          api.get<VoicesData>('/api/voices'),
          api.get<GenerationData>(`/api/tts/${generationId}`),
        ]);
        setVoices(voicesData);
        setGeneration(genData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        router.push('/text-to-speech');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [generationId, router]);

  if (isLoading || !voices || !generation) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 bg-background gap-4">
        <Spinner className="size-8 text-primary" />
        <p className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">
          Loading generation data...
        </p>
      </div>
    );
  }

  const { custom: customVoices, system: systemVoices } = voices;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? '';

  const resolvedVoiceId =
    generation.voiceId && allVoices.some((v) => v.id === generation.voiceId)
      ? generation.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: generation.text,
    voiceId: resolvedVoiceId,
    temperature: generation.temperature,
    topP: generation.topP,
    topK: generation.topK,
    repetitionPenalty: generation.repetitionPenalty,
  };

  const generationVoice = {
    id: generation.voiceId ?? undefined,
    name: generation.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex h-full min-h-0 overflow-hidden bg-background flex-col">
          <PageHeader title="Generation Details" className="lg:hidden" />
          <div className="flex flex-1 min-h-0 overflow-hidden h-full">
            <div className="flex flex-1 min-h-0 flex-col min-w-0 h-full">
              <TextInputPanel />
              <VoicePreviewPanel
                audioUrl={generation.audioUrl}
                voice={generationVoice}
                text={generation.text}
              />
            </div>
            <div className="hidden lg:block w-[400px] shrink-0 h-full border-l border-border">
              <SettingsPanel />
            </div>
          </div>
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}
