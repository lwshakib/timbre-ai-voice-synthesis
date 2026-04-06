'use client';

import { ChevronDown } from 'lucide-react';
import { useStore } from '@tanstack/react-form';

import { Button } from '@/components/ui/button';
import { VoiceAvatar } from '@/components/voice-avatar/voice-avatar';
import { useTTSVoices } from './contexts/tts-voices-context';
import { useTTSForm } from './text-to-speech-form';

export function VoiceSelectorButton() {
  const { allVoices } = useTTSVoices();
  const form = useTTSForm();

  const voiceId = useStore(form.store, (s: any) => s.values.voiceId);

  const currentVoice = allVoices.find((v) => v.id === voiceId) ?? allVoices[0];

  const buttonLabel = currentVoice?.name ?? 'Select voice';

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="flex-1 justify-start gap-3 px-3 border-border bg-card hover:bg-secondary hover:border-primary/50 text-foreground h-10 rounded-xl"
    >
      {currentVoice && (
        <VoiceAvatar
          seed={currentVoice.id}
          name={currentVoice.name}
          className="size-6 border-primary/30"
        />
      )}
      <span className="flex-1 truncate text-left text-xs font-mono-custom uppercase tracking-wider">
        {buttonLabel}
      </span>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground/60" />
    </Button>
  );
}
