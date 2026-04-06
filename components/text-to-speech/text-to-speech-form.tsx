'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { createContext, useContext, ReactNode } from 'react';
import { api } from '@/lib/api-client';

const ttsFormSchema = z.object({
  text: z.string().min(1, 'Please enter some text'),
  voiceId: z.string().min(1, 'Please select a voice'),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

export type TTSFormValues = z.infer<typeof ttsFormSchema>;

export const defaultTTSValues: TTSFormValues = {
  text: '',
  voiceId: '',
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
  repetitionPenalty: 1.2,
};

// Simplified form context for internal components
// Using any here as TanStack FormApi has 11+ required generic arguments
// which make manual typing extremely brittle.
const TTSFormContext = createContext<any>(null);

export const useTTSForm = () => {
  const context = useContext(TTSFormContext);
  if (!context) throw new Error('useTTSForm must be used within TextToSpeechForm');
  return context;
};

export function TextToSpeechForm({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues?: Partial<TTSFormValues>;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: { ...defaultTTSValues, ...defaultValues },
    validators: {
      onChange: ttsFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await api.post<{ id: string }>('/api/tts', {
          text: value.text.trim(),
          voiceId: value.voiceId,
          temperature: value.temperature,
          topP: value.topP,
          topK: value.topK,
          repetitionPenalty: value.repetitionPenalty,
        });

        toast.success('Audio generated successfully!');
        router.push(`/text-to-speech/${response.id}`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to generate audio');
      }
    },
  });

  return (
    <TTSFormContext.Provider value={form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="h-full"
      >
        {children}
      </form>
    </TTSFormContext.Provider>
  );
}
