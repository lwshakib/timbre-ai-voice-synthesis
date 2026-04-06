"use client";

import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function DashboardHeader() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-[#828179] font-mono-custom tracking-wider uppercase">
          [SYS_GREETING // SEC_LEVEL_01]
        </p>
        <h1 className="text-2xl lg:text-3xl font-light tracking-tight text-[#f5f5f0]">
          Nice to see you, <span className="text-[#d4b87a]">{isPending ? "..." : (user?.name?.split(" ")[0] || "User")}</span>
        </h1>
      </div>

      <div className="lg:flex items-center gap-3 hidden">
        <Button variant="outline" size="sm" asChild className="border-[#1f1f1e] bg-[#0a0a0a] text-[#f5f5f0] hover:bg-[#111111] hover:border-[#d4b87a]/50">
          <Link href="mailto:support@timbreai.build">
            <ThumbsUp className="size-4 mr-2 text-[#d4b87a]" />
            <span>Feedback</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="border-[#1f1f1e] bg-[#0a0a0a] text-[#f5f5f0] hover:bg-[#111111] hover:border-[#d4b87a]/50">
          <Link href="mailto:support@timbreai.build">
            <Headphones className="size-4 mr-2 text-[#d4b87a]" />
            <span>Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
