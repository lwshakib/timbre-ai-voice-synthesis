import { PageHeader } from '@/components/dashboard/page-header';
import { TextToSpeechView } from '@/components/text-to-speech/text-to-speech-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text to Speech | Timbre AI',
  description: 'Generate high-quality AI voices from text.',
};

export default async function TextToSpeechPage({
  searchParams,
}: {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}) {
  const { text, voiceId } = await searchParams;

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <PageHeader title="Text to Speech" className="lg:hidden" />
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </div>
  );
}
