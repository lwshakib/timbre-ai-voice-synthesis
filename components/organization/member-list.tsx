"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function MemberList() {
  const { data: activeOrg, isPending } = authClient.useActiveOrganization();
  const { data: session } = authClient.useSession();

  const members = activeOrg?.members || [];

  const handleRemoveMember = async (memberId: string) => {
    try {
      await authClient.organization.removeMember({
        memberIdOrEmail: memberId,
      });
      toast.success("Member removed successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove member");
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: "member" | "admin" | "owner") => {
    try {
      await authClient.organization.updateMemberRole({
        memberId,
        role: newRole,
      });
      toast.success(`Role updated to ${newRole}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to update role");
    }
  };

  if (!activeOrg) {
    return (
      <div className="p-8 border border-dashed border-border rounded-sm text-center">
        <p className="text-muted-foreground/60 text-xs font-mono-custom uppercase tracking-widest">
          No active organization selected
        </p>
      </div>
    );
  }

  if (isPending) {
    return <div className="text-muted-foreground/60 animate-pulse">Loading personnel data...</div>;
  }

  return (
    <div className="glass-panel border border-border rounded-sm bg-card/30">
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h3 className="text-muted-foreground text-[0.625rem] font-mono-custom uppercase tracking-widest">
          Personnel_Manifest // {activeOrg.name.toUpperCase()}
        </h3>
        <Icon icon="solar:users-group-two-rounded-linear" className="text-muted-foreground/30" />
      </div>
      <div className="divide-y divide-border">
        {members.map((member: any) => (
          <div key={member.id} className="px-6 py-4 flex items-center justify-between text-sm group">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-primary text-xs">
                {member.user.name?.slice(0, 1).toUpperCase() || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-foreground tracking-tight font-medium">
                  {member.user.name} {member.userId === session?.user.id && "(You)"}
                </span>
                <span className="text-[10px] text-muted-foreground/60 font-mono-custom tracking-widest uppercase">
                  {member.user.email}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-mono-custom text-primary bg-primary/10 px-2 py-0.5 rounded-sm border border-primary/20 uppercase tracking-widest">
                {member.role}
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-muted-foreground/30 hover:text-primary transition-colors">
                    <Icon icon="solar:menu-dots-bold" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border text-foreground">
                  <DropdownMenuItem 
                    onClick={() => handleUpdateRole(member.id, "admin")}
                    className="focus:bg-primary/10 focus:text-foreground"
                  >
                    Promote to Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleUpdateRole(member.id, "member")}
                    className="focus:bg-primary/10 focus:text-foreground"
                  >
                    Demote to Member
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleRemoveMember(member.id)}
                    className="focus:bg-red-500/10 focus:text-red-500 text-red-500/70"
                  >
                    Terminate Access
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
