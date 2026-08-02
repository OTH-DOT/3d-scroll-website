"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  showArrow?: boolean;
  className?: string;
} & Omit<
  ComponentPropsWithoutRef<"a"> & ComponentPropsWithoutRef<"button">,
  "children" | "className"
>;

export default function Button({
  children,
  variant = "primary",
  href,
  showArrow,
  className,
  ...props
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300";
  const styles = {
    primary:
      "bg-zinc-950 text-white hover:bg-zinc-800 active:scale-[0.98] border border-zinc-950",
    secondary:
      "bg-white text-zinc-950 border border-zinc-200 hover:border-zinc-300 shadow-sm backdrop-blur-md active:scale-[0.98]",
  } as const;

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          weight="bold"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(base, styles[variant], className)} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      {content}
    </button>
  );
}