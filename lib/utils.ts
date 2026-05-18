import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function extractWavPeaks(buffer: Buffer, numPeaks = 100): number[] {
  try {
    if (buffer.length <= 44) return Array(numPeaks).fill(0.01);

    const dataView = new DataView(
      buffer.buffer,
      buffer.byteOffset + 44,
      buffer.length - 44
    );
    const numSamples = Math.floor((buffer.length - 44) / 2);
    const samplesPerPeak = Math.floor(numSamples / numPeaks);

    const peaks: number[] = [];
    for (let i = 0; i < numPeaks; i++) {
      let maxVal = 0;
      const start = i * samplesPerPeak;
      const end = Math.min(start + samplesPerPeak, numSamples);

      for (let j = start; j < end; j++) {
        const sample = dataView.getInt16(j * 2, true);
        const absVal = Math.abs(sample);
        if (absVal > maxVal) {
          maxVal = absVal;
        }
      }
      peaks.push(parseFloat((maxVal / 32768).toFixed(4)));
    }
    return peaks;
  } catch (error) {
    console.error('Failed to extract WAV peaks:', error);
    return Array(numPeaks).fill(0.01);
  }
}
