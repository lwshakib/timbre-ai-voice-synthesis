"use client";

import { useEffect, useState } from "react";
import { TextInputPanel } from "./text-input-panel";
import { VoicePreviewPlaceholder } from "./voice-preview-placeholder";
import { SettingsPanel } from "./settings-panel";
import {
  TextToSpeechForm,
  defaultTTSValues,
  type TTSFormValues
} from "./text-to-speech-form";
import { TTSVoicesProvider } from "./contexts/tts-voices-context";
import { VoiceItem } from "@/components/voices/voice-card";
import { api } from "@/lib/api-client";
import { Spinner } from "@/components/ui/spinner";

interface VoicesData {
  custom: VoiceItem[];
  system: VoiceItem[];
}

export function TextToSpeechView({
  initialValues,
}: {
  initialValues?: Partial<TTSFormValues>;
}) {
  const [voices, setVoices] = useState<VoicesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const data = await api.get<VoicesData>("/api/voices");
        setVoices(data);
      } catch (error) {
        console.error("Failed to fetch voices:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVoices();
  }, []);

  if (isLoading || !voices) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 bg-[#050505] gap-4">
        <Spinner className="size-8 text-[#d4b87a]" />
        <p className="text-[10px] text-[#828179] font-mono-custom tracking-[0.2em] uppercase">[INIT_PROTOCOLS // LOADING_VOICE_MODELS]</p>
      </div>
    );
  }

  const { custom: customVoices, system: systemVoices } = voices;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  const resolvedVoiceId =
    initialValues?.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden bg-[#050505]">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <div className="hidden lg:block w-[400px] shrink-0">
            <SettingsPanel />
          </div>
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
};
