"use client";

import React, { useState, useEffect } from "react";
import { Reveal } from "@/components/marketing/reveal";
import { Icon } from "@iconify/react";
import { ScrambleText } from "@/components/marketing/scramble-text";
import { authClient } from "@/lib/auth-client";
import { MemberList } from "@/components/organization/member-list";
import { InviteDialog } from "@/components/organization/invite-dialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("Profile");
    const { data: session } = authClient.useSession();
    const { data: activeOrg } = authClient.useActiveOrganization();
    const [sessions, setSessions] = useState<any[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const user = session?.user;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [sessionsRes, accountsRes] = await Promise.all([
                    authClient.listSessions(),
                    authClient.listAccounts()
                ]);
                setSessions(sessionsRes.data || []);
                setAccounts(accountsRes.data || []);
            } catch (error) {
                console.error("Error fetching settings data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const tabs = ["Profile", "Security", "Workspace", "Billing", "API"];

    return (
        <div className="flex-1 p-8 pt-12 max-w-[1000px] mx-auto w-full">
            <Reveal>
                <div className="flex flex-col items-start mb-12">
                    <h1 className="text-foreground text-3xl font-light tracking-tight mb-2 uppercase">
                        {activeOrg ? `${activeOrg.name} Configuration` : "Account Configuration"}
                    </h1>
                    <p className="text-muted-foreground text-xs font-mono-custom tracking-[0.2em] uppercase">
                        Adjust your workspace preferences and identity.
                    </p>
                </div>
            </Reveal>

            {/* Tabs */}
            <Reveal className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex items-center gap-2 border-b border-border">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 font-mono-custom text-[0.625rem] tracking-[0.2em] transition-all relative ${
                                activeTab === tab 
                                ? "text-primary" 
                                : "text-muted-foreground/40 hover:text-muted-foreground"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary shadow-[0_0_8px_var(--primary)]" />
                            )}
                        </button>
                    ))}
                </div>
            </Reveal>

            {/* Tab Content */}
            <div className="space-y-12">
                {activeTab === "Profile" && (
                    <Reveal className="space-y-10 animate-in fade-in duration-500">
                        <section>
                            <h3 className="text-foreground text-sm font-medium uppercase tracking-widest mb-6 flex items-center gap-3">
                                <Icon icon="solar:user-id-linear" className="text-primary" />
                                User Identification
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                     <div>
                                        <label className="block text-[0.625rem] font-mono-custom text-muted-foreground tracking-widest mb-2">Display Name</label>
                                        <div className="glass-panel p-3 border border-border text-foreground text-sm rounded-sm bg-secondary/50 italic">
                                            {user?.name || "Digital Creator // Timbre Lab"}
                                        </div>
                                     </div>
                                     <div className="pt-4">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="btn-swiss px-6 py-3 font-mono-custom text-[0.6875rem] tracking-[0.1em]">
                                                    <ScrambleText text="Sign Out" />
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Sign Out</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to sign out of your account? Your current session will be terminated.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={async () => {
                                                            await authClient.signOut();
                                                            window.location.href = "/sign-in";
                                                        }}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Sign Out
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                     </div>
                                </div>
                                <div className="flex items-center justify-center border border-dashed border-border rounded-sm p-8 bg-secondary/20">
                                     <div className="text-center">
                                        <div className="w-20 h-20 rounded-full bg-background border border-border flex items-center justify-center mx-auto mb-4 text-muted-foreground overflow-hidden">
                                            {user?.image ? (
                                                <Image src={user.image} alt={user.name} width={80} height={80} className="object-cover" />
                                            ) : (
                                                <Icon icon="solar:user-speak-linear" width={32} height={32} />
                                            )}
                                        </div>
                                        <p className="text-[0.625rem] font-mono-custom text-muted-foreground uppercase tracking-widest">Digital_Vocal_Profile</p>
                                     </div>
                                </div>
                            </div>
                        </section>

                        <div className="h-[1px] w-full bg-gradient-to-r from-[#1f1f1e] via-transparent to-transparent" />

                        <section>
                            <h3 className="text-foreground text-sm font-medium uppercase tracking-widest mb-6 flex items-center gap-3">
                                <Icon icon="solar:letter-linear" className="text-primary" />
                                Communications
                            </h3>
                            <div className="max-w-[400px]">
                                <label className="block text-[0.625rem] font-mono-custom text-muted-foreground tracking-widest mb-2">Email Address</label>
                                <div className="glass-panel p-3 border border-border text-foreground text-sm rounded-sm bg-secondary/50">{user?.email || "team@voice-lab.ai"}</div>
                            </div>
                        </section>
                    </Reveal>
                )}

                {activeTab === "Security" && (
                    <Reveal className="space-y-8 animate-in fade-in duration-500">
                        <section className="glass-panel p-8 border border-border rounded-sm overflow-hidden relative">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                    <Icon icon="solar:shield-keyhole-linear" width={24} height={24} />
                                </div>
                                <div>
                                    <h3 className="text-foreground text-lg font-light tracking-tight">Security Credentials</h3>
                                    <p className="text-muted-foreground text-xs font-mono-custom tracking-wider">Active linked accounts and sessions</p>
                                </div>
                             </div>

                             <div className="space-y-8">
                                <div>
                                    <h4 className="text-[0.625rem] font-mono-custom text-muted-foreground uppercase tracking-widest mb-4">Linked Accounts</h4>
                                    <div className="grid gap-3">
                                        {accounts.map((acc, i) => (
                                            <div key={i} className="glass-panel px-4 py-3 border border-border bg-background/50 flex items-center justify-between rounded-sm">
                                                <div className="flex items-center gap-3">
                                                    <Icon icon={acc.providerId === "google" ? "logos:google-icon" : "solar:letter-linear"} width={16} />
                                                    <span className="text-sm text-foreground capitalize">{acc.providerId}</span>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground font-mono-custom tracking-widest uppercase">Verified</span>
                                            </div>
                                        ))}
                                        {accounts.length === 0 && <p className="text-xs text-muted-foreground/50">No accounts linked.</p>}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[0.625rem] font-mono-custom text-muted-foreground uppercase tracking-widest mb-4">Active Sessions</h4>
                                    <div className="grid gap-3">
                                        {sessions.map((sess, i) => (
                                            <div key={sess.id} className="glass-panel px-4 py-3 border border-border bg-background/50 flex items-center justify-between rounded-sm">
                                                <div className="flex items-center gap-3">
                                                    <Icon icon="solar:laptop-minimalistic-linear" className="text-muted-foreground" width={16} />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-foreground">
                                                            {sess.userAgent?.includes("Windows") ? "Windows Host" : sess.userAgent?.includes("Mac") ? "Apple Host" : "Terminal Session"}
                                                        </span>
                                                        <span className="text-[10px] text-muted-foreground/30 font-mono-custom">IP: {sess.ipAddress || "Internal Uplink"}</span>
                                                    </div>
                                                </div>
                                                {session?.session.id === sess.id && (
                                                    <span className="text-[10px] text-primary font-mono-custom tracking-widest uppercase border border-primary/20 px-2 py-1 rounded-sm bg-primary/5">Current</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                             </div>
                             
                             <div className="mt-8 pt-8 border-t border-border/50">
                                <h4 className="text-[0.625rem] font-mono-custom text-muted-foreground uppercase tracking-widest mb-4">Identity Rotation</h4>
                                <button className="btn-ghost-swiss px-6 py-3 font-mono-custom text-[0.6875rem] tracking-[0.1em] text-muted-foreground hover:text-foreground">
                                    <ScrambleText text="CHANGE_PASSWORD" />
                                </button>
                             </div>
                        </section>
                    </Reveal>
                )}

                {activeTab === "Workspace" && (
                    <Reveal className="space-y-12 animate-in fade-in duration-500">
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-foreground text-sm font-medium uppercase tracking-widest flex items-center gap-3">
                                        <Icon icon="solar:buildings-linear" className="text-primary" />
                                        Team Management
                                    </h3>
                                    <p className="text-muted-foreground text-xs font-mono-custom tracking-wider mt-1 uppercase">AUTHORIZE_TEAM_CLEARANCE</p>
                                </div>
                                <InviteDialog />
                            </div>

                            <MemberList />
                        </section>

                        <div className="h-[1px] w-full bg-gradient-to-r from-[#1f1f1e] via-transparent to-transparent" />

                        <section className="glass-panel p-8 border border-border rounded-sm overflow-hidden relative">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-full bg-destructive/10 border border-destructive/20 text-destructive">
                                    <Icon icon="solar:danger-linear" width={24} height={24} />
                                </div>
                                <div>
                                    <h3 className="text-foreground text-lg font-light tracking-tight">Decommission Workspace</h3>
                                    <p className="text-muted-foreground text-xs font-mono-custom tracking-wider">Permanent data removal</p>
                                </div>
                             </div>
                             <p className="text-muted-foreground text-sm max-w-[500px] mb-8 leading-relaxed">Permanently decommission this organization and all associated synthesis data, voices, and team records.</p>
                             <button 
                                onClick={async () => {
                                    if (!activeOrg) return;
                                    toast.info("Decommissioning protocol initialized. Identity verification required.");
                                }}
                                className="btn-ghost-swiss px-6 py-3 font-mono-custom text-[0.6875rem] tracking-[0.1em] text-destructive/70 border-destructive/20 hover:bg-destructive/10"
                             >
                                <ScrambleText text="INITIALIZE_DECOMMISSION" />
                             </button>
                        </section>
                    </Reveal>
                )}

                {activeTab === "Billing" && (
                    <Reveal className="space-y-10 animate-in fade-in duration-500">
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                             <div className="glass-panel p-6 border border-border rounded-sm">
                                <div className="text-[0.625rem] font-mono-custom text-muted-foreground tracking-widest mb-4">Current Plan</div>
                                <div className="text-primary text-xl font-medium tracking-tight mb-1">PRO_SYNTHESIS</div>
                                <div className="text-muted-foreground/30 text-[10px] font-mono-custom uppercase tracking-widest mt-4">RECURRING_FLAT_FEE</div>
                             </div>
                             <div className="glass-panel p-6 border border-border rounded-sm relative">
                                <div className="text-[0.625rem] font-mono-custom text-muted-foreground tracking-widest mb-4">Remaining Credits</div>
                                <div className="text-foreground text-3xl font-light tracking-tighter mb-1 tabular-nums">42,480.00</div>
                                <div className="h-1 w-full bg-border mt-4 rounded-full overflow-hidden">
                                     <div className="h-full w-[42%] bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
                                </div>
                                <div className="absolute top-4 right-4 text-primary">
                                    <Icon icon="solar:coins-linear" width={18} height={18} />
                                </div>
                             </div>
                             <div className="glass-panel p-6 border border-border rounded-sm flex items-center justify-center bg-destructive/5 italic text-destructive text-[10px] font-mono-custom tracking-[0.2em] text-center px-8 uppercase">
                                 It's a hardcoded UI, billing service is not available now
                             </div>
                         </div>

                         <section className="glass-panel border border-border rounded-sm bg-secondary/30">
                            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                                <h3 className="text-muted-foreground text-[0.625rem] font-mono-custom tracking-widest">Recent Invoices</h3>
                                <Icon icon="solar:history-linear" className="text-muted-foreground/20" />
                            </div>
                            <div className="divide-y divide-border">
                               {[1, 2].map(i => (
                                   <div key={i} className="px-6 py-4 flex items-center justify-between text-sm group cursor-pointer hover:bg-primary/5 transition-colors">
                                       <div className="flex items-center gap-4">
                                            <Icon icon="solar:document-text-linear" className="text-muted-foreground/40 group-hover:text-primary" />
                                            <div className="flex flex-col">
                                                <span className="text-foreground tracking-tight font-medium">INV_2026_0{i}_CREATOR</span>
                                                <span className="text-[10px] text-muted-foreground/30 font-mono-custom tracking-widest">BATCH_DATED: 2026-04-0{i}</span>
                                            </div>
                                       </div>
                                       <div className="flex items-center gap-6">
                                            <span className="font-mono-custom text-xs text-muted-foreground">$2,400.00</span>
                                            <button className="text-primary opacity-50 group-hover:opacity-100 transition-opacity">
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
                                    <h3 className="text-foreground text-sm font-medium uppercase tracking-widest flex items-center gap-3">
                                        <Icon icon="solar:key-linear" className="text-primary" />
                                        Access Keys
                                    </h3>
                                    <p className="text-muted-foreground text-xs font-mono-custom tracking-wider mt-1 uppercase">AUTHENTICATE_MODEL_HANDSHAKES</p>
                                 </div>
                                 <button className="btn-swiss px-6 py-2.5 font-mono-custom text-[0.6875rem] tracking-[0.05em]">
                                     Generate new API key
                                 </button>
                             </div>

                             <div className="glass-panel p-4 border border-border rounded-sm bg-background flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                       <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_green]" />
                                       <div className="flex flex-col">
                                            <span className="text-foreground text-sm font-medium tracking-tight">Main_Synthesis_Production</span>
                                            <span className="text-[10px] text-muted-foreground/30 font-mono-custom tracking-[0.2em] uppercase">Last Used: 2.1 minutes ago</span>
                                       </div>
                                  </div>
                                  <div className="flex items-center gap-1 font-mono-custom text-[0.75rem] text-muted-foreground/20 bg-secondary px-3 py-1.5 rounded-sm border border-border">
                                      <span>sk_timbre_••••••••••••••••••••342f</span>
                                      <button className="ml-2 hover:text-primary transition-colors"><Icon icon="solar:copy-linear" width={14} height={14} /></button>
                                  </div>
                             </div>
                        </section>

                        <section className="p-8 border border-dashed border-border rounded-sm text-center">
                             <Icon icon="solar:code-square-linear" width={32} height={32} className="text-muted-foreground/20 mx-auto mb-4" />
                             <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-1">Developer Documentation</h4>
                             <p className="text-muted-foreground/40 text-xs mb-6 font-mono-custom uppercase tracking-wider">Access the Timbre AI specification ledger.</p>
                             <div className="glass-panel py-4 px-6 border border-border/50 bg-destructive/5 italic text-destructive text-[10px] font-mono-custom tracking-[0.2em] inline-block uppercase mb-6">
                                 It's a hardcoded UI, API service is not available right now
                             </div>
                             <br />
                             <button className="text-primary font-mono-custom text-[0.625rem] uppercase tracking-widest hover:opacity-50 transition-opacity">
                                <ScrambleText text="VIEW_OPEN_SPECS" />
                             </button>
                        </section>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
