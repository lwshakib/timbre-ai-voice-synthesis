import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block opacity-40">
      <WavyBackground
        colors={["#d4b87a", "#c4a86a", "#828179", "#111111"]}
        backgroundFill="transparent"
        blur={2}
        speed="slow"
        waveOpacity={0.08}
        waveWidth={40}
        waveYOffset={300}
        containerClassName="h-full"
        className="hidden"
      />
    </div>
  );
}
