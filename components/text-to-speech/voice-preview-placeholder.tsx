import { AudioLines, BookOpen, Sparkles, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function VoicePreviewPlaceholder() {
  return (
    <div className="hidden flex-1 lg:flex h-full flex-col items-center justify-center gap-8 border-t border-[#1f1f1e]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex w-48 items-center justify-center">
          
          <div className="absolute left-0 -rotate-12 rounded-full bg-[#0a0a0a] border border-[#1f1f1e] p-5">
            <Volume2 className="size-6 text-[#333]" />
          </div>

          <div className="relative z-10 rounded-full bg-[#d4b87a] p-6 shadow-2xl shadow-[#d4b87a]/20">
            <Sparkles className="size-6 text-black" />
          </div>

          <div className="absolute right-0 rotate-12 rounded-full bg-[#0a0a0a] border border-[#1f1f1e] p-5">
            <AudioLines className="size-6 text-[#333]" />
          </div>

        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-light tracking-tight text-[#f5f5f0]">
            [MONITOR_STANDBY]
          </p>
          <p className="max-w-64 text-center text-[11px] text-[#555] font-mono-custom tracking-widest uppercase">
            Once you generate, your audio result will appear here. Sit back and relax.
          </p>
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="rounded-full border-[#1f1f1e] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#d4b87a]/30 text-[#828179] h-10 px-6 font-mono-custom text-[10px] uppercase tracking-widest">
        <BookOpen className="size-3.5 mr-2" />
        Protocol Documentation
      </Button>
    </div>
  );
};
