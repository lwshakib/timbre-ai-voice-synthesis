import { TextToSpeechDetailView } from '@/components/text-to-speech/text-to-speech-detail-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text to Speech Detail | Timbre AI',
  description: 'View generated AI voice audio.',
};

export default async function TextToSpeechDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#050505]">
      <TextToSpeechDetailView generationId={id} />
    </div>
  );
}
