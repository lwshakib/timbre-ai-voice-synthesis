"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/marketing/reveal";
import { VoiceCard, Voice } from "@/components/dashboard/voice-card";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";

const MOCK_VOICES: Voice[] = [
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
    {
        id: "v5",
        name: "Spectra // Neural",
        description: "Advanced experimental model with high emotive variance for internal R&D feedback.",
        category: "PROFESSIONAL",
        language: "EN-US",
    },
    {
        id: "v6",
        name: "Vortex // Clone",
        description: "Precision-cloned institutional voice for specific partner-facing communications.",
        category: "CUSTOM",
        language: "EN-US",
    },
];

export default function VoicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("ALL");

    const filteredVoices = MOCK_VOICES.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             v.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "ALL" || v.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["ALL", "PREMIUM", "PROFESSIONAL", "CUSTOM"];

    return (
        <div className="flex-1 p-8 pt-12 max-w-[1200px] mx-auto w-full">
            <Reveal>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-[#f5f5f0] text-3xl font-light tracking-tight mb-2">
                            Voice Library
                        </h1>
                        <p className="text-[#828179] text-xs font-mono-custom tracking-[0.2em] uppercase">
                            [SYS·LIB // MODEL_INVENTORY]
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="glass-panel relative flex-1 md:w-64 border border-[#1f1f1e] overflow-hidden rounded-sm group">
                            <div className="absolute inset-y-0 left-3 flex items-center text-[#555] group-hover:text-[#d4b87a] transition-colors">
                                <Icon icon="solar:magnifer-linear" width={14} height={14} />
                            </div>
                            <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="SEARCH_MODELS..." 
                                className="w-full bg-[#0a0a0a] border-none text-[0.75rem] font-mono-custom text-[#f5f5f0] pl-10 pr-4 py-2.5 outline-none tracking-widest placeholder:text-[#333]"
                            />
                        </div>
                        <button className="btn-swiss px-6 py-2.5 font-mono-custom text-[0.6875rem] tracking-[0.05em] whitespace-nowrap">
                            CLONE_VOICE
                        </button>
                    </div>
                </div>
            </Reveal>

            {/* Filter Tabs */}
            <Reveal className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex items-center gap-2 border-b border-[#1f1f1e]">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-3 font-mono-custom text-[0.625rem] tracking-[0.2em] transition-all relative ${
                                activeCategory === category 
                                ? "text-[#d4b87a]" 
                                : "text-[#555] hover:text-[#828179]"
                            }`}
                        >
                            {category}
                            {activeCategory === category && (
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d4b87a] shadow-[0_0_8px_#d4b87a]" />
                            )}
                        </button>
                    ))}
                </div>
            </Reveal>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVoices.map((voice, i) => (
                    <Reveal key={voice.id} delay={i * 0.05}>
                        <VoiceCard voice={voice} />
                    </Reveal>
                ))}
            </div>

            {/* Empty State */}
            {filteredVoices.length === 0 && (
                <div className="py-32 flex flex-col items-center justify-center text-center opacity-50">
                    <Icon icon="solar:shield-warning-linear" width={48} height={48} className="text-[#828179] mb-4" />
                    <p className="font-mono-custom text-[0.75rem] text-[#828179] uppercase tracking-widest leading-relaxed">
                        No models identified within current<br />encryption parameters.
                    </p>
                </div>
            )}
        </div>
    );
}
