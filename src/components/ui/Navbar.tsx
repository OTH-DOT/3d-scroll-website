"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const LINKS = [
  { label: "Planet", href: "#services" },
  { label: "Armory", href: "#armory" },
  { label: "R&D", href: "#rd" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-40 px-4 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <div className="glass flex h-11 items-center gap-2.5 rounded-full px-4">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-red-500/50">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_10px_2px_rgba(225,29,46,0.9)]" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            Stark&thinsp;Scroll
          </span>
        </div>

        <div
          className={`glass hidden items-center gap-1 rounded-full px-2 py-1.5 transition-opacity duration-300 md:flex ${
            scrolled ? "opacity-100" : "opacity-40"
          }`}
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <Button
          href="#cta"
          showArrow
          className="!rounded-full border-red-500/40 !bg-red-600 !px-4 !py-2.5 !text-xs hover:!bg-red-500"
        >
          Contact H.Q.
        </Button>
      </div>
    </header>
  );
}