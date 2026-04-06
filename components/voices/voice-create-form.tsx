"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import {
  AudioLines,
  FolderOpen,
  X,
  FileAudio,
  Play,
  Pause,
  Check,
  ChevronsUpDown,
  Globe,
  Layers,
  AlignLeft,
  Upload,
  Mic,
  Tag,
} from "lucide-react";
import locales from "locale-codes";

import { cn, formatFileSize } from "@/lib/utils";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError } from "@/components/ui/field";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  VOICE_CATEGORIES,
  VOICE_CATEGORY_LABELS,
} from "@/components/voices/data/voice-categories";
import { VoiceRecorder } from "./voice-recorder";

const LANGUAGE_OPTIONS = locales.all
  .filter((l) => l.tag && l.tag.includes("-") && l.name)
  .map((l) => ({
    value: l.tag,
    label: l.location ? `${l.name} (${l.location})` : l.name,
  }));

const voiceCreateFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  file: z
    .instanceof(File, { message: "An audio file is required" })
    .nullable()
    .refine((f) => f !== null, "An audio file is required"),
  category: z.string().min(1, "A category is required"),
  language: z.string().min(1, "A language is required"),
  description: z.string(),
});

function FileDropzone({
  file,
  onFileChange,
  isInvalid,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  isInvalid?: boolean;
}) {
  const { isPlaying, togglePlay } = useAudioPlayback(file);

  const {
    getRootProps, getInputProps, isDragActive, isDragReject
  } = useDropzone({
    accept: { "audio/*": [] },
    maxSize: 20 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]);
      }
    },
  });

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
          <FileAudio className="size-5 text-primary" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="text-primary hover:bg-primary/10"
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onFileChange(null)}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-dashed border-border bg-card px-6 py-10 transition-all hover:border-primary/50 group",
        isDragReject || isInvalid
          ? "border-destructive/50"
          : isDragActive
            ? "border-primary"
            : "",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex size-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
        <AudioLines className="size-5 text-muted-foreground group-hover:text-primary" />
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-medium tracking-tight text-foreground">
          Upload your audio file
        </p>

        <p className="text-center text-[10px] text-muted-foreground font-mono-custom uppercase tracking-wider">
          Supports all audio formats, max size 20MB
        </p>
      </div>

       <Button type="button" variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
          <FolderOpen className="size-3.5 mr-2" />
          Upload file
        </Button>
    </div>
  )
};

function LanguageCombobox({
  value,
  onChange,
  isInvalid,
}: {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    LANGUAGE_OPTIONS.find((l) => l.value === value)?.label ?? "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={isInvalid}
          className={cn(
            "h-10 w-full justify-between font-normal border-border bg-card text-foreground hover:bg-secondary hover:border-primary/50 px-4",
            !value && "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <Globe className="size-4 shrink-0 text-muted-foreground" />
            {value ? selectedLabel : "Select language..."}
          </div>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-card border-border">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search language..." className="text-foreground" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">No language found.</CommandEmpty>
            <CommandGroup>
              {LANGUAGE_OPTIONS.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.label}
                  onSelect={() => {
                    onChange(lang.value);
                    setOpen(false);
                  }}
                  className="text-foreground aria-selected:bg-primary/10 aria-selected:text-primary"
                >
                  {lang.label}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      value === lang.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface VoiceCreateFormProps {
  scrollable?: boolean;
  footer?: (submit: React.ReactNode) => React.ReactNode;
  onError?: (message: string) => void;
};

export function VoiceCreateForm({
  scrollable,
  footer,
  onError,
}: VoiceCreateFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      file: null as File | null,
      category: "GENERAL" as string,
      language: "en-US",
      description: "",
    },
    validators: {
      onSubmit: voiceCreateFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const params = new URLSearchParams({
          name: value.name,
          category: value.category,
          language: value.language,
        });

        if (value.description) {
          params.set("description", value.description);
        }

        const response = await fetch(`/api/voices?${params.toString()}`, {
          method: "POST",
          headers: { "Content-Type": value.file!.type },
          body: value.file!,
        });

        if (!response.ok) {
          const body = await response.json();
          throw new Error(body.error ?? "Failed to create voice");
        }

        toast.success("Voice created successfully!");
        router.refresh();
        form.reset();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to create voice";
        
        if (onError) {
          onError(message);
        } else {
          toast.error(message);
        }
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn(
        "flex flex-col", 
        scrollable ? "min-h-0 flex-1" : "gap-6"
      )}
    >
      <div
        className={cn(
          scrollable
            ? "no-scrollbar flex flex-col gap-6 overflow-y-auto px-4"
            : "flex flex-col gap-6",
        )}
      >
        <form.Field name="file">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="h-11 w-full bg-card border border-border p-1">
                    <TabsTrigger value="upload" className="flex-1 data-[state=active]:bg-secondary data-[state=active]:text-primary">
                      <Upload className="size-3.5 mr-2" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="record" className="flex-1 data-[state=active]:bg-secondary data-[state=active]:text-primary">
                      <Mic className="size-3.5 mr-2" />
                      Record
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-4">
                    <FileDropzone
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInvalid}
                    />
                  </TabsContent>
                  <TabsContent value="record" className="mt-4">
                    <VoiceRecorder
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInvalid}
                    />
                  </TabsContent>
                </Tabs>
                {isInvalid 
                  && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-0 flex h-full w-10 items-center justify-center">
                    <Tag className="size-4 text-muted-foreground" />
                  </div>
                  <Input
                    id={field.name}
                    placeholder="Voice Label"
                    aria-invalid={isInvalid}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="pl-10 h-10 bg-card border-border text-foreground focus-visible:ring-primary/50 placeholder:text-muted-foreground/50"
                  />

                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="category">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-0 flex h-full w-10 items-center justify-center">
                    <Layers className="size-4 text-muted-foreground" />
                  </div>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger className="w-full pl-10 h-10 bg-card border-border text-foreground focus:ring-primary/50">
                      <SelectValue 
                        placeholder="Select category..."
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {VOICE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-foreground focus:bg-primary/10 focus:text-primary">
                          {VOICE_CATEGORY_LABELS[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="language">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <LanguageCombobox
                  value={field.state.value}
                  onChange={field.handleChange}
                  isInvalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-0 flex h-full w-10 items-center justify-center pt-3">
                    <AlignLeft className="size-4 text-muted-foreground" />
                  </div>
                  <Textarea
                    id={field.name}
                    placeholder="Describe this voice..."
                    aria-invalid={isInvalid}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="min-h-[100px] pl-10 bg-card border-border text-foreground focus-visible:ring-primary/50 placeholder:text-muted-foreground/50"
                    rows={3}
                  />

                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(s) => ({
            isSubmitting: s.isSubmitting,
          })}
      >
        {({ isSubmitting }) => {
          const submitButton = (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
            >
              {isSubmitting ? "Creating..." : "Create Voice"}
            </Button>
          );

          return footer ? footer(submitButton) : submitButton;
        }}
      </form.Subscribe>
      </div>
    </form>
  )
};
