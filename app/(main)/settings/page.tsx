"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/marketing/reveal";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { authClient } from "@/lib/auth-client";
import { MemberList } from "@/components/organization/member-list";
import { InviteDialog } from "@/components/organization/invite-dialog";
import { toast } from "sonner";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("PROFILE");
    const { data: activeOrg } = authClient.useActiveOrganization();

    const tabs = ["PROFILE", "SECURITY", "WORKSPACE", "BILLING", "API"];

    return (
        <div className="flex-1 p-8 pt-12 max-w-[1000px] mx-auto w-full">
            <Reveal>
                <div className="flex flex-col items-start mb-12">
                    <h1 className="text-[#f5f5f0] text-3xl font-light tracking-tight mb-2">
                        {activeOrg ? `${activeOrg.name} // Configuration` : "Institutional Configuration"}
                    </h1>
                    <p className="text-[#828179] text-xs font-mono-custom tracking-[0.2em] uppercase">
                        [SYS·SET // {activeOrg ? "WORKSPACE_PARAMETERS" : "ACCOUNT_PARAMETERS"}]
                    </p>
                </div>
            </Reveal>

            {/* Tabs */}
            <Reveal className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex items-center gap-2 border-b border-[#1f1f1e]">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 font-mono-custom text-[0.625rem] tracking-[0.2em] transition-all relative ${
                                activeTab === tab 
                                ? "text-[#d4b87a]" 
                                : "text-[#555] hover:text-[#828179]"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d4b87a] shadow-[0_0_8px_#d4b87a]" />
                            )}
                        </button>
                    ))}
                </div>
            </Reveal>

            {/* Tab Content */}
            <div className="space-y-12">
                {activeTab === "PROFILE" && (
                    <Reveal className="space-y-10 animate-in fade-in duration-500">
                        <section>
                            <h3 className="text-[#f5f5f0] text-sm font-medium uppercase tracking-widest mb-6 flex items-center gap-3">
                                <Icon icon="solar:user-id-linear" className="text-[#d4b87a]" />
                                Entity Identification
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                     <div>
                                        <label className="block text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest mb-2">FULL_ENTITY_NAME</label>
                                        <div className="glass-panel p-3 border border-[#1f1f1e] text-[#f5f5f0] text-sm rounded-sm bg-[#0a0a0a]/50 italic">Institutional User // Entity Corp</div>
                                     </div>
                                     <div>
                                        <label className="block text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest mb-2">CLEARANCE_LEVEL</label>
                                        <div className="flex items-center gap-3 text-[#d4b87a] text-xs font-mono-custom tracking-widest uppercase">
                                            <Icon icon="solar:shield-star-linear" />
                                            SEC_LEVEL_01 // PARTNER
                                        </div>
                                     </div>
                                </div>
                                <div className="flex items-center justify-center border border-dashed border-[#1f1f1e] rounded-sm p-8 bg-[#0a0a0a]/20">
                                     <div className="text-center">
                                        <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#1f1f1e] flex items-center justify-center mx-auto mb-4 text-[#555]">
                                            <Icon icon="solar:user-speak-linear" width={24} height={24} />
                                        </div>
                                        <p className="text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest">Digital_Avatar_01</p>
                                     </div>
                                </div>
                            </div>
                        </section>

                        <div className="h-[1px] w-full bg-gradient-to-r from-[#1f1f1e] via-transparent to-transparent" />

                        <section>
                            <h3 className="text-[#f5f5f0] text-sm font-medium uppercase tracking-widest mb-6 flex items-center gap-3">
                                <Icon icon="solar:letter-linear" className="text-[#d4b87a]" />
                                Secure Communications
                            </h3>
                            <div className="max-w-[400px]">
                                <label className="block text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest mb-2">UPLINK_EMAIL</label>
                                <div className="glass-panel p-3 border border-[#1f1f1e] text-[#f5f5f0] text-sm rounded-sm bg-[#0a0a0a]/50">institutional@entity.com</div>
                            </div>
                        </section>
                    </Reveal>
                )}

                {activeTab === "SECURITY" && (
                    <Reveal className="space-y-8 animate-in fade-in duration-500">
                        <section className="glass-panel p-8 border border-[#1f1f1e] rounded-sm overflow-hidden relative">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
                                    <Icon icon="solar:shield-keyhole-linear" width={24} height={24} />
                                </div>
                                <div>
                                    <h3 className="text-[#f5f5f0] text-lg font-light tracking-tight">Access Key Rotation</h3>
                                    <p className="text-[#555] text-xs font-mono-custom tracking-wider">SECURE_RE_AUTHENTICATION_PROTOCOL</p>
                                </div>
                             </div>
                             <p className="text-[#828179] text-sm max-w-[500px] mb-8 leading-relaxed">Ensure institutional security by rotating your master access key every 90 synthesis cycles. This action requires current identity verification.</p>
                             <button className="btn-ghost-swiss px-6 py-3 font-mono-custom text-[0.6875rem] tracking-[0.1em] text-red-500/70 border-red-500/20 hover:bg-red-500/10">
                                <ScrambleText text="ROTATE_ACCESS_KEY" />
                             </button>
                             <div className="absolute top-0 right-0 p-4 font-mono-custom text-[0.625rem] text-[#333]">V.02.48</div>
                        </section>
                    </Reveal>
                )}

                {activeTab === "WORKSPACE" && (
                    <Reveal className="space-y-12 animate-in fade-in duration-500">
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-[#f5f5f0] text-sm font-medium uppercase tracking-widest flex items-center gap-3">
                                        <Icon icon="solar:buildings-linear" className="text-[#d4b87a]" />
                                        Personnel Management
                                    </h3>
                                    <p className="text-[#555] text-xs font-mono-custom tracking-wider mt-1 uppercase">AUTHORIZE_TEAM_CLEARANCE</p>
                                </div>
                                <InviteDialog />
                            </div>

                            <MemberList />
                        </section>

                        <div className="h-[1px] w-full bg-gradient-to-r from-[#1f1f1e] via-transparent to-transparent" />

                        <section className="glass-panel p-8 border border-[#1f1f1e] rounded-sm overflow-hidden relative">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
                                    <Icon icon="solar:danger-linear" width={24} height={24} />
                                </div>
                                <div>
                                    <h3 className="text-[#f5f5f0] text-lg font-light tracking-tight">Decommission Workspace</h3>
                                    <p className="text-[#555] text-xs font-mono-custom tracking-wider uppercase">PERMANENT_RESOURCES_WIPE</p>
                                </div>
                             </div>
                             <p className="text-[#828179] text-sm max-w-[500px] mb-8 leading-relaxed">Permanently decommission this institutional organization and all associated synthesis data, voices, and personnel records.</p>
                             <button 
                                onClick={async () => {
                                    if (!activeOrg) return;
                                    toast.info("Decommissioning protocol initialized. Identity verification required.");
                                }}
                                className="btn-ghost-swiss px-6 py-3 font-mono-custom text-[0.6875rem] tracking-[0.1em] text-red-500/70 border-red-500/20 hover:bg-red-500/10"
                             >
                                <ScrambleText text="INITIALIZE_DECOMMISSION" />
                             </button>
                        </section>
                    </Reveal>
                )}

                {activeTab === "BILLING" && (
                    <Reveal className="space-y-10 animate-in fade-in duration-500">
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                             <div className="glass-panel p-6 border border-[#1f1f1e] rounded-sm">
                                <div className="text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest mb-4">CURRENT_PLAN</div>
                                <div className="text-[#d4b87a] text-xl font-medium tracking-tight mb-1">PARTNER_INSTITUTIONAL</div>
                                <div className="text-[#555] text-[10px] font-mono-custom uppercase tracking-widest mt-4">RECURRING_FLAT_FEE</div>
                             </div>
                             <div className="glass-panel p-6 border border-[#1f1f1e] rounded-sm relative">
                                <div className="text-[0.625rem] font-mono-custom text-[#555] uppercase tracking-widest mb-4">REMAINING_CREDITS</div>
                                <div className="text-[#f5f5f0] text-3xl font-light tracking-tighter mb-1 tabular-nums">42,480.00</div>
                                <div className="h-1 w-full bg-[#1f1f1e] mt-4 rounded-full overflow-hidden">
                                     <div className="h-full w-[42%] bg-[#d4b87a] rounded-full shadow-[0_0_8px_#d4b87a]" />
                                </div>
                                <div className="absolute top-4 right-4 text-[#d4b87a]">
                                    <Icon icon="solar:coins-linear" width={18} height={18} />
                                </div>
                             </div>
                         </div>

                         <section className="glass-panel border border-[#1f1f1e] rounded-sm bg-[#0a0a0a]/30">
                            <div className="px-6 py-4 border-b border-[#1f1f1e] flex justify-between items-center">
                                <h3 className="text-[#828179] text-[0.625rem] font-mono-custom uppercase tracking-widest">RECENT_INVOICES_LEDGER</h3>
                                <Icon icon="solar:history-linear" className="text-[#333]" />
                            </div>
                            <div className="divide-y divide-[#1f1f1e]">
                               {[1, 2].map(i => (
                                   <div key={i} className="px-6 py-4 flex items-center justify-between text-sm group cursor-pointer hover:bg-[#d4b87a]/5 transition-colors">
                                       <div className="flex items-center gap-4">
                                            <Icon icon="solar:document-text-linear" className="text-[#555] group-hover:text-[#d4b87a]" />
                                            <div className="flex flex-col">
                                                <span className="text-[#f5f5f0] tracking-tight font-medium">INV_2026_0{i}_PARTNER</span>
                                                <span className="text-[10px] text-[#555] font-mono-custom tracking-widest">BATCH_DATED: 2026-04-0{i}</span>
                                            </div>
                                       </div>
                                       <div className="flex items-center gap-6">
                                            <span className="font-mono-custom text-xs text-[#828179]">$2,400.00</span>
                                            <button className="text-[#d4b87a] opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Icon icon="solar:download-linear" />
                                            </button>
                                       </div>
                                   </div>
                               ))}
                            </div>
                         </section>
                    </Reveal>
                )}

                {activeTab === "API" && (
                    <Reveal className="space-y-8 animate-in fade-in duration-500">
                        <section className="space-y-6">
                             <div className="flex items-center justify-between">
                                 <div>
                                    <h3 className="text-[#f5f5f0] text-sm font-medium uppercase tracking-widest flex items-center gap-3">
                                        <Icon icon="solar:key-linear" className="text-[#d4b87a]" />
                                        Institutional Access Keys
                                    </h3>
                                    <p className="text-[#555] text-xs font-mono-custom tracking-wider mt-1 uppercase">AUTHENTICATE_MODAL_HANDSHAKES</p>
                                 </div>
                                 <button className="btn-swiss px-6 py-2.5 font-mono-custom text-[0.6875rem] tracking-[0.05em]">
                                    NEW_ENDPOINT_KEY
                                 </button>
                             </div>

                             <div className="glass-panel p-4 border border-[#1f1f1e] rounded-sm bg-[#050505] flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                       <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_green]" />
                                       <div className="flex flex-col">
                                            <span className="text-[#f5f5f0] text-sm font-medium tracking-tight">Main_Synthesis_Production</span>
                                            <span className="text-[10px] text-[#555] font-mono-custom tracking-[0.2em] uppercase">Last Used: 2.1 minutes ago</span>
                                       </div>
                                  </div>
                                  <div className="flex items-center gap-1 font-mono-custom text-[0.75rem] text-[#333] bg-[#0a0a0a] px-3 py-1.5 rounded-sm border border-[#1f1f1e]">
                                      <span>sk_volx_••••••••••••••••••••342f</span>
                                      <button className="ml-2 hover:text-[#d4b87a] transition-colors"><Icon icon="solar:copy-linear" width={14} height={14} /></button>
                                  </div>
                             </div>
                        </section>

                        <section className="p-8 border border-dashed border-[#1f1f1e] rounded-sm text-center">
                             <Icon icon="solar:code-square-linear" width={32} height={32} className="text-[#333] mx-auto mb-4" />
                             <h4 className="text-[#828179] text-sm font-medium uppercase tracking-widest mb-1">Developer Documentation</h4>
                             <p className="text-[#555] text-xs mb-6 font-mono-custom uppercase tracking-wider">Access the institutional API specification ledger.</p>
                             <button className="text-[#d4b87a] font-mono-custom text-[0.625rem] uppercase tracking-widest hover:opacity-50 transition-opacity">
                                <ScrambleText text="VIEW_OPEN_SPECS" />
                             </button>
                        </section>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
