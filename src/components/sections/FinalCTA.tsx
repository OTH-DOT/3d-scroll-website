"use client";

import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section id="cta" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <AnimatedItem>
            <div className="card-surface relative overflow-hidden p-10 md:p-16">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"
                aria-hidden
              />
              <span className="glass inline-flex items-center gap-2 rounded-full border-white/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                H.Q. Connection
              </span>
              <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold tracking-tighter text-white md:text-5xl">
                Let&apos;s build your own <span className="arc-glow-text">Mark VII moment.</span>
              </h2>
              <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-zinc-400">
                A scroll-driven 3D hero that makes the first screen unignorable —
                engineered with the same frame-perfect discipline as the armor.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#" showArrow className="border-red-500/40 !bg-red-600 hover:!bg-red-500">
                  Book a build session
                </Button>
                <Button
                  variant="secondary"
                  href="#"
                  className="border-white/15 !bg-black !text-white hover:!border-red-500/40"
                >
                  View the armory
                </Button>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}