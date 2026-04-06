'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { ScrambleText } from '@/components/marketing/scramble-text';

export interface Voice {
  id: string;
  name: string;
  description: string;
  category: 'PREMIUM' | 'PROFESSIONAL' | 'CUSTOM';
  language: string;
  previewUrl?: string;
}

interface VoiceCardProps {
  voice: Voice;
}

export function VoiceCard({ voice }: VoiceCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Mock playback logic
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const categoryColors = {
    PREMIUM: 'text-primary border-primary/30 bg-primary/5',
    PROFESSIONAL: 'text-muted-foreground border-border bg-card',
    CUSTOM: 'text-muted-foreground/60 border-border bg-transparent',
  };

  return (
    <div className="glass-panel group relative overflow-hidden rounded-sm border border-border hover:border-primary/50 transition-all duration-500 p-5">
      {/* Header / Info */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
            <Icon icon="solar:user-speak-linear" width={20} height={20} />
          </div>
          <div>
            <h4 className="text-foreground text-sm font-medium tracking-tight truncate max-w-[120px]">
              {voice.name}
            </h4>
            <div
              className={`inline-block px-2 py-0.5 rounded-full border text-[9px] font-mono-custom tracking-widest mt-1 ${categoryColors[voice.category]}`}
            >
              {voice.category}
            </div>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all"
        >
          <Icon
            icon={isPlaying ? 'solar:pause-linear' : 'solar:play-linear'}
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-[0.75rem] leading-relaxed line-clamp-2 mb-6 h-9">
        {voice.description}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 font-mono-custom text-[0.625rem] text-muted-foreground/60 uppercase tracking-widest">
          <Icon icon="solar:globus-linear" width={12} height={12} />
          {voice.language}
        </div>

        <button className="text-[0.625rem] font-mono-custom text-primary hover:opacity-70 transition-opacity uppercase tracking-[0.1em]">
          <ScrambleText text="USE_VOICE" />
        </button>
      </div>

      {/* Hover Accent */}
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_theme(colors.primary.DEFAULT)]" />
      </div>
    </div>
  );
}
