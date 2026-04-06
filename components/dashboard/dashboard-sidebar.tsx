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
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { VoiceCreateDialog } from "@/components/voices/voice-create-dialog";
import { OrgSwitcher } from "@/components/organization/org-switcher";

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
          <OrgSwitcher />
        </SidebarHeader>
        
        <div className="mx-4 border-b border-border" />

        
        <SidebarContent className="py-4">
          <NavSection items={mainMenuItems} pathname={pathname} />
          <NavSection
            label="Others"
            items={othersMenuItems}
            pathname={pathname}
          />
        </SidebarContent>
        
        <div className="mx-4 border-b border-border" />
        
        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                className="h-12 w-full justify-start gap-3 bg-secondary border border-border rounded-sm px-3 hover:border-primary transition-all duration-300"
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = "/sign-in";
                }}
              >
                 <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                   {user?.image ? (
                     <Image src={user.image} alt={user?.name || "User"} width={24} height={24} className="rounded-full" />
                   ) : (
                     <UserIcon size={14} />
                   )}
                 </div>
                 <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden overflow-hidden">
                   <span className="text-[13px] font-medium text-foreground truncate">{user?.name || "Digital Creator"}</span>
                   <span className="text-[10px] text-muted-foreground font-mono-custom tracking-wider truncate">
                     {user?.email || "[SEC_LEVEL_01]"}
                   </span>
                 </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
