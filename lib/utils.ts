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

    const dataView = new DataView(buffer.buffer, buffer.byteOffset, buffer.length);

    // 1. Verify RIFF and WAVE headers
    const isRiff = dataView.getUint32(0, false) === 0x52494646; // "RIFF"
    const isWave = dataView.getUint32(8, false) === 0x57415645; // "WAVE"
    if (!isRiff || !isWave) {
      console.warn('Not a standard RIFF/WAVE file, falling back to basic extraction');
      return basicExtract(buffer, numPeaks);
    }

    // 2. Find "fmt " and "data" chunks
    let fmtOffset = -1;
    let dataOffset = -1;
    let offset = 12;

    while (offset < buffer.length - 8) {
      const chunkId = dataView.getUint32(offset, false);
      const chunkSize = dataView.getUint32(offset + 4, true);

      if (chunkId === 0x666d7420) { // "fmt "
        fmtOffset = offset;
      } else if (chunkId === 0x64617461) { // "data"
        dataOffset = offset;
        break; // Found the data chunk
      }

      offset += 8 + chunkSize;
      // Prevent infinite loop on corrupt chunk sizes
      if (chunkSize <= 0) break;
    }

    if (fmtOffset === -1 || dataOffset === -1) {
      console.warn('Could not find fmt or data chunks, falling back');
      return basicExtract(buffer, numPeaks);
    }

    // 3. Read format details
    const audioFormat = dataView.getUint16(fmtOffset + 8, true);
    const numChannels = dataView.getUint16(fmtOffset + 10, true);
    const bitsPerSample = dataView.getUint16(fmtOffset + 22, true);

    const dataStart = dataOffset + 8;
    const dataSize = dataView.getUint32(dataOffset + 4, true);
    const bytesPerSample = bitsPerSample / 8;
    const totalSamples = Math.floor(dataSize / bytesPerSample);
    const numSamples = Math.floor(totalSamples / numChannels);

    const samplesPerPeak = Math.max(Math.floor(numSamples / numPeaks), 1);
    const peaks: number[] = [];

    for (let i = 0; i < numPeaks; i++) {
      let maxVal = 0;
      const start = i * samplesPerPeak;
      const end = Math.min(start + samplesPerPeak, numSamples);

      for (let j = start; j < end; j++) {
        // Read sample from the first channel (mono or left channel of stereo)
        const sampleOffset = dataStart + (j * numChannels) * bytesPerSample;
        if (sampleOffset + bytesPerSample > buffer.length) break;

        let val = 0;
        if (audioFormat === 1) { // PCM
          if (bitsPerSample === 16) {
            val = Math.abs(dataView.getInt16(sampleOffset, true)) / 32768;
          } else if (bitsPerSample === 8) {
            val = Math.abs(dataView.getUint8(sampleOffset) - 128) / 128;
          } else if (bitsPerSample === 24) {
            // Read 24-bit integer
            const b0 = dataView.getUint8(sampleOffset);
            const b1 = dataView.getUint8(sampleOffset + 1);
            const b2 = dataView.getInt8(sampleOffset + 2);
            const sVal = (b2 << 16) | (b1 << 8) | b0;
            val = Math.abs(sVal) / 8388608;
          }
        } else if (audioFormat === 3) { // IEEE Float
          if (bitsPerSample === 32) {
            val = Math.abs(dataView.getFloat32(sampleOffset, true));
          }
        }

        if (val > maxVal) {
          maxVal = val;
        }
      }
      peaks.push(parseFloat(Math.min(maxVal, 1.0).toFixed(4)));
    }

    return peaks;
  } catch (error) {
    console.error('Failed to extract WAV peaks:', error);
    return basicExtract(buffer, numPeaks);
  }
}

function basicExtract(buffer: Buffer, numPeaks: number): number[] {
  try {
    const dataView = new DataView(buffer.buffer, buffer.byteOffset + 44, buffer.length - 44);
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
  } catch {
    return Array(numPeaks).fill(0.01);
  }
}
