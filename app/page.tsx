"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { HeroCanvas } from "@/components/marketing/hero-canvas";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { Reveal } from "@/components/marketing/reveal";
import { CountingNumber } from "@/components/marketing/counting-number";
import { Logo } from "@/components/ui/logo";


export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

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
            <span className="text-foreground text-xl font-medium tracking-tighter uppercase">Timbre AI</span>
            <div className="h-4 w-[1px] bg-border hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2">
              <span className="blinking-dot"></span>
              <span className="font-mono-custom text-[0.625rem] tracking-[0.15em] text-primary mt-[2px]">SYS.ONLINE</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-[0.8125rem]">
            <a href="#platform" className="nav-link"><ScrambleText text="PLATFORM" /></a>
            <a href="#intelligence" className="nav-link"><ScrambleText text="INTELLIGENCE" /></a>
            <a href="#secondary" className="nav-link"><ScrambleText text="MARKET" /></a>
            <a href="#access" className="btn-swiss px-6 py-2.5 font-mono-custom text-[0.6875rem] tracking-[0.05em] ml-4">
              <ScrambleText text="INITIATE ACCESS" />
            </a>
          </nav>
          
          <button className="md:hidden text-foreground">
            <Icon icon="solar:hamburger-menu-linear" width="24" height="24" />
          </button>
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
                [SYS·000] // CORE_ARCHITECTURE
              </div>
              <h1 className="text-[#f5f5f0] text-[clamp(3rem,6vw,6.5rem)] font-light tracking-tighter leading-[0.95] mb-8">
                Private equity <br />structured <br />for exit.
              </h1>
              <p className="text-[clamp(1rem,1.2vw,1.125rem)] mb-10 text-muted-foreground max-w-[28rem]">
                Timbre AI furnishes GPs and LPs with an institutional secondary market and AI-predicted exit topography. Engineered for entities managing $200M+.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a href="#access" className="btn-swiss px-8 py-4 font-mono-custom text-[0.8125rem] tracking-[0.05em]">
                  <ScrambleText text="REQUEST_ACCESS" />
                </a>
                <button className="btn-ghost-swiss px-8 py-4 font-mono-custom text-[0.8125rem] tracking-[0.05em] bg-[#050505]">
                  <ScrambleText text="VIEW_TELEMETRY" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6 font-mono-custom text-[0.6875rem] text-[#828179] border-t border-[#1f1f1e] pt-6">
                <div>
                  <div className="text-[#f5f5f0] text-lg mb-1">$<CountingNumber value={2.47} format="currency-b" />B</div>
                  ASSETS_ANALYZED
                </div>
                <div>
                  <div className="text-[#f5f5f0] text-lg mb-1"><CountingNumber value={34} /></div>
                  TIER-1_FIRMS
                </div>
                <div>
                  <div className="text-[#d4b87a] text-lg mb-1"><CountingNumber value={83.4} format="percent" />%</div>
                  PREDICTION_ACC
                </div>
              </div>
            </Reveal>

            {/* --- Dashboard Composite --- */}
            <Reveal className="hidden lg:block relative h-[40rem]">
              <div className="absolute inset-0 rounded-sm overflow-hidden img-mask-chamfer border border-border">
                <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80" alt="Data Architecture" className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] glass-panel rounded-sm flex flex-col z-20 overflow-hidden">
                <div className="h-10 bg-[#0a0a0a]/80 border-b border-[#1f1f1e] flex items-center px-4 justify-between backdrop-blur-md">
                  <div className="flex gap-2">
                    <Icon icon="solar:shield-check-linear" className="text-muted-foreground" />
                    <span className="font-mono-custom text-[0.625rem] tracking-[0.1em] text-muted-foreground">TIMBRE_TERM_OS // V.2.4</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#828179]"></div>
                    <div className="w-1.5 h-1.5 bg-[#d4b87a]"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] px-6 py-3 font-mono-custom text-[0.625rem] text-[#828179] border-b border-[#1f1f1e] bg-[#050505]/50">
                  <div>ENTITY_ID</div>
                  <div>CAPITAL_INV</div>
                  <div>CURR_NAV</div>
                  <div>IRR_TRAJ</div>
                  <div>OPT_EXIT</div>
                </div>

                <div className="flex-1 font-mono-custom text-[0.6875rem] bg-[#0a0a0a]/40">
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] px-6 py-4 border-b border-[#1f1f1e]/50 text-[#828179]">
                    <div className="text-[#f5f5f0]">Aeronautics Tech</div>
                    <div>€12.4M</div>
                    <div>1.42x</div>
                    <div>+14.2%</div>
                    <div>Q4 2027</div>
                  </div>
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] px-6 py-4 border-b border-[#1f1f1e]/50 text-[#828179]">
                    <div className="text-[#f5f5f0]">Vellamo Bio</div>
                    <div>€28.1M</div>
                    <div>0.94x</div>
                    <div>-2.1%</div>
                    <div>HOLD</div>
                  </div>
                  
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] px-6 py-5 bg-[#111111]/80 border-l-2 border-[#d4b87a] relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#d4b87a]/10 to-transparent pointer-events-none"></div>
                    <div className="text-[#f5f5f0] relative z-10 flex items-center gap-2">
                      <Icon icon="solar:target-linear" className="text-[#d4b87a]" />
                      Kessler Hldgs
                    </div>
                    <div>€48.2M</div>
                    <div className="text-[#d4b87a]">2.71x</div>
                    <div className="text-[#d4b87a]">+28.4%</div>
                    <div className="text-[#f5f5f0] flex items-center gap-2">
                      <span className="blinking-dot"></span>
                      Q2 2026
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
                [SYS·001] // DIAGNOSTIC
              </div>
              <h2 className="text-[#f5f5f0] text-[clamp(2.25rem,4vw,4rem)] font-light tracking-tighter leading-[1.05] mb-8">
                Your portfolio is illiquid by design. Not necessity.
              </h2>
              <p className="text-[#828179] text-[clamp(1rem,1.1vw,1.125rem)]">
                Conventional PE infrastructure dictates that distributions are administered via archaic spreadsheet models. LPs endure protracted illiquidity that could be structurally bypassed quarters in advance. The consequence is quantified in carry and reputation.
              </p>
            </Reveal>
            
            <Reveal className="grid grid-cols-2 gap-y-16 gap-x-8">
              <div className="relative border-l border-[#1f1f1e] pl-6">
                <div className="absolute top-0 left-[-1px] w-[2px] h-4 bg-[#d4b87a]"></div>
                <div className="font-mono-custom text-4xl text-[#f5f5f0] mb-2 tracking-tight"><CountingNumber value={7.2} /><span className="text-[#828179] text-lg ml-1">yrs</span></div>
                <div className="text-[0.625rem] uppercase tracking-wider text-[#828179]">Avg unmanaged hold</div>
              </div>
              <div className="relative border-l border-[#1f1f1e] pl-6">
                <div className="absolute top-0 left-[-1px] w-[2px] h-4 bg-[#d4b87a]"></div>
                <div className="font-mono-custom text-4xl text-[#f5f5f0] mb-2 tracking-tight">$<CountingNumber value={340} format="k" /><span className="text-[#828179] text-lg ml-1">K</span></div>
                <div className="text-[0.625rem] uppercase tracking-wider text-[#828179]">Annual admin drag</div>
              </div>
              <div className="relative border-l border-[#1f1f1e] pl-6">
                <div className="absolute top-0 left-[-1px] w-[2px] h-4 bg-[#d4b87a]"></div>
                <div className="font-mono-custom text-4xl text-[#f5f5f0] mb-2 tracking-tight"><CountingNumber value={62} /><span className="text-[#828179] text-lg ml-1">%</span></div>
                <div className="text-[0.625rem] uppercase tracking-wider text-[#828179]">LP Opacity Dissatisfaction</div>
              </div>
              <div className="relative border-l border-[#1f1f1e] pl-6">
                <div className="absolute top-0 left-[-1px] w-[2px] h-4 bg-[#d4b87a]"></div>
                <div className="font-mono-custom text-4xl text-[#f5f5f0] mb-2 tracking-tight"><CountingNumber value={18} /><span className="text-[#828179] text-lg ml-1">mo</span></div>
                <div className="text-[0.625rem] uppercase tracking-wider text-[#828179]">Time reclaimed</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* [SYS.002] PLATFORM */}
        <section id="platform" className="py-32 border-t border-border bg-card">
          <div className="max-w-[83.75rem] mx-auto px-6">
            <Reveal>
              <div className="tech-badge font-mono-custom text-[0.625rem] tracking-[0.2em] mb-6">
                [SYS·002] // OMNI_VISIBILITY
              </div>
              <h2 className="text-foreground text-[clamp(2.25rem,4vw,4rem)] font-light tracking-tighter leading-[1.05] mb-16 max-w-3xl">
                Singular interface. Absolute portfolio command.
              </h2>
            </Reveal>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
              {/* --- Interactive Map Mock (Simplified SVG) --- */}
              <Reveal className="glass-panel rounded-sm relative overflow-hidden group min-h-[450px]">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Cyber Server" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#050505]/60 mix-blend-multiply"></div>
                
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 600 400" fill="none" className="max-w-2xl opacity-60">
                    <path d="M150 100 L300 200 L450 120 M300 200 L250 320 L400 300" stroke="#1f1f1e" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="150" cy="100" r="4" fill="#828179" />
                    <circle cx="450" cy="120" r="4" fill="#4a554a" />
                    <g>
                      <circle cx="300" cy="200" r="5" fill="#d4b87a" />
                      <circle cx="300" cy="200" r="12" stroke="#d4b87a" strokeWidth="1" strokeOpacity="0.5" className="animate-ping" />
                    </g>
                  </svg>
                </div>
                <div className="absolute bottom-6 left-6 tech-badge font-mono-custom text-[0.625rem] text-[#828179]">
                  TOPOGRAPHY: EUR-II // REALTIME
                </div>
              </Reveal>

              <div className="grid grid-rows-2 gap-6">
                <Reveal className="glass-panel rounded-sm p-8 flex flex-col justify-center relative overflow-hidden">
                  <Icon icon="solar:cpu-linear" className="text-[#828179] text-2xl mb-4" />
                  <h3 className="text-[#f5f5f0] text-lg tracking-tight mb-2">Algorithmic Exit Windows</h3>
                  <div className="font-mono-custom text-4xl text-[#d4b87a] mb-2 leading-none tracking-tighter"><CountingNumber value={83.4} format="percent" />%</div>
                  <p className="text-[0.75rem] text-[#828179]">140+ quantitative signals parsed bi-weekly to compute maximal liquidity thresholds.</p>
                </Reveal>
                <Reveal className="glass-panel rounded-sm p-8 flex flex-col justify-center relative overflow-hidden">
                  <Icon icon="solar:network-linear" className="text-[#828179] text-2xl mb-4" />
                  <h3 className="text-[#f5f5f0] text-lg tracking-tight mb-2">Equity Routing Engine</h3>
                  <p className="text-[0.75rem] text-[#828179]">Autonomous secondary sale distribution to pre-cleared buyers inside your LP cohort. Zero friction.</p>
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
                [SYS·003] // MARKET_MAKER
              </div>
              <h2 className="text-[#f5f5f0] text-[clamp(2.25rem,4vw,4rem)] font-light tracking-tighter leading-[1.05] mb-8">
                An institutional order book. Deployed internally.
              </h2>
              <p className="text-muted-foreground text-[clamp(1rem,1.1vw,1.125rem)] mb-8">
                Timbre AI initializes a strictly regulated internal market specifically for your LP syndicate. It executes clean secondary transfers devoid of intermediaries.
              </p>
              <button className="btn-ghost-swiss inline-flex font-mono-custom text-[0.75rem] tracking-[0.05em]">
                <ScrambleText text="VIEW_LEDGER_SPECS" />
              </button>
            </Reveal>

            {/* --- Market Depth UI Mock --- */}
            <Reveal className="order-1 lg:order-2 glass-panel rounded-sm p-8 relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex justify-between items-end border-b border-[#1f1f1e] pb-4 mb-8">
                    <div className="font-mono-custom text-[0.625rem] text-[#828179]">INTERNAL_EXCHANGE // EUR-II</div>
                    <div className="font-mono-custom text-[0.625rem] text-[#d4b87a] flex items-center gap-2">
                       <span className="blinking-dot"></span> MATCHING_ENGINE: ACTIVE
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[1fr_2px_1fr] gap-6 overflow-hidden">
                    <div className="flex flex-col gap-2">
                      {[65, 80, 95, 60, 70].map((w, i) => (
                        <div key={i} className="h-6 flex justify-end relative group">
                          <div className="bg-[#d4b87a]/20 absolute right-0 h-full border-l border-[#d4b87a] transition-all duration-1000 delay-[500ms]" style={{ width: `${w}%` }}></div>
                          <span className="relative z-10 font-mono text-[0.625rem] leading-6 pr-3 text-[#f5f5f0]">{(100-i*10)}k | {(2.68 - i*0.02).toFixed(2)}x</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#1f1f1e]"></div>
                    <div className="flex flex-col gap-2">
                      {[75, 60, 90, 65, 85].map((w, i) => (
                        <div key={i} className="h-6 flex justify-start relative group">
                          <div className="bg-[#f5f5f0]/10 absolute left-0 h-full border-r border-[#f5f5f0]/50 transition-all duration-1000 delay-[500ms]" style={{ width: `${w}%` }}></div>
                          <span className="relative z-10 font-mono text-[0.625rem] leading-6 pl-3 text-[#f5f5f0]">{(2.71 + i*0.04).toFixed(2)}x | {(85+i*20)}k</span>
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
                [SYS·006] // CLEARANCE
              </div>
              <h2 className="text-[#f5f5f0] text-[clamp(2.25rem,4vw,4rem)] font-light tracking-tighter leading-[1.05] mb-8">
                Clearance via application.
              </h2>
              <p className="text-muted-foreground mb-12 max-w-[28rem] text-[1.0625rem]">
                Timbre AI restricts access to a hermetic GP/LP cohort. We process exactly 12 institutional onboarding protocols per quarter.
              </p>
              
              <div className="glass-panel p-6 rounded-sm border-l-2 border-l-[#d4b87a] max-w-sm">
                <div className="font-mono-custom text-[0.625rem] text-[#828179] mb-4 border-b border-[#1f1f1e] pb-2 flex justify-between">
                  <span>COHORT_STATUS</span>
                  <span className="text-[#d4b87a]">OPEN</span>
                </div>
                <ul className="font-mono-custom text-[0.75rem] text-[#f5f5f0] space-y-2">
                  <li className="flex justify-between"><span>ACTIVE_CYCLE:</span> <span className="text-[#828179]">Q1 2026</span></li>
                  <li className="flex justify-between"><span>CAPACITY_REMAINING:</span> <span className="text-[#828179]">04 SLOTS</span></li>
                  <li className="flex justify-between"><span>PREREQUISITE:</span> <span className="text-[#828179]">NDA_EXECUTION</span></li>
                </ul>
              </div>
            </Reveal>

            <Reveal className="relative">
              <div className="glass-panel p-8 rounded-sm relative z-10 border-[#333]">
                <div className="absolute top-0 right-0 p-4 font-mono-custom text-[0.625rem] text-muted-foreground">
                  SECURE_UPLINK
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 mt-4">
                  <div>
                    <label className="block font-mono-custom text-[0.625rem] text-[#828179] mb-2 tracking-wider">ENTITY_NAME</label>
                    <input type="text" className="w-full bg-[#050505] border border-[#1f1f1e] p-3 text-[0.875rem] text-[#f5f5f0] outline-none focus:border-[#d4b87a] transition-colors" placeholder="e.g. Nordic Infrastructure Partners" />
                  </div>
                  <div>
                    <label className="block font-mono-custom text-[0.625rem] text-[#828179] mb-2 tracking-wider">AUM_PARAMETER</label>
                    <select className="w-full bg-[#050505] border border-[#1f1f1e] p-3 text-[0.875rem] text-[#f5f5f0] outline-none cursor-pointer">
                      <option value="" disabled>Select threshold...</option>
                      <option value="200-500">$200M – $500M</option>
                      <option value="500-2b">$500M – $2B</option>
                      <option value="2b+">$2B+</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-swiss w-full py-4 font-mono-custom text-[0.8125rem] tracking-[0.1em] mt-4">
                    <ScrambleText text="TRANSMIT_PROTOCOL" />
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
            <div className="text-[0.8125rem] text-muted-foreground mb-12">Architecting PE Liquidity.</div>
            <address className="not-italic font-mono-custom text-[0.625rem] text-muted-foreground leading-relaxed">
              Timbre AI Technologies AG<br />
              Talstrasse 82, 8001 Zürich, Switzerland
            </address>
          </div>
          <div className="grid grid-cols-2 gap-8 font-mono-custom text-[0.625rem]">
            <div className="flex flex-col gap-4">
              <span className="text-[#f5f5f0] mb-2 tracking-wider">SYSTEMS</span>
              <a href="#" className="hover:text-[#d4b87a] transition-colors">Platform</a>
              <a href="#" className="hover:text-[#d4b87a] transition-colors">Intelligence</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[#f5f5f0] mb-2 tracking-wider">PROTOCOLS</span>
              <a href="#" className="hover:text-[#d4b87a] transition-colors">Compliance</a>
              <a href="#" className="hover:text-[#d4b87a] transition-colors">Privacy</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#1f1f1e] bg-[#0a0a0a] h-12 flex items-center">
            <div className="max-w-[83.75rem] mx-auto px-6 w-full flex items-center justify-between font-mono-custom text-[0.625rem] text-muted-foreground/50">
                <div>© 2025 Timbre AI Technologies AG</div>
                <div>[SYS_STATE: SECURE]</div>
            </div>
        </div>
      </footer>
    </div>
  );
}
