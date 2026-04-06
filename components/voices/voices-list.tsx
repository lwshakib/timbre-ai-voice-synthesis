import { AudioLines, Mic, Volume2 } from "lucide-react";
import { VoiceCard } from "./voice-card";
import type { VoiceItem } from "./voice-card";

interface VoicesListProps {
  title: string;
  voices: VoiceItem[];
}

export function VoicesList({ title, voices }: VoicesListProps) {
  if (!voices.length) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-light tracking-tight text-[#f5f5f0]">{title}</h3>

        <div className="flex flex-col items-center justify-center gap-6 py-16 rounded-2xl border border-dashed border-[#1f1f1e] bg-[#0a0a0a]">
          <div className="relative flex h-14 w-32 items-center justify-center">

            <div className="absolute left-0 -rotate-[30deg] rounded-full bg-[#111111] p-4 border border-[#1f1f1e]">
              <Volume2 className="size-5 text-[#828179]" />
            </div>

            <div className="relative z-10 rounded-full bg-[#d4b87a] p-4 shadow-[0_0_20px_#d4b87a33]">
              <Mic className="size-5 text-black" />
            </div>

            <div className="absolute right-0 rotate-[30deg] rounded-full bg-[#111111] p-4 border border-[#1f1f1e]">
              <AudioLines className="size-5 text-[#828179]" />
            </div>

          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-medium tracking-tight text-[#f5f5f0]">
              No voices found
            </p>
            <p className="max-w-md text-center text-[10px] text-[#828179] font-mono-custom tracking-[0.1em] uppercase">
              The {title} database is currently empty.
            </p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light tracking-tight text-[#f5f5f0]">{title}</h3>
        <span className="text-[10px] text-[#555] font-mono-custom tracking-[0.2em] uppercase">
          [COUNT: {voices.length}]
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {voices.map((voice) => (
          <VoiceCard key={voice.id} voice={voice} />
        ))}
      </div>
    </div>
  );
};
