import React from 'react';
import { HeroCanvas } from '@/components/marketing/hero-canvas';
import { EchoWavePattern } from '@/components/marketing/echo-wave-pattern';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-background">
      {/* Left 70% Panel (Acoustic Echo Wave Visualization) - visible on lg screens */}
      <div className="hidden lg:block lg:w-[70%] relative h-screen bg-black overflow-hidden border-r border-border/40">
        <EchoWavePattern />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40"></div>

        {/* Sleek Enterprise Value Prop & Two Buttons Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center p-16 pointer-events-none">
          {/* Value Prop & Premium Buttons */}
          <div className="max-w-xl pointer-events-auto">
            <h1 className="text-foreground text-4xl sm:text-5xl font-light tracking-tight mb-4 leading-[1.1]">
              Voice Synthesis, <br />
              Perfected for Enterprise.
            </h1>
            <p className="text-muted-foreground/60 text-sm font-normal mb-8 max-w-md leading-relaxed">
              Unlock infinite vocal range, sub-millisecond cloning latency, and institutional-grade security clearance.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="h-11 px-6 bg-primary hover:bg-primary/95 text-primary-foreground text-xs rounded-lg font-medium shadow-lg shadow-primary/10 cursor-pointer"
              >
                <Link href="/sign-up">
                  14-day Free Trial
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 px-6 bg-white/5 border-white/10 text-foreground hover:bg-white/10 text-xs rounded-lg font-medium backdrop-blur-sm cursor-pointer"
              >
                <a href="/">
                  Request Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right 30% Panel (Auth Content) */}
      <div className="flex-1 lg:w-[30%] min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative z-20 bg-background/50 backdrop-blur-sm lg:backdrop-blur-none lg:bg-background">
        {/* Mobile Background canvas */}
        <div className="lg:hidden absolute inset-0 z-0">
          <HeroCanvas />
        </div>

        <div className="relative z-10 w-full max-w-[360px] mx-auto flex flex-col justify-center min-h-[80vh]">
          {/* Branding Logo */}
          <div className="flex flex-col items-center mb-8 text-center">
            <Logo size={44} />
          </div>

          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}

