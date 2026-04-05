"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/marketing/reveal";
import { TextInputPanel } from "@/components/dashboard/text-input-panel";
import { VoiceSelector } from "@/components/dashboard/voice-selector";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";

const MOCK_VOICES = [
    {
        id: "v1",
        name: "Aura // Institutional",
        description: "The primary executive synthesis model for Timbre AI. Neutral, steady, and authoritative.",
        category: "PREMIUM",
        language: "EN-US",
    },
    {
        id: "v2",
        name: "Kessler // Analyst",
        description: "Deep, quantitative focus with precise cadence for status reports and financial summaries.",
        category: "PROFESSIONAL",
        language: "EN-DE",
    },
    {
        id: "v3",
        name: "Vellamo // Soft",
        description: "A softer, narrative-driven model for personalized client briefings and onboarding.",
        category: "PREMIUM",
        language: "FI-FI",
    },
    {
        id: "v4",
        name: "Echo // Terminal",
        description: "Standard model for system notifications and general short-form telemetry summaries.",
        category: "CUSTOM",
        language: "EN-GB",
    },
];

export default function TextToSpeechPage() {
    const [selectedVoiceId, setSelectedVoiceId] = useState(MOCK_VOICES[0].id);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = (text: string) => {
        setIsGenerating(true);
        // Mock generation delay
        setTimeout(() => setIsGenerating(false), 3000);
    };

    return (
        <div className="flex-1 p-8 pt-12 max-w-[1400px] mx-auto w-full flex flex-col h-full bg-[#050505]">
            <Reveal>
                <div className="flex flex-col items-start mb-12">
                    <h1 className="text-[#f5f5f0] text-3xl font-light tracking-tight mb-2">
                        Institutional Synthesis
                    </h1>
                    <p className="text-[#828179] text-xs font-mono-custom tracking-[0.2em] uppercase">
                        [SYS·TTS // COMMAND_CONSOLE]
                    </p>
                </div>
            </Reveal>

            <div className="grid lg:grid-cols-[1fr_380px] gap-8 flex-1 min-h-0 relative">
                {/* Main Synthesis Terminal */}
                <div className="flex flex-col h-full space-y-8">
                    <Reveal className="flex-1">
                        <TextInputPanel onGenerate={handleGenerate} isGenerating={isGenerating} />
                    </Reveal>
                    
                    {/* Voice Selection Area */}
                    <Reveal delay={0.1}>
                        <div className="flex flex-col mb-4">
                            <span className="text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest mb-4">
                                SELECT_VOICE_MODEL
                            </span>
                            <VoiceSelector 
                                voices={MOCK_VOICES as any} 
                                selectedId={selectedVoiceId} 
                                onSelect={(v) => setSelectedVoiceId(v.id)} 
                            />
                        </div>
                    </Reveal>
                </div>

                {/* Sidebar Context */}
                <div className="hidden lg:flex flex-col gap-8">
                    <Reveal delay={0.2} className="glass-panel p-6 rounded-sm border border-[#1f1f1e] bg-[#0a0a0a]/50">
                        <div className="flex items-center gap-3 mb-6 border-b border-[#1f1f1e] pb-4">
                             <Icon icon="solar:history-linear" width={18} height={18} className="text-[#d4b87a]" />
                             <span className="text-[0.625rem] font-mono-custom text-[#828179] uppercase tracking-widest">
                                RECENT_LOGS
                             </span>
                        </div>
                        
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-1 text-[0.75rem] text-[#f5f5f0] font-medium tracking-tight">
                                        <span>Synthesis_{i*248}</span>
                                        <span className="text-[#555] text-[10px] font-mono-custom">4:2{i} PM</span>
                                    </div>
                                    <p className="text-[0.625rem] text-[#828179] truncate mb-2">
                                        [AUDIO_GEN_0{3-i}] Institutional summary protocol initialized...
                                    </p>
                                    <div className="h-[1px] w-full bg-[#1f1f1e] group-hover:bg-[#d4b87a]/20 transition-colors" />
                                </div>
                            ))}
                        </div>
                        
                        <button className="w-full mt-6 py-2.5 border border-dashed border-[#1f1f1e] hover:border-[#d4b87a]/50 transition-all text-[#555] hover:text-[#d4b87a] font-mono-custom text-[0.625rem] uppercase tracking-widest">
                            <ScrambleText text="VIEW_FULL_LEDGER" />
                        </button>
                    </Reveal>

                    <Reveal delay={0.3} className="glass-panel p-6 rounded-sm border border-[#1f1f1e] bg-[#0a0a0a]">
                         <div className="flex items-center gap-3 mb-6 border-b border-[#1f1f1e] pb-4">
                             <Icon icon="solar:settings-linear" width={18} height={18} className="text-[#d4b87a]" />
                             <span className="text-[0.625rem] font-mono-custom text-[#828179] uppercase tracking-widest">
                                MODEL_CONFIG
                             </span>
                         </div>
                         <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest">EMOTION_HEDGE</span>
                                    <span className="text-[10px] font-mono-custom text-[#f5f5f0]">0.85x</span>
                                </div>
                                <div className="h-1 w-full bg-[#1f1f1e] rounded-full overflow-hidden">
                                     <div className="h-full w-[85%] bg-[#d4b87a] rounded-full shadow-[0_0_8px_#d4b87a]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest">STABILITY_PROT</span>
                                    <span className="text-[10px] font-mono-custom text-[#f5f5f0]">0.92x</span>
                                </div>
                                <div className="h-1 w-full bg-[#1f1f1e] rounded-full overflow-hidden">
                                     <div className="h-full w-[92%] bg-[#d4b87a] rounded-full shadow-[0_0_8px_#d4b87a]" />
                                </div>
                            </div>
                         </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
