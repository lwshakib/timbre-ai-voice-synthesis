"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { Button } from "@/components/ui/button";

export interface Voice {
    id: string;
    name: string;
    description: string;
    category: "PREMIUM" | "PROFESSIONAL" | "CUSTOM";
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
        PREMIUM: "text-[#d4b87a] border-[#d4b87a]/30 bg-[#d4b87a]/5",
        PROFESSIONAL: "text-[#828179] border-[#1f1f1e] bg-[#0a0a0a]",
        CUSTOM: "text-[#555] border-[#1f1f1e] bg-transparent",
    };

    return (
        <div className="glass-panel group relative overflow-hidden rounded-sm border border-[#1f1f1e] hover:border-[#d4b87a]/50 transition-all duration-500 p-5">
            {/* Header / Info */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#1f1f1e] flex items-center justify-center text-[#828179] group-hover:text-[#d4b87a] transition-colors">
                        <Icon icon="solar:user-speak-linear" width={20} height={20} />
                    </div>
                    <div>
                        <h4 className="text-[#f5f5f0] text-sm font-medium tracking-tight truncate max-w-[120px]">
                            {voice.name}
                        </h4>
                        <div className={`inline-block px-2 py-0.5 rounded-full border text-[9px] font-mono-custom tracking-widest mt-1 ${categoryColors[voice.category]}`}>
                            {voice.category}
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0a0a0a] border border-[#1f1f1e] text-[#828179] hover:text-[#d4b87a] hover:border-[#d4b87a] transition-all"
                >
                    <Icon icon={isPlaying ? "solar:pause-linear" : "solar:play-linear"} width={16} height={16} />
                </button>
            </div>

            {/* Description */}
            <p className="text-[#828179] text-[0.75rem] leading-relaxed line-clamp-2 mb-6 h-9">
                {voice.description}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1f1f1e]">
                <div className="flex items-center gap-2 font-mono-custom text-[0.625rem] text-[#555] uppercase tracking-widest">
                    <Icon icon="solar:globus-linear" width={12} height={12} />
                    {voice.language}
                </div>
                
                <button className="text-[0.625rem] font-mono-custom text-[#d4b87a] hover:opacity-70 transition-opacity uppercase tracking-[0.1em]">
                   <ScrambleText text="USE_VOICE" />
                </button>
            </div>

            {/* Hover Accent */}
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-[#d4b87a] rounded-full shadow-[0_0_8px_#d4b87a]" />
            </div>
        </div>
    );
}
