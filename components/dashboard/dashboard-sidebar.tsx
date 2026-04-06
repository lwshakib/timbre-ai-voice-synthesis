"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  type LucideIcon,
  Home,
  LayoutGrid,
  AudioLines,
  Volume2,
  Settings,
  Headphones,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { VoiceCreateDialog } from "@/components/voices/voice-create-dialog";
import { OrgSwitcher } from "@/components/organization/org-switcher";
import { Logo } from "@/components/ui/logo";
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

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
};

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
};

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
                    ? item.url === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
                className="h-10 px-4 py-2 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:border-primary data-[active=true]:bg-primary/10 data-[active=true]:text-foreground hover:bg-secondary transition-all duration-200"
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
  const { data: session } = authClient.useSession();
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);

  const mainMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Explore voices",
      url: "/voices",
      icon: LayoutGrid,
    },
    {
      title: "Text to speech",
      url: "/text-to-speech",
      icon: AudioLines,
    },
    {
      title: "Voice cloning",
      icon: Volume2,
      onClick: () => setVoiceDialogOpen(true),
    },
  ];

  const othersMenuItems: MenuItem[] = [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Help and support",
      url: "mailto:support@timbreai.build",
      icon: Headphones,
    },
  ];

  const user = session?.user;

  return (
    <>
      <VoiceCreateDialog
        open={voiceDialogOpen}
        onOpenChange={setVoiceDialogOpen}
      />
      <Sidebar collapsible="icon" className="border-r border-border bg-background">
        <SidebarHeader className="flex flex-col gap-4 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <Logo size={24} />
            <span className="text-foreground text-xl font-bold tracking-tighter truncate group-data-[collapsible=icon]:hidden">
              Timbre AI
            </span>
          </div>
          <OrgSwitcher />
        </SidebarHeader>
        
        <div className="mx-4 border-b border-border" />

        
        <SidebarContent className="py-4">
          <NavSection items={mainMenuItems} pathname={pathname} />
        </SidebarContent>
        
        <div className="mx-4 border-b border-border" />
        
        <SidebarFooter className="p-4 pt-0">
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
            
            <SidebarMenuItem className="mt-2 pt-2 border-t border-border">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <SidebarMenuButton
                    className="h-10 px-3 text-[13px] tracking-tight font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </SidebarMenuButton>
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
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
