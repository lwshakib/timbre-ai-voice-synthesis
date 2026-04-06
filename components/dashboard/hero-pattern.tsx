import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block opacity-40">
      <WavyBackground
        colors={["#d4b87a", "#a68d52", "#828179", "#333333"]}
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
