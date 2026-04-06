"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coins, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const COST_PER_UNIT = 0.0005;
const TEXT_MAX_LENGTH = 5000;

export function TextInputPanel() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="
      rounded-[22px] bg-gradient-to-br from-[#d4b87a] via-[#828179] to-[#050505] p-0.5 shadow-[0_0_40px_-15px_rgba(212,184,122,0.3)]
    ">
      <div className="rounded-[20px] bg-[#050505] p-1">
        <div className="space-y-4 rounded-2xl bg-[#0a0a0a] p-6 border border-[#1f1f1e]">
          <Textarea
            placeholder="Start typing or paste your text here..."
            className="min-h-[160px] resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 text-[#f5f5f0] text-lg font-light placeholder:text-[#333]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={TEXT_MAX_LENGTH}
          />

          <div className="flex items-center justify-between pt-4 border-t border-[#1f1f1e]/50">
            <Badge variant="outline" className="gap-1.5 border-dashed border-[#d4b87a]/30 bg-[#d4b87a]/5 text-[#d4b87a]">
              <Coins className="size-3" />
              <span className="text-[10px] font-mono-custom tracking-wider uppercase">
                {text.length === 0 ? (
                  "READY_FOR_INPUT"
                ) : (
                  <>
                    <span className="tabular-nums">
                      ${(text.length * COST_PER_UNIT).toFixed(4)}
                    </span>{" "}
                    EST_CREDIT
                  </>
                )}
              </span>
            </Badge>
            <span className="text-[10px] text-[#828179] font-mono-custom tracking-widest uppercase">
              {text.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()} [CHAR_LIMIT]
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end p-4">
          <Button
            size="lg"
            disabled={!text.trim()}
            onClick={handleGenerate}
            className="w-full lg:w-auto bg-[#d4b87a] hover:bg-[#c4a86a] text-black font-semibold px-8 h-12 rounded-full"
          >
            <Sparkles className="size-4 mr-2" />
            Generate speech
          </Button>
        </div>
      </div>
    </div>
  )
}
