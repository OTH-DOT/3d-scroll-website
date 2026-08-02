"use client";

import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/ui/AnimatedSection";
import EyebrowBadge from "@/components/ui/EyebrowBadge";
import { Gauge, Cpu, Lightning, BatteryChargingVertical } from "@phosphor-icons/react";

const SERVICES = [
  {
    icon: Cpu,
    title: "Armor Assembly",
    body: "Frame-by-frame suit sequences scrubbed by scroll — sublayers lock on with cinematic precision, zero jank.",
  },
  {
    icon: BatteryChargingVertical,
    title: "Arc Reactor",
    body: "A clean-energy core drives every animation. Red-hot, self-sustaining and tuned to power the whole page.",
  },
  {
    icon: Gauge,
    title: "Repulsor Performance",
    body: "Physics-smooth Lenis scroll with a production build tuned to hold 60fps on desktop and mobile alike.",
  },
  {
    icon: Lightning,
    title: "Retina Flight",
    body: "DPR-aware canvases so the suit reads crisp at every scale — no blur, no lag, frame-perfect.",
  },
];

export default function CoreServices() {
  return (
    <section id="services" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <EyebrowBadge>Suit Components</EyebrowBadge>
          <h2 className="mt-4 max-w-[20ch] text-3xl font-semibold tracking-tighter text-white md:text-5xl">
            Built like Stark Industries, <span className="arc-glow-text">scroll coded</span>.
          </h2>
          <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-zinc-400">
            Every section is a working subsystem — engineered, wired and
            deployed like the real thing.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <AnimatedItem key={s.title}>
              <div className="card-surface group flex items-start gap-5 p-7 transition-transform duration-300 hover:-translate-y-1">
                <div className="pill-shadow flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-black">
                  <s.icon className="h-6 w-6 text-red-500" weight="fill" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {s.body}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}