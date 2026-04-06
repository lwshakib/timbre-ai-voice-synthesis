import { VoiceCategory } from '@/generated/prisma/enums';

export const VOICE_CATEGORY_LABELS: Record<VoiceCategory, string> = {
  PREMIUM: 'Premium',
  PROFESSIONAL: 'Professional',
  CUSTOM: 'Custom',
  AUDIOBOOK: 'Audiobook',
  CONVERSATIONAL: 'Conversational',
  CUSTOMER_SERVICE: 'Customer Service',
  GENERAL: 'General',
  NARRATIVE: 'Narrative',
  CORPORATE: 'Corporate',
  CHARACTERS: 'Characters',
  VOICEOVER: 'Voiceover',
  MEDITATION: 'Meditation',
  MOTIVATIONAL: 'Motivational',
  PODCAST: 'Podcast',
  ADVERTISING: 'Advertising',
};

export const VOICE_CATEGORIES = Object.keys(VOICE_CATEGORY_LABELS) as VoiceCategory[];
