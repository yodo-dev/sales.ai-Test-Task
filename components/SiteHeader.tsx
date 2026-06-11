import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1140px] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="SalesCloser.ai home"
        >
          <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Bot className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-slate-950">
              SalesCloser.ai
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              ROI Calculator
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex"
          aria-label="Primary navigation"
        >
          <a href="#calculator" className="transition hover:text-emerald-700">
            Calculator
          </a>
          <a href="#results" className="transition hover:text-emerald-700">
            Results
          </a>
          <a href="/api-docs" className="transition hover:text-emerald-700">
            API Docs
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden border-emerald-200 text-emerald-700 hover:bg-emerald-50 sm:inline-flex"
          >
            <a href="#calculator">Get Started</a>
          </Button>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <a
              href="https://salescloser.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
