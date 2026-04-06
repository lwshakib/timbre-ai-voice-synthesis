"use client";

import { useStore } from "@tanstack/react-form";
import { 
  VOICE_CATEGORY_LABELS
} from "@/components/voices/data/voice-categories";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";

import { useTTSVoices } from "./contexts/tts-voices-context";
import { useTTSForm } from "./text-to-speech-form";

export function VoiceSelector() {
  const { 
    customVoices, 
    systemVoices, 
    allVoices: voices
  } = useTTSVoices();

  const form = useTTSForm();
  const voiceId = useStore(form.store, (s: any) => s.values.voiceId);
  const isSubmitting = useStore(form.store, (s: any) => s.isSubmitting);

  const selectedVoice = voices.find((v) => v.id === voiceId);
  const currentVoice = selectedVoice || voices[0];

  return (
    <Field className="space-y-3">
      <FieldLabel className="text-[10px] text-[#555] font-mono-custom tracking-[0.2em] uppercase">Voice style</FieldLabel>
      <Select
        value={voiceId}
        onValueChange={(v) => form.setFieldValue("voiceId", v)}
        disabled={isSubmitting}
      >
        <SelectTrigger className="w-full h-12 gap-3 rounded-xl bg-[#0a0a0a] border-[#1f1f1e] px-4 py-2 hover:border-[#d4b87a]/50 text-[#f5f5f0] focus:ring-[#d4b87a]/30">
          <SelectValue placeholder="[SELECT_VOICE]">
            {currentVoice && (
              <div className="flex items-center gap-3">
                <VoiceAvatar 
                  seed={currentVoice.id}
                  name={currentVoice.name}
                  className="size-6 border-[#d4b87a]/30"
                />
                <span className="truncate text-xs font-mono-custom uppercase tracking-wider">
                  {currentVoice.name}
                  {currentVoice.category &&
                    ` - ${VOICE_CATEGORY_LABELS[currentVoice.category]}`
                  }
                </span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#0a0a0a] border-[#1f1f1e]">
          {customVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel className="text-[10px] text-[#555] font-mono-custom tracking-widest uppercase px-2 py-1.5">[TEAM_VOICES]</SelectLabel>
              {customVoices.map((v) => (
                <SelectItem key={v.id} value={v.id} className="focus:bg-[#d4b87a]/10 focus:text-[#d4b87a] text-[#828179]">
                  <div className="flex items-center gap-3">
                    <VoiceAvatar seed={v.id} name={v.name} className="size-5" />
                    <span className="text-xs font-mono-custom uppercase tracking-wider">
                      {v.name} - {VOICE_CATEGORY_LABELS[v.category!]}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
          {customVoices.length > 0 && systemVoices.length > 0 && (
            <SelectSeparator className="bg-[#1f1f1e]" />
          )}
          {systemVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel className="text-[10px] text-[#555] font-mono-custom tracking-widest uppercase px-2 py-1.5">[BUILT_IN_VOICES]</SelectLabel>
              {systemVoices.map((v) => (
                <SelectItem key={v.id} value={v.id} className="focus:bg-[#d4b87a]/10 focus:text-[#d4b87a] text-[#828179]">
                  <div className="flex items-center gap-3">
                    <VoiceAvatar seed={v.id} name={v.name} className="size-5" />
                    <span className="text-xs font-mono-custom uppercase tracking-wider">
                      {v.name} - {VOICE_CATEGORY_LABELS[v.category!]}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </Field>
  );
};
