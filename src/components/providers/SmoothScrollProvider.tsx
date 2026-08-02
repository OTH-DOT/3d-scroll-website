"use client";

import { ReactLenis } from "lenis/react";

const isSafari =
  typeof window !== "undefined" &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const options = isSafari
  ? { lerp: 0.1, syncTouch: false, wheelMultiplier: 1 }
  : { lerp: 0.1, syncTouch: false };

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactLenis root options={options}>{children}</ReactLenis>;
}