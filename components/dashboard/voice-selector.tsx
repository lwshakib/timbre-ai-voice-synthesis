'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { Voice } from './voice-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface VoiceSelectorProps {
  voices: Voice[];
  selectedId?: string;
  onSelect: (voice: Voice) => void;
}

export function VoiceSelector({ voices, selectedId, onSelect }: VoiceSelectorProps) {
  const currentVoice = voices.find((v) => v.id === selectedId) || voices[0];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">
        Voice model
      </span>
      <Select
        value={selectedId}
        onValueChange={(id) => {
          const voice = voices.find((v) => v.id === id);
          if (voice) onSelect(voice);
        }}
      >
        <SelectTrigger className="w-full h-11 gap-3 rounded-xl bg-card border-border px-4 py-2 hover:border-primary/50 text-foreground focus:ring-primary/30">
          <SelectValue placeholder="Select a voice">
            {currentVoice && (
              <div className="flex items-center gap-2.5">
                <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                  <Icon icon="solar:user-speak-linear" width={12} height={12} />
                </div>
                <span className="truncate text-xs font-mono-custom uppercase tracking-wider">
                  {currentVoice.name}
                </span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {voices.map((v) => (
            <SelectItem
              key={v.id}
              value={v.id}
              className="focus:bg-primary/10 focus:text-primary text-muted-foreground transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                  <Icon icon="solar:user-speak-linear" width={14} height={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono-custom uppercase tracking-wider">
                    {v.name}
                  </span>
                  <span className="text-[9px] text-muted-foreground/60 lowercase tracking-widest">
                    {v.category} [REF_{v.id.slice(0, 4).toUpperCase()}]
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
