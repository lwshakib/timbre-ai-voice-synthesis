"use client";

import { useStore } from "@tanstack/react-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

import { sliders } from "./data/sliders";
import { useTTSForm } from "./text-to-speech-form";
import { VoiceSelector } from "./voice-selector";

export function SettingsPanelSettings() {
  const form = useTTSForm();
  const isSubmitting = useStore(form.store, (s: any) => s.isSubmitting);

  return (
    <>
      <div className="border-b border-border p-6 lg:p-12">
        <VoiceSelector />
      </div>

      <div className="p-6 lg:p-12 flex-1 space-y-8 overflow-y-auto">
        <div className="flex flex-col gap-1 mb-8">
           <h3 className="text-sm font-medium text-foreground">Parameters</h3>
           <p className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">[SYS_CONFIG // MODEL_TUNING]</p>
        </div>
        
        <FieldGroup className="gap-10">
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field: any) => (
                <Field className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-xs text-muted-foreground font-mono-custom uppercase tracking-wider">{slider.label}</FieldLabel>
                    <span className="text-[10px] text-primary font-mono-custom tracking-widest bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                      {field.state.value.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Slider
                      value={[field.state.value]}
                      onValueChange={(value) => field.handleChange(value[0])}
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      disabled={isSubmitting}
                      className="[&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-thumb]]:border-0 [&_[data-slot=slider-thumb]]:ring-primary/50"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-muted-foreground/30 font-mono-custom uppercase tracking-[0.15em]">
                        {slider.leftLabel}
                      </span>
                      <span className="text-[9px] text-muted-foreground/30 font-mono-custom uppercase tracking-[0.15em]">
                        {slider.rightLabel}
                      </span>
                    </div>
                  </div>
                </Field>
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
};
