import React from "react";
import { HeroCanvas } from "@/components/marketing/hero-canvas";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-6 sm:p-12 overflow-hidden bg-background">
      {/* Background with flickering grid effect */}
      <HeroCanvas />
      
      {/* Centered Auth Container */}
      <div className="relative z-20 w-full max-w-[400px]">
        {/* Branding header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Logo size={40} className="mb-4" />
          <div className="text-foreground text-3xl font-medium tracking-tighter mb-2 uppercase">Timbre AI</div>
          <div className="tech-badge font-mono-custom text-[0.625rem] tracking-[0.2em] text-muted-foreground">
            SYS·AUTH // ESTABLISH_SESSION
          </div>
        </div>

        {children}
        
        {/* Institutional Disclosure */}
        <div className="mt-8 text-center">
            <div className="font-mono-custom text-[0.625rem] text-muted-foreground/40 uppercase tracking-widest">
                [TIMBRE AI // SECURE TERMINAL]
            </div>
        </div>
      </div>
    </main>
  );
}
