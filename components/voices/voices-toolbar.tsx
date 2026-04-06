"use client";

import { useState } from "react";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { voicesSearchParams } from "@/components/voices/lib/params";
import { VoiceCreateDialog } from "./voice-create-dialog";

export function VoicesToolbar() {
  const [query, setQuery] = useQueryState(
    "query",
    voicesSearchParams.query
  );
  const [localQuery, setLocalQuery] = useState(query);

  const debouncedSetQuery = useDebouncedCallback(
    (value: string) => setQuery(value),
    300,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-foreground">
          Voice Libraries
        </h2>
        <p className="text-[11px] text-muted-foreground font-mono-custom tracking-[0.2em] uppercase">
          [SYS_BROWSER // DISCOVER_MODELS]
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <InputGroup className="lg:max-w-md border-border bg-card focus-within:border-primary/50">
            <InputGroupAddon className="text-muted-foreground">
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="SEARCH_MODELS..."
              className="text-foreground placeholder:text-muted-foreground/30 font-mono-custom text-xs tracking-widest uppercase"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                debouncedSetQuery(e.target.value);
              }}
            />
          </InputGroup>
          <div className="ml-auto hidden lg:block">
            <VoiceCreateDialog>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-10 rounded-full">
                <Sparkles className="size-4 mr-2" />
                Clone New Voice
              </Button>
            </VoiceCreateDialog>
          </div>
          <div className="lg:hidden">
            <VoiceCreateDialog>
              <Button size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full size-8">
                <Sparkles className="size-4" />
              </Button>
            </VoiceCreateDialog>
          </div>
        </div>
      </div>
    </div>
  );
};
