'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  type LucideIcon,
  Home,
  LayoutGrid,
  AudioLines,
  Volume2,
  Settings,
  Headphones,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { authClient } from '@/lib/auth-client';
import { VoiceCreateDialog } from '@/components/voices/voice-create-dialog';
import { OrgSwitcher } from '@/components/organization/org-switcher';
import { Logo } from '@/components/ui/logo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

interface MenuItem {
  title: string;
  url?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ label, items, pathname }: NavSectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-[11px] uppercase text-muted-foreground font-mono-custom tracking-[0.2em] mb-2 px-3">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === '/dashboard'
                      ? pathname === '/dashboard'
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
                className="h-10 px-3 py-2 text-[13px] tracking-tight font-medium data-[active=true]:bg-primary/10 data-[active=true]:text-foreground hover:bg-secondary transition-all duration-200"
              >
                {item.url ? (
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 w-full">
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const mainMenuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Explore voices',
      url: '/voices',
      icon: LayoutGrid,
    },
    {
      title: 'Text to speech',
      url: '/text-to-speech',
      icon: AudioLines,
    },
    {
      title: 'Voice cloning',
      icon: Volume2,
      onClick: () => setVoiceDialogOpen(true),
    },
  ];

  const othersMenuItems: MenuItem[] = [
    {
      title: 'Open Source',
      url: 'https://github.com/lwshakib/timbre-ai-voice-synthesis',
      icon: (props) => (
        <Icon
          icon="mdi:github"
          width={props.size}
          height={props.size}
          className={props.className}
        />
      ),
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
    {
      title: 'Help and support',
      onClick: () => setHelpDialogOpen(true),
      icon: Headphones,
    },
  ];

  return (
    <>
      <VoiceCreateDialog open={voiceDialogOpen} onOpenChange={setVoiceDialogOpen} />
      <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[420px]">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Headphones className="size-5 text-primary" />
              Help & Support
            </DialogTitle>
            <DialogDescription className="text-muted-foreground/80 pt-2 text-sm leading-relaxed">
              We are here to help you get the most out of Timbre AI. If you experience any issues or
              need support, please reach out to us at our dedicated email:
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-6 px-4 bg-muted/40 rounded-xl border border-border">
            <span className="text-sm font-medium text-foreground">Contact Email</span>
            <a
              href="mailto:leadwithshakib@gmail.com"
              className="text-lg font-semibold text-primary hover:underline tracking-tight break-all"
            >
              leadwithshakib@gmail.com
            </a>
          </div>

          <div className="text-center text-[11px] text-muted-foreground/50">
            Timbre AI Support Team
          </div>
        </DialogContent>
      </Dialog>
      <Sidebar collapsible="icon" className="border-r border-border bg-background">
        <SidebarHeader className="flex flex-col gap-3 pt-6 pb-2">
          <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
            <Logo size={24} />
            <span className="text-foreground text-xl font-bold tracking-tighter truncate group-data-[collapsible=icon]:hidden">
              Timbre AI
            </span>
          </div>
          <OrgSwitcher />
        </SidebarHeader>

        <SidebarContent className="pt-1 pb-4">
          <NavSection items={mainMenuItems} pathname={pathname} />
        </SidebarContent>

        <SidebarFooter className="px-2 py-4 group-data-[collapsible=icon]:p-2">
          <SidebarMenu>
            {othersMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild={!!item.url}
                  isActive={item.url ? pathname.startsWith(item.url) : false}
                  onClick={item.onClick}
                  tooltip={item.title}
                  className="h-10 px-3 text-[13px] tracking-tight font-medium hover:bg-secondary transition-all"
                >
                  {item.url ? (
                    <Link
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3"
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 w-full">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem className="mt-2 pt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <SidebarMenuButton className="h-10 px-3 text-[13px] tracking-tight font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </SidebarMenuButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign Out</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to sign out of your account? Your current session will
                      be terminated.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await authClient.signOut();
                        window.location.href = '/sign-in';
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Sign Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
