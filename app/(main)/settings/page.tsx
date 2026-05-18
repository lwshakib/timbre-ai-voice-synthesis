'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from '@/components/marketing/reveal';
import { Icon } from '@iconify/react';
import { ScrambleText } from '@/components/marketing/scramble-text';
import { authClient } from '@/lib/auth-client';
import { MemberList } from '@/components/organization/member-list';
import { InviteDialog } from '@/components/organization/invite-dialog';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
} from '@/components/ui/alert-dialog';
import Image from 'next/image';

import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const { data: session } = authClient.useSession();
  const { theme, setTheme } = useTheme();
  const { data: activeOrg } = authClient.useActiveOrganization();
  const [sessions, setSessions] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = session?.user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionsRes, accountsRes] = await Promise.all([
          authClient.listSessions(),
          authClient.listAccounts(),
        ]);

        // Get dynamic signed URL for the user's avatar
        const signedUrlRes = await fetch('/api/s3/signed-url');
        const signedUrlData = await signedUrlRes.json();

        setSessions(sessionsRes.data || []);
        setAccounts(accountsRes.data || []);
        setAvatarUrl(signedUrlData.signedUrl);
      } catch (error) {
        console.error('Error fetching settings data:', error);
      } finally {
        // Data fetch complete
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme, setTheme]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Valid image format required.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size limit exceed (2MB max).');
      return;
    }

    setUploading(true);
    const t = toast.loading('Processing uplink... Updating profile data.');

    try {
      // Step 1: Get Pre-signed Upload URL
      const presignedRes = await fetch(
        `/api/s3/presigned-url?contentType=${encodeURIComponent(file.type)}`
      );
      if (!presignedRes.ok) throw new Error('Failed to get upload URL');
      const { uploadUrl, key } = await presignedRes.json();

      // Step 2: PUT file to S3
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        mode: 'cors',
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error('S3 Upload Error Response:', errorText);
        throw new Error(`Upload failed with status: ${uploadRes.status}`);
      }

      // Step 3: Update DB with the S3 key
      const dbUpdateRes = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageKey: key }),
      });

      if (!dbUpdateRes.ok) throw new Error('Database update failed');

      // Step 4: Get signed download URL to refresh UI
      const signedRes = await fetch(`/api/s3/signed-url?key=${key}`);
      const signedData = await signedRes.json();
      setAvatarUrl(signedData.signedUrl);

      toast.success('Identity updated successfully.', { id: t });
    } catch (error) {
      console.error('Upload process error:', error);
      toast.error('Uplink failed. Transmission error.', { id: t });
    } finally {
      setUploading(false);
    }
  };

  const tabs = ['Profile', 'Security', 'Workspace', 'Billing', 'API'];

  return (
    <div className="flex-1 p-8 pt-12 max-w-[1000px] mx-auto w-full">
      <Reveal>
        <div className="flex flex-col items-start mb-12">
          <h1 className="text-foreground text-3xl font-light tracking-tight mb-2">
            {activeOrg ? `${activeOrg.name} Configuration` : 'Account Configuration'}
          </h1>
          <p className="text-muted-foreground text-xs font-normal">
            Adjust your workspace preferences and identity.
          </p>
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex items-center gap-2 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-xs transition-all relative ${
                activeTab === tab
                  ? 'text-primary'
                  : 'text-muted-foreground/40 hover:text-muted-foreground'
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
        {activeTab === 'Profile' && (
          <Reveal className="space-y-10 animate-in fade-in duration-500">
            <section>
              <h3 className="text-foreground text-sm font-medium tracking-tight mb-6 flex items-center gap-3">
                <Icon icon="solar:user-id-linear" className="text-primary" />
                User Identification
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-8 bg-secondary/10 p-6 rounded-xl border border-border/40">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleUpload}
                />
                
                {/* Dynamic Circle Avatar with Camera Overlay */}
                <div 
                  onClick={() => !uploading && fileInputRef.current?.click()}
                  className="relative w-24 h-24 rounded-full border border-border overflow-hidden cursor-pointer group shadow-sm bg-card hover:border-primary/50 transition-all duration-300 shrink-0 animate-in zoom-in-95 duration-300"
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={user?.name || 'User'}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 bg-secondary/30">
                      <Icon icon="solar:user-linear" width={40} height={40} />
                    </div>
                  )}
                  
                  {/* Camera Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300">
                    <Icon 
                      icon={uploading ? "eos-icons:loading" : "solar:camera-linear"} 
                      width={24} 
                      height={24} 
                      className="scale-75 group-hover:scale-100 transition-transform duration-300" 
                    />
                  </div>
                </div>

                <div className="flex-1 w-full max-w-[400px]">
                  <Label className="block text-xs text-muted-foreground mb-2 font-normal">
                    Display Name
                  </Label>
                  <div className="glass-panel p-3 border border-border text-foreground text-sm rounded-lg bg-secondary/30">
                    {user?.name || 'Digital Creator'}
                  </div>
                </div>
              </div>
            </section>

            <div className="h-[1px] w-full bg-gradient-to-r from-[#1f1f1e] via-transparent to-transparent" />

            <section>
              <h3 className="text-foreground text-sm font-medium tracking-tight mb-6 flex items-center gap-3">
                <Icon icon="solar:letter-linear" className="text-primary" />
                Communications
              </h3>
              <div className="max-w-[400px]">
                <Label className="block text-xs text-muted-foreground mb-2 font-normal">
                  Email Address
                </Label>
                <div className="glass-panel p-3 border border-border text-foreground text-sm rounded-sm bg-secondary/50">
                  {user?.email || 'team@voice-lab.ai'}
                </div>
              </div>
            </section>

            <div className="h-[1px] w-full bg-gradient-to-r from-[#1f1f1e] via-transparent to-transparent" />

            <section className="space-y-6">
              <h3 className="text-foreground text-sm font-medium tracking-tight flex items-center gap-3">
                <Icon icon="solar:palette-linear" className="text-primary" />
                Appearance
              </h3>
              <div className="grid grid-cols-3 gap-4 max-w-[500px]">
                {[
                  { id: 'light', label: 'Light', icon: 'solar:sun-linear' },
                  { id: 'dark', label: 'Dark', icon: 'solar:moon-linear' },
                  { id: 'system', label: 'System', icon: 'solar:monitor-linear' },
                ].map((opt) => (
                  <Button
                    key={opt.id}
                    onClick={() => setTheme(opt.id)}
                    variant={theme === opt.id ? 'default' : 'outline'}
                    className={`h-auto p-4 flex flex-col items-center gap-3 rounded-lg cursor-pointer ${
                      theme === opt.id
                        ? 'border-primary bg-primary/10 text-primary hover:bg-primary/15'
                        : 'border-border text-muted-foreground hover:bg-secondary/40'
                    }`}
                  >
                    <Icon icon={opt.icon} width={20} height={20} />
                    <span className="text-xs font-normal">
                      {opt.label}
                    </span>
                  </Button>
                ))}
              </div>
            </section>

            <div className="h-[1px] w-full bg-gradient-to-r from-[#1f1f1e] via-transparent to-transparent" />

            <section className="space-y-6">
              <h3 className="text-foreground text-sm font-medium tracking-tight flex items-center gap-3">
                <Icon icon="solar:logout-linear" className="text-primary" />
                Account Session
              </h3>
              <div className="max-w-[400px]">
                <p className="text-xs text-muted-foreground mb-4">
                  Terminate your current session and securely sign out of your account.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 px-6 text-xs rounded-lg font-medium cursor-pointer border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      Sign Out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sign Out</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to sign out of your account? Your current session
                        will be terminated.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="ghost"
                        onClick={async () => {
                          await authClient.signOut();
                          window.location.href = '/sign-in';
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white hover:text-white transition-colors cursor-pointer font-medium"
                      >
                        Sign Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </section>
          </Reveal>
        )}

        {activeTab === 'Security' && (
          <Reveal className="space-y-8 animate-in fade-in duration-500">
            <section className="glass-panel p-8 border border-border rounded-sm overflow-hidden relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <Icon icon="solar:shield-keyhole-linear" width={24} height={24} />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-light tracking-tight">
                    Security Credentials
                  </h3>
                  <p className="text-muted-foreground text-xs font-normal">
                    Active linked accounts and sessions
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-normal text-muted-foreground mb-4">
                    Linked Accounts
                  </h4>
                  <div className="grid gap-3">
                    {accounts.map((acc, i) => (
                      <div
                        key={i}
                        className="glass-panel px-4 py-3 border border-border bg-background/50 flex items-center justify-between rounded-sm"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            icon={
                              acc.providerId === 'google'
                                  ? 'logos:google-icon'
                                  : 'solar:letter-linear'
                            }
                            width={16}
                          />
                          <span className="text-sm text-foreground capitalize">
                            {acc.providerId}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground font-normal">
                          Verified
                        </span>
                      </div>
                    ))}
                    {accounts.length === 0 && (
                      <p className="text-xs text-muted-foreground/50">No accounts linked.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-normal text-muted-foreground mb-4">
                    Active Sessions
                  </h4>
                  <div className="grid gap-3">
                    {sessions.map((sess) => (
                      <div
                        key={sess.id}
                        className="glass-panel px-4 py-3 border border-border bg-background/50 flex items-center justify-between rounded-sm"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            icon="solar:laptop-minimalistic-linear"
                            className="text-muted-foreground"
                            width={16}
                          />
                          <div className="flex flex-col">
                            <span className="text-sm text-foreground">
                              {sess.userAgent?.includes('Windows')
                                ? 'Windows Host'
                                : sess.userAgent?.includes('Mac')
                                  ? 'Apple Host'
                                  : 'Terminal Session'}
                            </span>
                            <span className="text-[10px] text-muted-foreground/30 font-normal">
                              IP: {sess.ipAddress || 'Internal Uplink'}
                            </span>
                          </div>
                        </div>
                        {session?.session.id === sess.id && (
                          <span className="text-[10px] text-primary font-normal border border-primary/20 px-2 py-1 rounded-sm bg-primary/5">
                            Current
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                <h4 className="text-xs font-normal text-muted-foreground mb-4">
                  Identity Rotation
                </h4>
                <Button
                  variant="outline"
                  className="h-10 px-6 text-xs text-muted-foreground hover:text-foreground rounded-lg font-medium cursor-pointer"
                >
                  <ScrambleText text="Change Password" />
                </Button>
              </div>
            </section>
          </Reveal>
        )}

        {activeTab === 'Workspace' && (
          <Reveal className="space-y-12 animate-in fade-in duration-500">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground text-sm font-medium tracking-tight flex items-center gap-3">
                    <Icon icon="solar:buildings-linear" className="text-primary" />
                    Team Management
                  </h3>
                  <p className="text-muted-foreground text-xs font-normal mt-1">
                    Manage workspace members and invitations.
                  </p>
                </div>
                <InviteDialog />
              </div>

              <MemberList />
            </section>

            <div className="h-[1px] w-full bg-gradient-to-r from-[#1f1f1e] via-transparent to-transparent" />

            <section className="glass-panel p-8 border border-border rounded-xl overflow-hidden relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-destructive/10 border border-destructive/20 text-destructive">
                  <Icon icon="solar:danger-linear" width={24} height={24} />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-light tracking-tight">
                    Decommission Workspace
                  </h3>
                  <p className="text-muted-foreground text-xs font-normal mt-1">
                    Permanently delete all workspace data.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm max-w-[500px] mb-8 leading-relaxed">
                Delete this workspace and permanently remove all voices, audio generations, and team records. This action is irreversible.
              </p>
              <Button
                onClick={async () => {
                  if (!activeOrg) return;
                  toast.info('Workspace deletion requested. Identity verification required.');
                }}
                variant="destructive"
                className="h-10 px-6 text-xs rounded-lg font-medium cursor-pointer"
              >
                Delete Workspace
              </Button>
            </section>
          </Reveal>
        )}

        {activeTab === 'Billing' && (
          <Reveal className="space-y-10 animate-in fade-in duration-500">
            <div className="p-4 border border-border rounded-lg bg-secondary/20 text-muted-foreground text-xs text-center">
              Billing services are currently being updated and are temporarily unavailable.
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-panel p-6 border border-border rounded-lg">
                <div className="text-xs text-muted-foreground mb-4">
                  Current Plan
                </div>
                <div className="text-primary text-xl font-medium tracking-tight mb-1">
                  Pro Synthesis
                </div>
                <div className="text-muted-foreground/50 text-xs mt-4">
                  Recurring Flat Fee
                </div>
              </div>
              <div className="glass-panel p-6 border border-border rounded-lg relative">
                <div className="text-xs text-muted-foreground mb-4">
                  Remaining Credits
                </div>
                <div className="text-foreground text-3xl font-light tracking-tighter mb-1 tabular-nums">
                  42,480.00
                </div>
                <div className="h-1 w-full bg-border mt-4 rounded-full overflow-hidden">
                  <div className="h-full w-[42%] bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
                </div>
                <div className="absolute top-4 right-4 text-primary">
                  <Icon icon="solar:coins-linear" width={18} height={18} />
                </div>
              </div>
            </div>

            <section className="glass-panel border border-border rounded-lg bg-secondary/10">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                <h3 className="text-xs text-muted-foreground font-medium">
                  Recent Invoices
                </h3>
                <Icon icon="solar:history-linear" className="text-muted-foreground/20" />
              </div>
              <div className="divide-y divide-border">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="px-6 py-4 flex items-center justify-between text-sm group cursor-pointer hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        icon="solar:document-text-linear"
                        className="text-muted-foreground/40 group-hover:text-primary"
                      />
                      <div className="flex flex-col">
                        <span className="text-foreground tracking-tight font-medium">
                          Invoice #2026-0{i}
                        </span>
                        <span className="text-xs text-muted-foreground/40">
                          Date: 2026-04-0{i}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-muted-foreground">
                        $2,400.00
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-primary opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Icon icon="solar:download-linear" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {activeTab === 'API' && (
          <Reveal className="space-y-8 animate-in fade-in duration-500">
            <div className="p-4 border border-border rounded-lg bg-secondary/20 text-muted-foreground text-xs text-center">
              API services are currently under maintenance and temporarily unavailable.
            </div>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground text-sm font-medium flex items-center gap-3">
                    <Icon icon="solar:key-linear" className="text-primary" />
                    Access Keys
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    Authenticate model syntheses and operations.
                  </p>
                </div>
                <Button className="h-10 px-6 text-xs rounded-lg font-medium cursor-pointer">
                  Generate new API key
                </Button>
              </div>

              <div className="glass-panel p-4 border border-border rounded-lg bg-background flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_green]" />
                  <div className="flex flex-col">
                    <span className="text-foreground text-sm font-medium tracking-tight">
                      Main_Synthesis_Production
                    </span>
                    <span className="text-xs text-muted-foreground/40">
                      Last used 2 minutes ago
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground/40 bg-secondary px-3 py-1.5 rounded-lg border border-border">
                  <span>sk_timbre_••••••••••••••••••••342f</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-2 hover:text-primary hover:bg-secondary cursor-pointer"
                  >
                    <Icon icon="solar:copy-linear" width={14} height={14} />
                  </Button>
                </div>
              </div>
            </section>

            <section className="p-8 border border-dashed border-border rounded-lg text-center">
              <Icon
                icon="solar:code-square-linear"
                width={32}
                height={32}
                className="text-muted-foreground/20 mx-auto mb-4"
              />
              <h4 className="text-muted-foreground text-sm font-medium mb-1">
                Developer Documentation
              </h4>
              <p className="text-muted-foreground/50 text-xs mb-6">
                Access the Timbre AI developer and API specifications.
              </p>
              <br />
              <Button
                variant="ghost"
                className="h-auto p-0 text-primary text-xs hover:text-primary/70 hover:bg-transparent cursor-pointer"
              >
                View Specifications
              </Button>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  );
}
