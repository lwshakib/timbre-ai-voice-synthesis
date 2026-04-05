import React from "react";
import { HeroCanvas } from "@/components/marketing/hero-canvas";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-6 sm:p-12 overflow-hidden bg-[#050505]">
      {/* Background with flickering grid effect */}
      <HeroCanvas />
      
      {/* Centered Auth Container */}
      <div className="relative z-20 w-full max-w-[400px]">
        {/* Branding header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="text-[#f5f5f0] text-3xl font-medium tracking-tighter mb-2">VOLX</div>
          <div className="tech-badge font-mono-custom text-[0.625rem] tracking-[0.2em] text-[#828179]">
            SYS·AUTH // ESTABLISH_SESSION
          </div>
        </div>

        {children}
        
        {/* Institutional Disclosure */}
        <div className="mt-8 text-center">
            <div className="font-mono-custom text-[0.625rem] text-[#555] uppercase tracking-widest">
                [VOLX SYSTEM // SECURE TERMINAL]
            </div>
        </div>
      </div>
    </main>
  );
}
