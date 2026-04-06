"use client";

import {
  BookOpen,
  Smile,
  Mic,
  Languages,
  Clapperboard,
  Gamepad2,
  Podcast,
  Brain,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

const PROMPT_SUGGESTIONS: {
  label: string;
  prompt: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Narrate a story",
    prompt:
      "In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth. One rainy evening, a stranger walked in and asked for a clock that could show him his future.",
    icon: BookOpen,
  },
  {
    label: "Tell a silly joke",
    prompt:
      "Why don't scientists trust atoms? Because they make up everything! And honestly, I once asked an atom if it was positive about that — it said it had lost an electron. I said, are you sure? It replied, I'm positive!",
    icon: Smile,
  },
  {
    label: "Record an advertisement",
    prompt:
      "Introducing BrightBean Coffee — the smoothest roast you'll ever taste. Sourced from high-altitude farms, slow-roasted to perfection, and delivered fresh to your door every single week.",
    icon: Mic,
  },
  {
    label: "Speak in different languages",
    prompt:
      "Hello and welcome! Today we're going on a journey around the world. Bonjour, comment allez-vous? Hola, bienvenidos a todos. Let's celebrate the beauty of language together.",
    icon: Languages,
  },
  {
    label: "Direct a dramatic movie scene",
    prompt:
      "The rain hammered against the window as she turned to face him. You knew, didn't you? she whispered, her voice barely holding together. He stepped forward, jaw clenched. I did what I had to do.",
    icon: Clapperboard,
  },
  {
    label: "Hear from a video game character",
    prompt:
      "Listen up, adventurer. The realm of Ashenvale is crumbling, and the Crystal of Eternity has been shattered into seven pieces. You are the only one who can reassemble it.",
    icon: Gamepad2,
  },
  {
    label: "Introduce your podcast",
    prompt:
      "Hey everyone, welcome back to another episode of The Curious Mind — the podcast where we dig into the stories, science, and strange ideas that shape our world.",
    icon: Podcast,
  },
  {
    label: "Guide a meditation class",
    prompt:
      "Close your eyes and take a deep breath in. Hold it gently... and release. Feel the weight of the day slowly melting away. With each breath, you're sinking deeper into calm.",
    icon: Brain,
  },
];

export function PromptSuggestions({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] text-[#555] font-mono-custom tracking-[0.2em] uppercase">
        [SYS_PROMPTS // DISCOVER_SUGGESTIONS]
      </p>
      <div className="flex flex-wrap gap-2">
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <Badge
            key={suggestion.label}
            variant="outline"
            className="cursor-pointer gap-2 py-2 px-3 text-[11px] font-mono-custom tracking-wider uppercase border-[#1f1f1e] bg-[#0a0a0a] text-[#828179] hover:bg-[#d4b87a]/10 hover:text-[#d4b87a] hover:border-[#d4b87a]/30 transition-all rounded-lg"
            onClick={() => onSelect(suggestion.prompt)}
          >
            <suggestion.icon className="size-3.5 shrink-0" />
            {suggestion.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};
