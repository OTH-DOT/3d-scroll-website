import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-red-500/50">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(225,29,46,0.8)]" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            Stark&thinsp;Scroll
          </span>
        </div>
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Stark&thinsp;Scroll. Powered by an arc
          reactor & Next.js.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-red-400"
        >
          Return to base <ArrowUpRight className="h-4 w-4" weight="bold" />
        </a>
      </div>
    </footer>
  );
}