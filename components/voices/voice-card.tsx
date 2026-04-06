"use client";

import Link from "next/link";
import { Mic, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { VOICE_CATEGORY_LABELS } from "@/components/voices/data/voice-categories";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { api } from "@/lib/api-client";
import { VoiceVariant, VoiceCategory } from "@/generated/prisma/enums";

export interface VoiceItem {
  id: string;
  name: string;
  description: string | null;
  category: VoiceCategory | null;
  language: string | null;
  variant: VoiceVariant;
  path: string | null;
  url: string | null;
};

interface VoiceCardProps {
  voice: VoiceItem;
};

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function parseLanguage(locale: string | null) {
  if (!locale) return { flag: "🌐", region: "Unknown" };
  
  const parts = locale.split("-");
  const country = parts[1] || parts[0];
  
  if (!country) return { flag: "🌐", region: locale };

  try {
    const flag = [...country.toUpperCase()]
      .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
      .join("");

    const region = regionNames.of(country.toUpperCase()) ?? country;
    return { flag, region };
  } catch {
    return { flag: "🌐", region: locale };
  }
};

export function VoiceCard({ voice }: VoiceCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { flag, region } = parseLanguage(voice.language);

  const audioSrc = voice.url ?? "";
  const { isPlaying, isLoading, togglePlay } = useAudioPlayback(audioSrc);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/api/voices/${voice.id}`);
      toast.success("Voice deleted successfully");
      router.refresh();
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete voice");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-1 overflow-hidden rounded-xl border border-border bg-card pr-3 lg:pr-6 hover:border-primary/30 transition-all duration-300">
      <div className="relative h-24 w-20 shrink-0 lg:h-30 lg:w-24">
        <div className="absolute left-0 top-0 h-24 w-10 border-r border-border bg-secondary/50 lg:h-30 lg:w-12" />

        <div className="absolute inset-0 flex items-center justify-center">
          <VoiceAvatar
            seed={voice.id}
            name={voice.name}
            className="size-14 border-[1.5px] border-primary/50 shadow-lg lg:size-18"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 lg:gap-3">
        <div className="flex items-center gap-1.5 line-clamp-1 text-sm font-medium tracking-tight text-foreground">
          {voice.name}
          <span className="size-1 shrink-0 rounded-full bg-border" />
          <span className="text-primary text-[10px] uppercase font-mono-custom tracking-wider">
            {voice.category ? VOICE_CATEGORY_LABELS[voice.category] : "General"}
          </span>
        </div>

        <p className="line-clamp-1 text-xs text-muted-foreground">
          {voice.description || "No description provided."}
        </p>

        <p className="flex items-center gap-2 text-[10px] font-mono-custom text-muted-foreground/60 uppercase tracking-widest">
          <span className="shrink-0">{flag}</span>
          <span className="truncate">{region}</span>
        </p>
      </div>

      <div className="ml-1 flex shrink-0 items-center gap-1 lg:ml-3 lg:gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full size-8 border-border text-primary hover:bg-primary/10"
          onClick={togglePlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="size-4" />
          ) : isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full size-8 border-border text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem asChild className="focus:bg-secondary focus:text-primary">
              <Link href={`/text-to-speech?voiceId=${voice.id}`}>
                <Mic className="size-4 mr-2" />
                <span className="font-medium">Use this voice</span>
              </Link>
            </DropdownMenuItem>
            {voice.variant === "CUSTOM" && (
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash2 className="size-4 mr-2" />
                <span className="font-medium">Delete voice</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {voice.variant === "CUSTOM" && (
          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">Delete voice</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Are you sure you want to delete &quot;{voice.name}&quot;? This
                  action cannot be undone and will remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting} className="border-border bg-transparent text-muted-foreground hover:bg-secondary">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isDeleting}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};
