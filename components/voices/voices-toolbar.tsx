'use client';

import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';
import { Search, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { voicesSearchParams } from '@/components/voices/lib/params';
import { VoiceCreateDialog } from './voice-create-dialog';

export function VoicesToolbar() {
  const [query, setQuery] = useQueryState('query', voicesSearchParams.query);
  const [localQuery, setLocalQuery] = useState(query);

  const debouncedSetQuery = useDebouncedCallback((value: string) => setQuery(value), 300);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-foreground">
          Voice Libraries
        </h2>
        <p className="text-xs text-muted-foreground font-medium">
          Explore and organize your voice library
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <InputGroup className="lg:max-w-md border-border bg-card focus-within:border-primary/50">
            <InputGroupAddon className="text-muted-foreground">
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search for voices..."
              className="text-foreground placeholder:text-muted-foreground/50 text-xs"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                debouncedSetQuery(e.target.value);
              }}
            />
          </InputGroup>
          <div className="ml-auto hidden lg:block">
            <VoiceCreateDialog>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 h-10 rounded-xl"
              >
                <Sparkles className="size-4 mr-2" />
                Clone New Voice
              </Button>
            </VoiceCreateDialog>
          </div>
          <div className="lg:hidden">
            <VoiceCreateDialog>
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl size-8"
              >
                <Sparkles className="size-4" />
              </Button>
            </VoiceCreateDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
