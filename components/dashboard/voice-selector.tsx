"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Voice } from "./voice-card";

interface VoiceSelectorProps {
    voices: Voice[];
    selectedId?: string;
    onSelect: (voice: Voice) => void;
}

export function VoiceSelector({ voices, selectedId, onSelect }: VoiceSelectorProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {voices.map((voice) => {
                const isActive = selectedId === voice.id;
                return (
                    <button
                        key={voice.id}
                        onClick={() => onSelect(voice)}
                        className={`flex flex-col items-start p-4 rounded-sm border transition-all duration-300 text-left relative overflow-hidden group ${
                            isActive 
                            ? "bg-[#d4b87a]/10 border-[#d4b87a] shadow-[0_0_15px_rgba(212,184,122,0.1)]" 
                            : "bg-[#0a0a0a] border-[#1f1f1e] hover:border-[#828179]"
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                             <div className={`w-2 h-2 rounded-full ${
                                 isActive ? "bg-[#d4b87a] shadow-[0_0_8px_#d4b87a]" : "bg-[#333]"
                             }`} />
                             <span className={`text-[0.8125rem] font-medium tracking-tight truncate ${
                                 isActive ? "text-[#f5f5f0]" : "text-[#828179]"
                             }`}>
                                {voice.name.split(" // ")[0]}
                             </span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-[0.625rem] font-mono-custom text-[#555] opacity-70 uppercase tracking-widest">
                                {voice.category}
                            </span>
                        </div>

                        {/* Hover Overlay */}
                        {!isActive && (
                            <div className="absolute inset-0 bg-[#d4b87a]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
