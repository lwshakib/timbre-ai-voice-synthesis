"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { CountingNumber } from "@/components/marketing/counting-number";

interface TextInputPanelProps {
    onGenerate: (text: string) => void;
    isGenerating: boolean;
}

export function TextInputPanel({ onGenerate, isGenerating }: TextInputPanelProps) {
    const [text, setText] = useState("");
    const maxLength = 5000;

    const handleGenerate = () => {
        if (text.trim() && !isGenerating) {
            onGenerate(text);
        }
    };

    const costPerChar = 0.0002;
    const estimatedCost = text.length * costPerChar;

    return (
        <div className="flex flex-col h-full glass-panel border border-[#1f1f1e] overflow-hidden rounded-sm transition-all duration-500 hover:border-[#d4b87a]/20">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/50 border-b border-[#1f1f1e]">
                <div className="flex items-center gap-3">
                    <Icon icon="solar:pen-new-square-linear" className="text-[#828179] group-hover:text-[#d4b87a] transition-colors" />
                    <span className="text-[0.625rem] font-mono-custom text-[#828179] uppercase tracking-widest leading-relaxed">
                        SYNTHESIS_INPUT_01
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest">
                        <Icon icon="solar:coins-linear" width={12} height={12} className="text-[#d4b87a]" />
                        EST: <span className="text-[#f5f5f0] tabular-nums">${estimatedCost.toFixed(4)}</span>
                    </div>
                    <div className="w-10 h-[1px] bg-[#1f1f1e]" />
                    <div className="text-[0.625rem] font-mono-custom text-[#828179] uppercase tracking-widest whitespace-nowrap">
                        {text.length} / {maxLength} CHARS
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="relative flex-1 group">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, maxLength))}
                    placeholder="Enter institutional text protocol for voice synthesis..."
                    className="w-full h-full bg-transparent p-6 lg:p-8 text-[0.9375rem] leading-relaxed text-[#f5f5f0] font-sans border-none outline-none resize-none placeholder:text-[#333] transition-all scrollbar-hide focus:bg-[#0a0a0a]/20"
                    disabled={isGenerating}
                />
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#d4b87a]/10 to-transparent" />
            </div>

            {/* Bottom Bar */}
            <div className="px-6 py-6 border-t border-[#1f1f1e] bg-[#050505]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                         <div className="flex flex-col">
                            <span className="text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest mb-1">OUTPUT_FORMAT</span>
                            <div className="flex items-center gap-2 text-[#f5f5f0] text-xs font-medium">
                                <Icon icon="solar:music-note-linear" className="text-[#d4b87a]" />
                                WAV (High-Fidelity)
                            </div>
                         </div>
                         <div className="w-[1px] h-8 bg-[#1f1f1e] hidden md:block" />
                         <div className="flex flex-col">
                            <span className="text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest mb-1">LATENCY_MODE</span>
                            <div className="flex items-center gap-2 text-[#f5f5f0] text-xs font-medium">
                                <Icon icon="solar:bolt-linear" className="text-[#d4b87a]" />
                                REALTIME (Modal)
                            </div>
                         </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!text.trim() || isGenerating}
                        className="btn-swiss px-10 py-4 font-mono-custom text-[0.8125rem] tracking-[0.1em] disabled:opacity-30 flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isGenerating ? (
                            <Icon icon="line-md:loading-loop" width={18} height={18} className="mx-auto" />
                        ) : (
                            <>
                                <Icon icon="solar:soundwave-linear" width={18} height={18} />
                                <ScrambleText text="GENERATE_AUDIO" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
