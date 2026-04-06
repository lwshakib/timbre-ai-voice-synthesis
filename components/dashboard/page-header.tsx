import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border bg-background/50 backdrop-blur-md px-4 py-3 sticky top-0 z-50",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
        <div className="flex flex-col">
          <h1 className="text-sm font-medium tracking-tight text-foreground">{title}</h1>
          <span className="text-[9px] text-muted-foreground/60 font-mono-custom tracking-[0.2em] uppercase">
            [SYS_NODE // {title.toUpperCase()}]
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
         <Button variant="outline" size="sm" asChild className="h-8 border-border bg-card text-muted-foreground hover:text-primary">
            <Link href="mailto:support@timbreai.build">
              <ThumbsUp className="size-3.5 mr-2" />
              <span className="hidden md:block text-[11px]">Feedback</span>
            </Link>
         </Button>
         <Button variant="outline" size="sm" asChild className="h-8 border-border bg-card text-muted-foreground hover:text-primary">
          <Link href="mailto:support@timbreai.build">
            <Headphones className="size-3.5 mr-2" />
            <span className="hidden md:block text-[11px]">Help</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
