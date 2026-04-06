"use client";

import { createContext, useContext } from "react";
import { VoiceItem } from "@/components/voices/voice-card";

interface TTSVoicesContextValue {
  customVoices: VoiceItem[];
  systemVoices: VoiceItem[];
  allVoices: VoiceItem[];
};

const TTSVoicesContext = createContext<TTSVoicesContextValue | null>(null);

export function TTSVoicesProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TTSVoicesContextValue;
}) {
  return (
    <TTSVoicesContext.Provider value={value}>
      {children}
    </TTSVoicesContext.Provider>
  );
};

export function useTTSVoices() {
  const context = useContext(TTSVoicesContext);

  if (!context) {
    throw new Error("useTTSVoices must be used within a TTSVoicesProvider");
  }

  return context;
};
