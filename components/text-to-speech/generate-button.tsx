"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function GenerateButton({
  size = "lg",
  disabled,
  isSubmitting,
  onSubmit,
  className,
}: {
  size?: "default" | "sm" | "lg" | "icon";
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit?: () => void;
  className?: string;
}) {
  return (
    <Button
      size={size}
      className={cn(
        "bg-[#d4b87a] hover:bg-[#c4a86a] text-black font-semibold rounded-full min-w-[160px]",
        className
      )}
      onClick={onSubmit}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Spinner className="size-4 mr-2" />
          [GENERATING...]
        </>
      ): (
        <>
          <Sparkles className="size-4 mr-2" />
          Generate speech
        </>
      )}
    </Button>
  );
};
