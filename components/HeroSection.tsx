import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const highlights = [
  "3x projected demo volume",
  "$2,000 flat monthly AI cost",
  "Instant ROI preview",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22),_transparent_60%)]" />
      <div className="mx-auto grid w-full max-w-[1140px] gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-700 shadow-sm">
            <Sparkles className="size-4" aria-hidden="true" />
            Built for revenue teams replacing SDR overhead
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              See how much SalesCloser AI can add to your pipeline.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Calculate savings, projected pipeline, payback period, and net ROI
              from switching your SDR function to a flat AI subscription.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <a href="#calculator">
                Get Started
                <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
            >
              <a
                href="https://salescloser.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now
              </a>
            </Button>
          </div>

          <div className="grid gap-3 text-sm font-medium leading-5 text-slate-600 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-emerald-100 bg-white p-4 shadow-2xl shadow-emerald-900/10 sm:p-6">
          <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
            <p className="text-sm font-medium text-emerald-300">
              Default scenario
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <HeroMetric label="Current SDR cost" value="$37.5k/mo" />
              <HeroMetric label="AI subscription" value="$2k/mo" />
              <HeroMetric label="Projected pipeline" value="$600k" />
              <HeroMetric label="Net ROI" value="29,900%" />
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-sm leading-6 text-slate-200">
                Replace manual SDR overhead with always-on AI appointment
                setting, then validate the exact business case below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}
