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
        <h3 className="text-lg font-light tracking-tight text-foreground">{title}</h3>

        <div className="flex flex-col items-center justify-center gap-6 py-16 rounded-2xl border border-dashed border-border bg-secondary/20">
          <div className="relative flex h-14 w-32 items-center justify-center">

            <div className="absolute left-0 -rotate-[30deg] rounded-full bg-card p-4 border border-border">
              <Volume2 className="size-5 text-muted-foreground/40" />
            </div>

            <div className="relative z-10 rounded-full bg-primary p-4 shadow-xl shadow-primary/20">
              <Mic className="size-5 text-primary-foreground" />
            </div>

            <div className="absolute right-0 rotate-[30deg] rounded-full bg-card p-4 border border-border">
              <AudioLines className="size-5 text-muted-foreground/40" />
            </div>

          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-medium tracking-tight text-foreground">
              No voices found
            </p>
            <p className="max-w-md text-center text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.1em] uppercase">
              The {title} library is currently empty.
            </p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light tracking-tight text-foreground">{title}</h3>
        <span className="text-[10px] text-muted-foreground/40 font-mono-custom tracking-[0.2em] uppercase">
          {voices.length} Total
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
