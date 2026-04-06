'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useVoiceAvatar } from './use-voice-avatar';

interface VoiceAvatarProps {
  seed: string;
  name: string;
  className?: string;
}

export function VoiceAvatar({ seed, name, className }: VoiceAvatarProps) {
  const avatarUrl = useVoiceAvatar(seed);

  return (
    <Avatar className={cn('size-14 border-white shadow-xs bg-[#111111]', className)}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className="text-[10px] bg-[#111111] text-[#828179]">
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
