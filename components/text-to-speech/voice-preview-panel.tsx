"use client";

import { useState } from "react";
import { Pause, Play, Download, Redo, Undo } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

import { useWaveSurfer } from "./hooks/use-wavesurfer";

type VoicePreviewPanelVoice = {
  id?: string;
  name: string;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export function VoicePreviewPanel({
  audioUrl,
  voice,
  text,
}: {
  audioUrl: string;
  voice: VoicePreviewPanelVoice | null;
  text: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceSeed = voice?.id ?? null;

  const {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    togglePlayPause,
    seekBackward,
    seekForward,
  } = useWaveSurfer({
    url: audioUrl,
    autoplay: true,
  });

  const handleDownload = () => {
    setIsDownloading(true);

    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] border-t border-[#1f1f1e] flex-1">
      {/* Header */}
      <div className="p-8 pb-4">
        <h3 className="text-[10px] text-[#555] font-mono-custom tracking-[0.2em] uppercase">[SYS_PREVIEW // AUDIO_MONITOR]</h3>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 items-center justify-center px-12">
        {!isReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Spinner className="size-6 text-[#d4b87a]" />
              <span className="text-[9px] text-[#828179] font-mono-custom tracking-widest uppercase">Initializing Stream...</span>
            </div>
          </div>
        )}
        <div
          ref={containerRef}
          className={cn(
            "w-full cursor-pointer transition-opacity duration-500",
            !isReady && "opacity-0",
          )}
        />
      </div>

      {/* Time display */}
      <div className="flex items-center justify-center py-6">
        <p className="text-5xl font-light tabular-nums tracking-tighter text-[#f5f5f0]">
          {formatTime(currentTime)}&nbsp;
          <span className="text-[#333]">
            /&nbsp;{formatTime(duration)}
          </span>
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center p-8 border-t border-[#1f1f1e]/30 bg-[#070707]/30">
        <div className="grid w-full grid-cols-3 items-center">
          {/* Metadata */}
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-xs font-medium text-[#f5f5f0] tracking-tight">
              {text}
            </p>
            {selectedVoiceName && (
              <div className="flex items-center gap-2">
                <VoiceAvatar
                  seed={selectedVoiceSeed ?? selectedVoiceName}
                  name={selectedVoiceName}
                  className="size-5 border-[#d4b87a]/20"
                />
                <span className="truncate text-[10px] text-[#d4b87a] font-mono-custom uppercase tracking-wider">{selectedVoiceName}</span>
              </div>
            )}
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-6">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full size-10 hover:bg-[#d4b87a]/10 hover:text-[#d4b87a] text-[#555]"
              onClick={() => seekBackward(10)}
              disabled={!isReady}
            >
              <Undo className="size-5" />
            </Button>

            <Button
              type="button"
              variant="default"
              size="icon"
              className="size-14 rounded-full bg-[#d4b87a] hover:bg-[#c4a86a] text-black shadow-lg shadow-[#d4b87a]/10 transition-transform hover:scale-105 active:scale-95"
              onClick={togglePlayPause}
              disabled={!isReady}
            >
              {isPlaying ? (
                <Pause className="size-6 fill-current" />
              ) : (
                <Play className="size-6 fill-current ml-1" />
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full size-10 hover:bg-[#d4b87a]/10 hover:text-[#d4b87a] text-[#555]"
              onClick={() => seekForward(10)}
              disabled={!isReady}
            >
              <Redo className="size-5" />
            </Button>
          </div>

          {/* Download */}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-[#1f1f1e] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#d4b87a]/50 text-[#f5f5f0] font-mono-custom text-[10px] uppercase tracking-widest px-6 h-10"
              onClick={handleDownload}
              disabled={!isReady || isDownloading}
            >
              {isDownloading ? <Spinner className="size-3 mr-2" /> : <Download className="size-3 mr-2" />}
              Download
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
