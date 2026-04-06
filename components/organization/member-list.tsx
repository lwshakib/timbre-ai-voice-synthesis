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
      <div className="p-8 border border-dashed border-[#1f1f1e] rounded-sm text-center">
        <p className="text-[#555] text-xs font-mono-custom uppercase tracking-widest">
          No active organization selected
        </p>
      </div>
    );
  }

  if (isPending) {
    return <div className="text-[#555] animate-pulse">Loading personnel data...</div>;
  }

  return (
    <div className="glass-panel border border-[#1f1f1e] rounded-sm bg-[#0a0a0a]/30">
      <div className="px-6 py-4 border-b border-[#1f1f1e] flex justify-between items-center">
        <h3 className="text-[#828179] text-[0.625rem] font-mono-custom uppercase tracking-widest">
          Personnel_Manifest // {activeOrg.name.toUpperCase()}
        </h3>
        <Icon icon="solar:users-group-two-rounded-linear" className="text-[#333]" />
      </div>
      <div className="divide-y divide-[#1f1f1e]">
        {members.map((member: any) => (
          <div key={member.id} className="px-6 py-4 flex items-center justify-between text-sm group">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#111111] border border-[#1f1f1e] flex items-center justify-center text-[#d4b87a] text-xs">
                {member.user.name?.slice(0, 1).toUpperCase() || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-[#f5f5f0] tracking-tight font-medium">
                  {member.user.name} {member.userId === session?.user.id && "(You)"}
                </span>
                <span className="text-[10px] text-[#555] font-mono-custom tracking-widest uppercase">
                  {member.user.email}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-mono-custom text-[#d4b87a] bg-[#d4b87a]/10 px-2 py-0.5 rounded-sm border border-[#d4b87a]/20 uppercase tracking-widest">
                {member.role}
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-[#333] hover:text-[#d4b87a] transition-colors">
                    <Icon icon="solar:menu-dots-bold" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#0a0a0a] border-[#1f1f1e] text-[#f5f5f0]">
                  <DropdownMenuItem 
                    onClick={() => handleUpdateRole(member.id, "admin")}
                    className="focus:bg-[#d4b87a]/10 focus:text-[#f5f5f0]"
                  >
                    Promote to Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleUpdateRole(member.id, "member")}
                    className="focus:bg-[#d4b87a]/10 focus:text-[#f5f5f0]"
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
