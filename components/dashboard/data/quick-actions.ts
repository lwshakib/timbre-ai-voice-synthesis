export interface QuickAction {
  title: string;
  description: string;
  gradient: string;
  href: string;
};

export const quickActions: QuickAction[] = [
  {
    title: "Narrate a Story",
    description: "Bring characters to life with expressive AI narration",
    gradient: "from-[#d4b87a] to-[#0a0a0a]",
    href: "/text-to-speech?text=In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth.",
  },
  {
    title: "Record an Ad",
    description: "Create professional advertisements with lifelike AI voices",
    gradient: "from-[#c4a86a] to-[#111111]",
    href: "/text-to-speech?text=Introducing Timbre AI — the smoothest voice synthesis you'll ever experience. Sourced from neural architecture, slow-trained to perfection.",
  },
  {
    title: "Direct a Movie Scene",
    description: "Generate dramatic dialogue for film and video",
    gradient: "from-[#828179] to-[#050505]",
    href: "/text-to-speech?text=The rain hammered against the window as she turned to face him. You knew, didn't you? she whispered, her voice barely holding together.",
  },
];
