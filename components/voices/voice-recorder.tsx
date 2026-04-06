'use client';

import { Mic, Square, RotateCcw, X, FileAudio, Play, Pause } from 'lucide-react';

import { cn, formatFileSize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAudioPlayback } from '@/hooks/use-audio-playback';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function VoiceRecorder({
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
    isRecording,
    elapsedTime,
    audioBlob,
    containerRef,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const handleStop = () => {
    stopRecording((blob) => {
      const recordedFile = new File([blob], 'recording.wav', {
        type: 'audio/wav',
      });
      onFileChange(recordedFile);
    });
  };

  const handleReRecord = () => {
    onFileChange(null);
    resetRecording();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-500/50 bg-red-500/5 px-6 py-10">
        <p className="text-center text-sm text-red-500">{error}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetRecording}
          className="border-[#d4b87a] text-[#d4b87a] hover:bg-[#d4b87a]/10"
        >
          Try again
        </Button>
      </div>
    );
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-[#1f1f1e] bg-[#0a0a0a] p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#111111]">
          <FileAudio className="size-5 text-[#d4b87a]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[#f5f5f0]">{file.name}</p>
          <p className="text-xs text-[#828179]">
            {formatFileSize(file.size)}
            {audioBlob && elapsedTime > 0 && <>&nbsp;&middot;&nbsp;{formatTime(elapsedTime)}</>}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Play'}
          className="text-[#d4b87a] hover:bg-[#d4b87a]/10"
        >
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleReRecord}
          title="Re-record"
          className="text-[#828179] hover:text-[#f5f5f0] hover:bg-[#111111]"
        >
          <RotateCcw className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleReRecord}
          title="Remove"
          className="text-[#828179] hover:text-red-500 hover:bg-red-500/10"
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  if (isRecording) {
    return (
      <div className="flex flex-col overflow-hidden rounded-2xl border border-[#d4b87a]">
        <div ref={containerRef} className="w-full bg-[#0a0a0a]" />
        <div className="flex items-center justify-between border-t border-[#1f1f1e] bg-[#050505] p-4">
          <p className="text-[28px] font-mono-custom font-semibold leading-[1.2] tracking-tighter text-[#f5f5f0]">
            {formatTime(elapsedTime)}
          </p>
          <Button
            type="button"
            variant="destructive"
            onClick={handleStop}
            className="bg-red-500 hover:bg-red-600"
          >
            <Square className="size-3 mr-2" />
            Stop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-dashed border-[#1f1f1e] bg-[#0a0a0a] px-6 py-10 hover:border-[#d4b87a]/50 transition-all group',
        isInvalid && 'border-red-500/50'
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-[#111111] group-hover:bg-[#d4b87a]/10 transition-colors">
        <Mic className="size-5 text-[#828179] group-hover:text-[#d4b87a] transition-colors" />
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-medium tracking-tight text-[#f5f5f0]">Record your voice</p>
        <p className="text-center text-sm text-[#828179] font-mono-custom tracking-tight uppercase text-[10px]">
          [CLICK_RECORD_TO_INITIALIZE]
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={startRecording}
        className="border-[#d4b87a] text-[#d4b87a] hover:bg-[#d4b87a]/10"
      >
        <Mic className="size-3.5 mr-2" />
        Record
      </Button>
    </div>
  );
}
