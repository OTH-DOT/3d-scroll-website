"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const FRAME_COUNT = 120;

type Annotation = {
  id: string;
  show: number;
  hide: number;
  tag: string;
  title: string;
  body: string;
  className: string;
};

const ANNOTATIONS: Annotation[] = [
  {
    id: "card-1",
    show: 0.06,
    hide: 0.3,
    tag: "MARK I — Deploy",
    title: "Suit assembly online",
    body: "Nanotech sections lock into place as you descend. Every joint, arc reactor pulse and repulsor aligned frame by frame.",
    className: "right-[6%] top-[16%] max-w-[300px]",
  },
  {
    id: "card-2",
    show: 0.35,
    hide: 0.58,
    tag: "ARC REACTOR — 100%",
    title: "Power core engaged",
    body: "A clean-energy core drives the descent — light, resonance and red-hot output tuned to each scroll step.",
    className: "left-[6%] bottom-[18%] max-w-[280px]",
  },
  {
    id: "card-3",
    show: 0.62,
    hide: 0.84,
    tag: "RETURN TO EARTH",
    title: "Cinematic landing",
    body: "Flare, throttle, touchdown. A premium debrief captured in a buttery,	retina-sharp scroll sequence.",
    className: "right-[8%] bottom-[22%] max-w-[300px]",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const currentFrameRef = useRef(-1);
  const visibleIdsRef = useRef("");

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [visibleIds, setVisibleIds] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number | null = null;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (ctx && framesRef.current[currentFrameRef.current]) {
        drawFrame(currentFrameRef.current, ctx);
      }
    };

    const drawFrame = (index: number, c: CanvasRenderingContext2D) => {
      const img = framesRef.current[index];
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let drawW: number;
      let drawH: number;

      if (window.innerWidth > 768) {
        if (canvasRatio > imgRatio) {
          drawW = cw;
          drawH = cw / imgRatio;
        } else {
          drawH = ch;
          drawW = ch * imgRatio;
        }
      } else {
        if (canvasRatio > imgRatio) {
          drawW = cw;
          drawH = cw / imgRatio;
        } else {
          drawH = ch;
          drawW = ch * imgRatio;
        }
        drawW *= 1.3;
        drawH *= 1.3;
      }

      const drawX = (cw - drawW) / 2;
      const drawY = (ch - drawH) / 2;
      c.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      raf = requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progress * FRAME_COUNT)
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          const img = framesRef.current[frameIndex];
          if (ctx && img && img.naturalWidth) {
            drawFrame(frameIndex, ctx);
          }
        }

        if (heroTextRef.current) {
          const opacity = Math.max(0, 1 - progress / 0.08);
          heroTextRef.current.style.opacity = String(opacity);
        }

        const newVisible: string[] = [];
        for (const a of ANNOTATIONS) {
          if (progress >= a.show && progress < a.hide) newVisible.push(a.id);
        }
        const newIds = newVisible.sort().join(",");
        if (newIds !== visibleIdsRef.current) {
          visibleIdsRef.current = newIds;
          setVisibleIds(newIds);
        }
      });
    };

    const onResize = () => {
      resizeCanvas();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    resizeCanvas();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
      img.onload = () => {
        if (!alive) return;
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      imgs.push(img);
    }
    framesRef.current = imgs;
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = framesRef.current[0];
    if (!canvas || !ctx || !img || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let drawW: number;
    let drawH: number;

    if (window.innerWidth > 768) {
      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
      }
    } else {
      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
      }
      drawW *= 1.3;
      drawH *= 1.3;
    }

    ctx.drawImage(img, (cw - drawW) / 2, (ch - drawH) / 2, drawW, drawH);
    currentFrameRef.current = 0;
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      className="scroll-animation relative"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="block h-screen w-full" />

        {/* Vignette overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,rgba(0,0,0,0.72)_100%)]" />

        {/* Hero intro copy */}
        <div
          ref={heroTextRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full border-white/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_2px_rgba(225,29,46,0.8)]" />
            Mark VII · Online
          </span>

          <h1 className="mt-6 max-w-[16ch] text-4xl font-semibold leading-[1.03] tracking-tighter md:text-6xl lg:text-7xl">
            <span className="block text-white">Jarvis did the</span>
            <span className="arc-glow-text block">scroll work.</span>
          </h1>

          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-zinc-300 md:text-lg">
            A cinematic armor sequence bound to your scroll. The suit assembles,
            the arc reactor hums, and the landing is buttery-smooth — no repulsor
            lag, frame-perfect on every device.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="#services" showArrow>
              Power up the core
            </Button>
            <Button
              variant="secondary"
              className="border-white/20 !bg-white/5 !text-white backdrop-blur-sm"
            >
              Run diagnostics
            </Button>
          </div>

          <p className="mt-16 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400">
            Scroll to engage <span className="h-3 w-px animate-pulse bg-red-500" />
          </p>
        </div>

        {/* Annotation cards */}
        {ANNOTATIONS.map((a) => (
          <div
            key={a.id}
            className={`glass-dark card-surface-nested absolute z-10 flex flex-col gap-2 p-5 transition-all duration-500 md:p-6 ${
              visibleIds.includes(a.id)
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            } ${a.className}`}
          >
            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-400">
              <span className="h-px w-6 bg-red-500/70" />
              {a.tag}
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-white">
              {a.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">{a.body}</p>
          </div>
        ))}

        {/* Loading overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent border-t-white/60"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
              />
              <span className="text-[10px] font-bold tracking-widest text-white">
                {Math.round(loadProgress * 100)}%
              </span>
            </div>
            <div className="h-1 w-56 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-[width] duration-150"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400">
              Arc reactor charging
            </p>
          </div>
        )}
      </div>
    </section>
  );
}