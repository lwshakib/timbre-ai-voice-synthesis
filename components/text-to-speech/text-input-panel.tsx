"use client";

import { Coins } from "lucide-react";
import { useStore } from "@tanstack/react-form";

import { VoiceSelectorButton } from "./voice-selector-button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import { 
  COST_PER_UNIT, 
  TEXT_MAX_LENGTH
} from "./data/constants";
import { GenerateButton } from "./generate-button";
import { PromptSuggestions } from "./prompt-suggestions";
import { useTTSForm } from "./text-to-speech-form";

export function TextInputPanel() {
  const form = useTTSForm();

  const text = useStore(form.store, (s: any) => s.values.text);
  const isSubmitting = useStore(form.store, (s: any) => s.isSubmitting);
  const isValid = useStore(form.store, (s: any) => s.isValid);

  return (
    <div className="flex h-full min-h-0 flex-col flex-1 bg-[#050505]">
      {/* Text input area */}
      <div className="relative min-h-0 flex-1 p-6 lg:p-12 overflow-hidden">
        <form.Field name="text">
          {(field: any) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="START_TYPING_OR_PASTE_PROTOCOL..."
              className="absolute inset-0 resize-none border-0 bg-transparent p-6 lg:p-12 text-xl! font-light leading-relaxed tracking-tight text-[#f5f5f0] placeholder:text-[#111] shadow-none focus-visible:ring-0"
              maxLength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
            />
          )}
        </form.Field>
        {/* Bottom fade overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Action bar */}
      <div className="shrink-0 p-6 lg:p-12 border-t border-[#1f1f1e]/30 bg-[#070707]/50 backdrop-blur-sm">
        {/* Mobile layout */}
        <div className="flex flex-col gap-4 lg:hidden">
          <VoiceSelectorButton />
          <GenerateButton
            className="w-full h-12"
            disabled={!text.trim()}
            isSubmitting={isSubmitting}
            onSubmit={() => form.handleSubmit()}
          />
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex flex-col gap-6 w-full">
            {text.length > 0 ? (
              <div className="flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Badge variant="outline" className="gap-2 border-dashed border-[#d4b87a]/30 bg-[#d4b87a]/5 text-[#d4b87a] py-1.5 px-3">
                  <Coins className="size-3.5" />
                  <span className="text-[10px] font-mono-custom tracking-[0.1em] uppercase">
                    <span className="tabular-nums">
                      ${(text.length * COST_PER_UNIT).toFixed(4)}
                    </span>&nbsp;
                    [EST_CREDIT]
                  </span>
                </Badge>
                <div className="flex items-center gap-6">
                  <p className="text-[10px] text-[#555] font-mono-custom tracking-[0.2em] uppercase">
                    {text.length.toLocaleString()}
                    <span className="text-[#333]">
                      &nbsp;/&nbsp;{TEXT_MAX_LENGTH.toLocaleString()} [CHAR_LIMIT]
                    </span>
                  </p>
                  <GenerateButton
                    disabled={isSubmitting || !text.trim()}
                    isSubmitting={isSubmitting}
                    onSubmit={() => form.handleSubmit()}
                  />
                </div>
              </div>
            ) : (
              <PromptSuggestions
                onSelect={(prompt) => form.setFieldValue("text", prompt)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
