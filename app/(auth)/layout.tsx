import React from 'react';
import { HeroCanvas } from '@/components/marketing/hero-canvas';
import { EchoWavePattern } from '@/components/marketing/echo-wave-pattern';
import { Logo } from '@/components/ui/logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-background">
      {/* Left 70% Panel (Acoustic Echo Wave Visualization) - visible on lg screens */}
      <div className="hidden lg:block lg:w-[70%] relative h-screen bg-black overflow-hidden border-r border-border/40">
        <EchoWavePattern />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40"></div>
      </div>

      {/* Right 30% Panel (Auth Content) */}
      <div className="flex-1 lg:w-[30%] min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative z-20 bg-background/50 backdrop-blur-sm lg:backdrop-blur-none lg:bg-background">
        {/* Mobile Background canvas */}
        <div className="lg:hidden absolute inset-0 z-0">
          <HeroCanvas />
        </div>

        <div className="relative z-10 w-full max-w-[360px] mx-auto flex flex-col justify-between min-h-[85vh]">
          {/* Branding header */}
          <div className="flex flex-col items-center mb-6 text-center">
            <Logo size={36} className="mb-3" />
            <div className="text-foreground text-2xl font-medium tracking-tighter mb-1 uppercase">
              Timbre AI
            </div>
            <div className="text-[10px] font-mono-custom tracking-[0.2em] text-muted-foreground/60 uppercase">
              Authentication Services
            </div>
          </div>

          <div className="my-auto">{children}</div>

          {/* Institutional Disclosure */}
          <div className="mt-6 text-center">
            <div className="font-mono-custom text-[0.625rem] text-muted-foreground/30 uppercase tracking-widest">
              Timbre AI Secure Access
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
