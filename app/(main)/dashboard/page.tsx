"use client";

import { Reveal } from "@/components/marketing/reveal";
import { CountingNumber } from "@/components/marketing/counting-number";
import { Icon } from "@iconify/react";

export default function DashboardPage() {
  return (
    <div className="flex-1 p-8 pt-12">
      <Reveal>
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[#f5f5f0] text-3xl font-light tracking-tight mb-2">
              Dashboard Overview
            </h1>
            <p className="text-[#828179] text-xs font-mono-custom tracking-[0.2em] uppercase">
              [SYS·STATE // MONITORING_ACTIVE]
            </p>
          </div>
          <button className="btn-swiss px-6 py-2.5 font-mono-custom text-[0.6875rem] tracking-[0.05em]">
            NEW_GENERATION
          </button>
        </div>
      </Reveal>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Reveal className="glass-panel p-6 rounded-sm border-l-2 border-[#d4b87a]">
            <div className="text-[#828179] text-[0.625rem] font-mono-custom uppercase tracking-widest mb-4">TOTAL_GENERATIONS</div>
            <div className="text-[#f5f5f0] text-3xl font-light tracking-tighter mb-1"><CountingNumber value={1248} /></div>
            <div className="text-[#d4b87a] text-[10px] font-mono-custom flex items-center gap-1 mt-2">
              <Icon icon="solar:round-alt-arrow-up-linear" /> +12% Delta
            </div>
          </Reveal>
          
          <Reveal className="glass-panel p-6 rounded-sm">
            <div className="text-[#828179] text-[0.625rem] font-mono-custom uppercase tracking-widest mb-4">ACTIVE_VOICES</div>
            <div className="text-[#f5f5f0] text-3xl font-light tracking-tighter mb-1"><CountingNumber value={42} /></div>
            <div className="text-[#555] text-[10px] font-mono-custom flex items-center gap-1 mt-2">
              <Icon icon="solar:user-speak-linear" /> Institutional Core
            </div>
          </Reveal>

          <Reveal className="glass-panel p-6 rounded-sm">
            <div className="text-[#828179] text-[0.625rem] font-mono-custom uppercase tracking-widest mb-4">TRAINING_HOURS</div>
            <div className="text-[#f5f5f0] text-3xl font-light tracking-tighter mb-1"><CountingNumber value={83.4} format="percent" /></div>
            <div className="text-[#555] text-[10px] font-mono-custom flex items-center gap-1 mt-2">
              <Icon icon="solar:clock-circle-linear" /> COMPUTE_LOAD: STABLE
            </div>
          </Reveal>

          <Reveal className="glass-panel p-6 rounded-sm">
            <div className="text-[#828179] text-[0.625rem] font-mono-custom uppercase tracking-widest mb-4">API_LATENCY</div>
            <div className="text-[#f5f5f0] text-3xl font-light tracking-tighter mb-1"><CountingNumber value={140} />ms</div>
            <div className="text-green-500/70 text-[10px] font-mono-custom flex items-center gap-1 mt-2">
              <Icon icon="solar:verified-check-linear" /> HEALTH: OPTIMAL
            </div>
          </Reveal>
      </div>

      {/* Main Content Areas Placeholder */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Reveal className="glass-panel min-h-[400px] rounded-sm p-8 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-full border border-[#1f1f1e] flex items-center justify-center mb-6 bg-[#111111]/50 text-[#828179]">
              <Icon icon="solar:chart-square-linear" width={24} height={24} />
            </div>
            <h3 className="text-[#f5f5f0] font-light text-xl mb-2">Portfolio Topography</h3>
            <p className="text-[#828179] text-sm max-w-[320px] mb-8">AI-architected visualizations of your synthesis load and voice model performance metrics.</p>
            <div className="h-[2px] w-12 bg-[#d4b87a] opacity-30" />
        </Reveal>

        <Reveal className="glass-panel min-h-[400px] rounded-sm p-8 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-full border border-[#1f1f1e] flex items-center justify-center mb-6 bg-[#111111]/50 text-[#828179]">
              <Icon icon="solar:history-linear" width={24} height={24} />
            </div>
            <h3 className="text-[#f5f5f0] font-light text-xl mb-2">Recent Synthesis Logs</h3>
            <p className="text-[#828179] text-sm max-w-[320px] mb-8">Secure chronological ledger of all institutional voice generations and model updates.</p>
            <div className="h-[2px] w-12 bg-[#d4b87a] opacity-30" />
        </Reveal>
      </div>
    </div>
  )
}
