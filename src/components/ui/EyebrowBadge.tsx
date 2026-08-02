import type { ReactNode } from "react";

export default function EyebrowBadge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full border-white/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
      {children}
    </span>
  );
}