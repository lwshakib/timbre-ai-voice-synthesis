"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { HeroCanvas } from "@/components/marketing/hero-canvas";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { Reveal } from "@/components/marketing/reveal";
import { CountingNumber } from "@/components/marketing/counting-number";
import { Logo } from "@/components/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";



export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen font-sans bg-background text-muted-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* --- Navigation --- */}
      <header className="fixed top-0 w-full z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-[83.75rem] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size={24} />
            <span className="text-foreground text-xl font-medium tracking-tighter">Timbre AI</span>
            <div className="h-4 w-[1px] bg-border hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2">
              <span className="blinking-dot"></span>
              <span className="font-mono-custom text-[0.625rem] tracking-[0.15em] text-primary mt-[2px]">System Online</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-[0.8125rem]">
            <a href="#platform" className="nav-link"><ScrambleText text="Synthesis" /></a>
            <a href="#intelligence" className="nav-link"><ScrambleText text="Cloning" /></a>
            <a href="#secondary" className="nav-link"><ScrambleText text="Registry" /></a>
            <Link href="/dashboard" className="btn-swiss px-6 py-2.5 font-mono-custom text-[0.6875rem] tracking-[0.05em] ml-4">
              <ScrambleText text="Dashboard" className="relative z-10" />
            </Link>
          </nav>
          
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="text-foreground p-2 -mr-2">
                  <Icon icon="solar:hamburger-menu-linear" width="24" height="24" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-background border-l-border p-0">
                <div className="flex flex-col h-full">
                  <div className="px-6 h-16 flex items-center border-b border-border">
                    <Logo size={20} />
                    <span className="text-foreground text-lg font-medium tracking-tighter ml-3">Timbre AI</span>
                  </div>
                  
                  <div className="flex-1 px-6 py-12 flex flex-col gap-10">
                    <div className="space-y-8">
                       <p className="text-[10px] text-muted-foreground/40 font-mono-custom tracking-[0.2em] uppercase">Navigation Protocols</p>
                       <nav className="flex flex-col gap-6">
                        {[
                          { label: "Synthesis", href: "#platform" },
                          { label: "Cloning", href: "#intelligence" },
                          { label: "Registry", href: "#secondary" },
                        ].map((link) => (
                          <a 
                            key={link.label} 
                            href={link.href} 
                            className="text-2xl font-light tracking-tighter text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span>{link.label}</span>
                            <Icon icon="solar:arrow-right-up-linear" className="text-muted-foreground/20 group-hover:text-primary transition-colors" />
                          </a>
                        ))}
                      </nav>
                    </div>

                    <div className="mt-auto space-y-6">
                      <p className="text-[10px] text-muted-foreground/40 font-mono-custom tracking-[0.2em] uppercase">Authorized Access</p>
                      <Link 
                        href="/dashboard" 
                        className="btn-swiss w-full py-4 flex items-center justify-center font-mono-custom text-[0.8125rem] tracking-[0.1em]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                         <ScrambleText text="Access Dashboard" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 border-t border-border bg-card">
                    <div className="font-mono-custom text-[0.625rem] text-muted-foreground/50 uppercase tracking-widest flex justify-between">
                      <span>SYS_STATE: SECURE</span>
                      <span>V.2.4</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* --- Technical Live Ticker --- */}
        <div className="h-8 bg-card border-t border-border overflow-hidden flex items-center relative">
          <div className="animate-marquee font-mono-custom text-[0.625rem] tracking-[0.15em] text-muted-foreground">
            <span className="mx-4">TIMBRE-EUR-II <span className="text-primary mx-2">/</span> NAV 2.34x <span className="text-primary mx-2">/</span> ΔQ3 +8.2%</span>
            <span className="mx-4">SYS.LOAD: <span className="text-foreground">OPTIMAL</span></span>
            <span className="mx-4">EXIT ALERT: KESSLER HLDG <span className="text-primary mx-2">/</span> Q2 2026 <span className="text-primary mx-2">/</span> ACC: 84.3%</span>
            
            <span className="mx-4">TIMBRE-EUR-II <span className="text-primary mx-2">/</span> NAV 2.34x <span className="text-primary mx-2">/</span> ΔQ3 +8.2%</span>
            <span className="mx-4">SYS.LOAD: <span className="text-foreground">OPTIMAL</span></span>
            <span className="mx-4">EXIT ALERT: KESSLER HLDG <span className="text-primary mx-2">/</span> Q2 2026 <span className="text-primary mx-2">/</span> ACC: 84.3%</span>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* [SYS.000] HERO */}
        <section id="hero" className="relative pt-48 pb-32 reveal-group overflow-hidden">
          <HeroCanvas />
          
          <div className="max-w-[83.75rem] mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-16 min-h-[70vh] items-center relative z-10">
            <Reveal className="max-w-[35rem]">
              <div className="tech-badge font-mono-custom text-[0.625rem] tracking-[0.2em] mb-6">
                <Icon icon="solar:cpu-bolt-linear" className="text-primary" />
                Core Architecture
              </div>
              <h1 className="text-foreground text-[clamp(3.15rem,6.2vw,6.5rem)] font-light tracking-tighter leading-[0.95] mb-8">
                Vocal identity <br />synthesized <br />at scale.
              </h1>
              <p className="text-[clamp(1rem,1.2vw,1.125rem)] mb-10 text-muted-foreground max-w-[28rem]">
                Timbre AI provides developers with an institutional-grade synthesis engine and AI-modeled vocal topography. Engineered for latency under 200ms.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link href="/dashboard" className="btn-swiss px-8 py-4 font-mono-custom text-[0.8125rem] tracking-[0.05em]">
                  <ScrambleText text="Go to Dashboard" className="relative z-10" />
                </Link>
                <button className="btn-ghost-swiss px-8 py-4 font-mono-custom text-[0.8125rem] tracking-[0.05em] bg-background">
                  <ScrambleText text="View Platform" className="relative z-10" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6 font-mono-custom text-[0.6875rem] text-muted-foreground border-t border-border pt-6">
                <div>
                  <div className="text-foreground text-lg mb-1"><CountingNumber value={2.47} />B</div>
                  Characters Generated
                </div>
                <div>
                  <div className="text-foreground text-lg mb-1"><CountingNumber value={34} /></div>
                  Languages Supported
                </div>
                <div>
                  <div className="text-primary text-lg mb-1"><CountingNumber value={99.9} format="percent" />%</div>
                  Synthesis Quality
                </div>
              </div>
            </Reveal>

            {/* --- Dashboard Composite --- */}
            <Reveal className="hidden lg:block relative h-[40rem]">
              <div className="absolute inset-0 rounded-sm overflow-hidden img-mask-chamfer border border-border">
                <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80" alt="Data Architecture" className="w-full h-full object-cover dark:opacity-30 opacity-20 mix-blend-luminosity grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] glass-panel rounded-sm flex flex-col z-20 overflow-hidden">
                <div className="h-10 bg-card/80 border-b border-border flex items-center px-4 justify-between backdrop-blur-md">
                  <div className="flex gap-2">
                    <Icon icon="solar:shield-check-linear" className="text-muted-foreground" />
                    <span className="font-mono-custom text-[0.625rem] tracking-[0.1em] text-muted-foreground">TIMBRE_TERM_OS // V.2.4</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-muted-foreground/50"></div>
                    <div className="w-1.5 h-1.5 bg-primary"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] px-6 py-3 font-mono-custom text-[0.625rem] text-muted-foreground border-b border-border bg-background/50">
                  <div>MODEL_ID</div>
                  <div>BITRATE</div>
                  <div>LATENCY</div>
                  <div>FIDELITY</div>
                  <div>STATUS</div>
                </div>

                <div className="flex-1 font-mono-custom text-[0.6875rem] bg-card/40">
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] px-6 py-4 border-b border-border/50 text-muted-foreground">
                    <div className="text-foreground">Nova Prime (English)</div>
                    <div>192kbps</div>
                    <div>142ms</div>
                    <div>+98.2%</div>
                    <div>OPTIMAL</div>
                  </div>
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] px-6 py-4 border-b border-border/50 text-muted-foreground">
                    <div className="text-foreground">Atlas-7 (Nordic)</div>
                    <div>128kbps</div>
                    <div>184ms</div>
                    <div>+94.1%</div>
                    <div>STABLE</div>
                  </div>
                  
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] px-6 py-5 bg-secondary/80 border-l-2 border-primary relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
                    <div className="text-foreground relative z-10 flex items-center gap-2">
                      <Icon icon="solar:target-linear" className="text-primary" />
                      Vocal Clone Alpha
                    </div>
                    <div>320kbps</div>
                    <div className="text-primary">84ms</div>
                    <div className="text-primary">+99.9%</div>
                    <div className="text-foreground flex items-center gap-2">
                      <span className="blinking-dot"></span>
                      ACTIVE
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* [SYS.001] PROBLEM */}
        <section className="py-32 border-t border-border bg-background">
          <div className="max-w-[83.75rem] mx-auto px-6 grid md:grid-cols-[1.2fr_1fr] gap-24 items-start relative z-10">
            <Reveal className="max-w-[38rem]">
              <div className="tech-badge font-mono-custom text-[0.625rem] tracking-[0.2em] mb-6">
                Problem Diagnostic
              </div>
              <h2 className="text-foreground text-[clamp(2.25rem,4vw,4rem)] font-light tracking-tighter leading-[1.05] mb-8">
                Your brand's voice is static by design. Not necessity.
              </h2>
              <p className="text-muted-foreground text-[clamp(1rem,1.1vw,1.125rem)]">
                Conventional TTS infrastructure dictates that vocal outputs are restricted to robotic, monotone models. Creators endure poor engagement that could be bypassed with expressive, AI-cloned identity in real-time.
              </p>
            </Reveal>
            
            <Reveal className="grid grid-cols-2 gap-y-16 gap-x-8">
              <div className="relative border-l border-border pl-6">
                <div className="absolute top-0 left-[-1px] w-[2px] h-4 bg-primary"></div>
                <div className="font-mono-custom text-4xl text-foreground mb-2 tracking-tight"><CountingNumber value={7.2} /><span className="text-muted-foreground text-lg ml-1">ms</span></div>
                <div className="text-[0.625rem] uppercase tracking-wider text-muted-foreground">LATENCY OVERHEAD</div>
              </div>
              <div className="relative border-l border-border pl-6">
                <div className="absolute top-0 left-[-1px] w-[2px] h-4 bg-primary"></div>
                <div className="font-mono-custom text-4xl text-foreground mb-2 tracking-tight">$<CountingNumber value={340} format="k" /><span className="text-muted-foreground text-lg ml-1">K</span></div>
                <div className="text-[0.625rem] uppercase tracking-wider text-muted-foreground">ANNUAL ASSET LOSS</div>
              </div>
              <div className="relative border-l border-border pl-6">
                <div className="absolute top-0 left-[-1px] w-[2px] h-4 bg-primary"></div>
                <div className="font-mono-custom text-4xl text-foreground mb-2 tracking-tight"><CountingNumber value={99} /><span className="text-muted-foreground text-lg ml-1">%</span></div>
                <div className="text-[0.625rem] uppercase tracking-wider text-muted-foreground">SYNTHESIS REALISM</div>
              </div>
              <div className="relative border-l border-border pl-6">
                <div className="absolute top-0 left-[-1px] w-[2px] h-4 bg-primary"></div>
                <div className="font-mono-custom text-4xl text-foreground mb-2 tracking-tight"><CountingNumber value={0.12} /><span className="text-muted-foreground text-lg ml-1">sec</span></div>
                <div className="text-[0.625rem] uppercase tracking-wider text-muted-foreground">CLONE_INIT TIME</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* [SYS.002] PLATFORM */}
        <section id="platform" className="py-32 border-t border-border bg-card">
          <div className="max-w-[83.75rem] mx-auto px-6">
            <Reveal>
              <div className="tech-badge font-mono-custom text-[0.625rem] tracking-[0.2em] mb-6">
                Vocal Resonance
              </div>
              <h2 className="text-foreground text-[clamp(2.25rem,4vw,4rem)] font-light tracking-tighter leading-[1.05] mb-16 max-w-3xl">
                Total vocal command. <br />Infinite range.
              </h2>
            </Reveal>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
              {/* --- Interactive Map Mock (Simplified SVG) --- */}
              <Reveal className="glass-panel rounded-sm relative overflow-hidden group min-h-[450px]">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Acoustic Processor" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-background/60 mix-blend-multiply"></div>
                
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 600 400" fill="none" className="max-w-2xl opacity-60">
                    <path d="M150 100 L300 200 L450 120 M300 200 L250 320 L400 300" strokeWidth="1.5" strokeDasharray="4 4" className="stroke-border" />
                    <circle cx="150" cy="100" r="4" className="fill-muted-foreground" />
                    <circle cx="450" cy="120" r="4" className="fill-muted-foreground/50" />
                    <g>
                      <circle cx="300" cy="200" r="5" className="fill-primary" />
                      <circle cx="300" cy="200" r="12" strokeWidth="1" strokeOpacity="0.5" className="animate-ping stroke-primary" />
                    </g>
                  </svg>
                </div>
                <div className="absolute bottom-6 left-6 tech-badge font-mono-custom text-[0.625rem] text-muted-foreground">
                  SIGNAL_ANALYSIS: EUR-II // REALTIME
                </div>
              </Reveal>

              <div className="grid grid-rows-2 gap-6">
                <Reveal className="glass-panel rounded-sm p-8 flex flex-col justify-center relative overflow-hidden">
                  <Icon icon="solar:microphone-linear" className="text-muted-foreground text-2xl mb-4" />
                  <h3 className="text-foreground text-lg tracking-tight mb-2">High-Fidelity Synthesis</h3>
                  <div className="font-mono-custom text-4xl text-primary mb-2 leading-none tracking-tighter"><CountingNumber value={99.9} format="percent" />%</div>
                  <p className="text-[0.75rem] text-muted-foreground">Studio-quality audio output with natural inflection and emotive resonance.</p>
                </Reveal>
                <Reveal className="glass-panel rounded-sm p-8 flex flex-col justify-center relative overflow-hidden">
                  <Icon icon="solar:wave-linear" className="text-muted-foreground text-2xl mb-4" />
                  <h3 className="text-foreground text-lg tracking-tight mb-2">Vocal Topology Engine</h3>
                  <p className="text-[0.75rem] text-muted-foreground">Autonomous cloning protocols map 1,000+ unique vocal characteristics from 30 seconds of audio.</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* [SYS.003] SECONDARY MARKET */}
        <section id="secondary" className="py-32 border-t border-border bg-background">
          <div className="max-w-[83.75rem] mx-auto px-6 grid lg:grid-cols-[40%_60%] gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="tech-badge font-mono-custom text-[0.625rem] tracking-[0.2em] mb-6">
                Model Registry
              </div>
              <h2 className="text-foreground text-[clamp(2.25rem,4vw,4rem)] font-light tracking-tighter leading-[1.05] mb-8">
                An institutional voice registry. Deployed via API.
              </h2>
              <p className="text-muted-foreground text-[clamp(1rem,1.1vw,1.125rem)] mb-8">
                Timbre AI initializes a strictly regulated internal registry for your specialized voice models. It executes clean synthesis transfers devoid of latency.
              </p>
              <button className="btn-ghost-swiss inline-flex font-mono-custom text-[0.75rem] tracking-[0.05em]">
                <ScrambleText text="View Specifications" className="relative z-10" />
              </button>
            </Reveal>

            {/* --- Market Depth UI Mock --- */}
            <Reveal className="order-1 lg:order-2 glass-panel rounded-sm p-8 relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex justify-between items-end border-b border-border pb-4 mb-8">
                    <div className="font-mono-custom text-[0.625rem] text-muted-foreground">VOICE_EXCHANGE // EUR-II</div>
                    <div className="font-mono-custom text-[0.625rem] text-primary flex items-center gap-2">
                       <span className="blinking-dot"></span> SYNTHESIS_ENGINE: ACTIVE
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[1fr_2px_1fr] gap-6 overflow-hidden">
                    <div className="flex flex-col gap-2">
                      {[65, 80, 95, 60, 70].map((w, i) => (
                        <div key={i} className="h-6 flex justify-end relative group">
                          <div className="bg-primary/20 absolute right-0 h-full border-l border-primary transition-all duration-1000 delay-[500ms]" style={{ width: `${w}%` }}></div>
                          <span className="relative z-10 font-mono text-[0.625rem] leading-6 pr-3 text-foreground">{(100-i*10)}k | {(2.68 - i*0.02).toFixed(2)}x</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-border"></div>
                    <div className="flex flex-col gap-2">
                      {[75, 60, 90, 65, 85].map((w, i) => (
                        <div key={i} className="h-6 flex justify-start relative group">
                          <div className="bg-foreground/10 absolute left-0 h-full border-r border-foreground/50 transition-all duration-1000 delay-[500ms]" style={{ width: `${w}%` }}></div>
                          <span className="relative z-10 font-mono text-[0.625rem] leading-6 pl-3 text-foreground">{(2.71 + i*0.04).toFixed(2)}x | {(85+i*20)}k</span>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </Reveal>
          </div>
        </section>

        {/* [SYS.006] ACCESS */}
        <section id="access" className="py-32 border-b border-border bg-card">
          <div className="max-w-[83.75rem] mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-20">
            <Reveal>
              <div className="tech-badge font-mono-custom text-[0.625rem] tracking-[0.2em] mb-6">
                Platform Access
              </div>
              <h2 className="text-foreground text-[clamp(2.25rem,4vw,4rem)] font-light tracking-tighter leading-[1.05] mb-8">
                Access via invitation.
              </h2>
              <p className="text-muted-foreground mb-12 max-w-[28rem] text-[1.0625rem]">
                Timbre AI restricts API access to a hermetic developer cohort. We process exactly 12 institutional onboarding protocols per quarter.
              </p>
              
              <div className="glass-panel p-6 rounded-sm border-l-2 border-l-primary max-w-sm">
                <div className="font-mono-custom text-[0.625rem] text-muted-foreground mb-4 border-b border-border pb-2 flex justify-between">
                  <span>REGISTRY_STATUS</span>
                  <span className="text-primary">OPEN</span>
                </div>
                <ul className="font-mono-custom text-[0.75rem] text-foreground space-y-2">
                  <li className="flex justify-between"><span>ACTIVE_CYCLE:</span> <span className="text-muted-foreground">Q1 2026</span></li>
                  <li className="flex justify-between"><span>CAPACITY_REMAINING:</span> <span className="text-muted-foreground">04 SLOTS</span></li>
                  <li className="flex justify-between"><span>PREREQUISITE:</span> <span className="text-muted-foreground">API_CLEARANCE</span></li>
                </ul>
              </div>
            </Reveal>

            <Reveal className="relative">
              <div className="glass-panel p-8 rounded-sm relative z-10 border-border">
                <div className="absolute top-0 right-0 p-4 font-mono-custom text-[0.625rem] text-muted-foreground">
                  SECURE_UPLINK
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 mt-4">
                  <div>
                    <label className="block font-mono-custom text-[0.625rem] text-muted-foreground mb-2 tracking-wider">Full Name / Organization</label>
                    <input type="text" className="w-full bg-background border border-border p-3 text-[0.875rem] text-foreground outline-none focus:border-primary transition-colors" placeholder="e.g. Acme Voice Labs" />
                  </div>
                  <div>
                    <label className="block font-mono-custom text-[0.625rem] text-muted-foreground mb-2 tracking-wider">Usage Tier</label>
                    <select className="w-full bg-background border border-border p-3 text-[0.875rem] text-foreground outline-none cursor-pointer">
                      <option value="" disabled>Select volume...</option>
                      <option value="1m-5m">1M – 5M Chars/mo</option>
                      <option value="5m-20m">5M – 20M Chars/mo</option>
                      <option value="20m+">20M+ Chars/mo</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-swiss w-full py-4 font-mono-custom text-[0.8125rem] tracking-[0.1em] mt-4">
                    <ScrambleText text="Send Request" className="relative z-10" />
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-background relative z-10 border-t border-border">
        <div className="max-w-[83.75rem] mx-auto px-6 py-16 grid md:grid-cols-[1fr_1fr] gap-12">
          <div>
            <div className="text-foreground text-xl font-medium tracking-tighter mb-2 uppercase flex items-center gap-2">
              <Logo size={20} />
              Timbre AI
            </div>
            <div className="text-[0.8125rem] text-muted-foreground mb-12">Architecting the future of AI Voice.</div>
            <address className="not-italic font-mono-custom text-[0.625rem] text-muted-foreground leading-relaxed">
              Timbre AI Technologies AG<br />
              Talstrasse 82, 8001 Zürich, Switzerland
            </address>
          </div>
          <div className="grid grid-cols-2 gap-8 font-mono-custom text-[0.625rem]">
            <div className="flex flex-col gap-4">
              <span className="text-foreground mb-2 tracking-wider">SYSTEMS</span>
              <a href="#" className="hover:text-primary transition-colors">Synthesis</a>
              <a href="#" className="hover:text-primary transition-colors">Models</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-foreground mb-2 tracking-wider">PROTOCOLS</span>
              <a href="#" className="hover:text-primary transition-colors">Legal</a>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border bg-card h-12 flex items-center">
            <div className="max-w-[83.75rem] mx-auto px-6 w-full flex items-center justify-between font-mono-custom text-[0.625rem] text-muted-foreground/50">
                <div>© {new Date().getFullYear()} Timbre AI Technologies AG</div>
                <div>[SYS_STATE: SECURE]</div>
            </div>
        </div>
      </footer>
    </div>
  );
}
