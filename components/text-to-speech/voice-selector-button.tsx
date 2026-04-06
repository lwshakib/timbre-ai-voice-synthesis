"use client";

import { ChevronDown } from "lucide-react";
import { useStore } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useTTSVoices } from "./contexts/tts-voices-context";
import { useTTSForm } from "./text-to-speech-form";

export function VoiceSelectorButton() {
  const { allVoices } = useTTSVoices();
  const form = useTTSForm();
  
  const voiceId = useStore(form.store, (s: any) => s.values.voiceId);
  
  const currentVoice = 
    allVoices.find((v) => v.id === voiceId) ?? allVoices[0];

  const buttonLabel = currentVoice?.name ?? "Select voice";

  return (
    <Button
      variant="outline"
      size="sm"
        className="flex-1 justify-start gap-3 px-3 border-[#1f1f1e] bg-[#0a0a0a] hover:bg-[#111111] hover:border-[#d4b87a]/50 text-[#f5f5f0] h-10 rounded-xl"
      >
        {currentVoice && (
          <VoiceAvatar
            seed={currentVoice.id}
            name={currentVoice.name}
            className="size-6 border-[#d4b87a]/30"
          />
        )}
        <span className="flex-1 truncate text-left text-xs font-mono-custom uppercase tracking-wider">
          {buttonLabel}
        </span>
        <ChevronDown className="size-4 shrink-0 text-[#555]" />
      </Button>
  );
}
