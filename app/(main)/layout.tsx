import { 
  SidebarInset, 
  SidebarProvider
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { HeroCanvas } from "@/components/marketing/hero-canvas";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-svh bg-[#050505]">
      {/* Dashboard Sidebar */}
      <DashboardSidebar />
      
      <SidebarInset className="relative overflow-hidden bg-[#0a0a0a] border-l border-[#1f1f1e]">
        {/* Subtle Background Interaction */}
        <HeroCanvas />
        
        <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
};
