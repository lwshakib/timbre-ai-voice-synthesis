'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { VoiceCreateForm } from './voice-create-form';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';
import { toast } from 'sonner';

interface VoiceCreateDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function VoiceCreateDialog({ children, open, onOpenChange }: VoiceCreateDialogProps) {
  const isMobile = useIsMobile();

  const handleError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
        <DrawerContent className="bg-card border-border">
          <DrawerHeader>
            <DrawerTitle className="text-foreground">Create custom voice</DrawerTitle>
            <DrawerDescription className="text-muted-foreground">
              Upload or record an audio sample to add a new voice to your library.
            </DrawerDescription>
          </DrawerHeader>
          <VoiceCreateForm
            scrollable
            onError={handleError}
            footer={(submit) => (
              <DrawerFooter className="pt-2">
                {submit}
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            )}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-foreground">Create custom voice</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upload or record an audio sample to add a new voice to your library.
          </DialogDescription>
        </DialogHeader>
        <VoiceCreateForm onError={handleError} />
      </DialogContent>
    </Dialog>
  );
}
