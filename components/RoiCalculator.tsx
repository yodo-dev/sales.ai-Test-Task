"use client";

import { useMemo, useState } from "react";

import { BookDemoCta } from "@/components/BookDemoCta";
import { InputField } from "@/components/InputField";
import { MetricCard } from "@/components/MetricCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateRoi } from "@/lib/roi";
import type { RoiInput } from "@/lib/schemas";

const DEFAULT_INPUT: RoiInput = {
  numSdrs: 5,
  costPerSdr: 7500,
  demosPerMonth: 40,
  avgDealSize: 25000,
  closeRate: 20,
};

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

const pct = (n: number) => `${Math.round(n).toLocaleString()}%`;

const months = (n: number | null) =>
  n === null ? "N/A" : n < 1 ? "< 1 month" : `${Math.ceil(n)} months`;

export function RoiCalculator() {
  const [input, setInput] = useState<RoiInput>(DEFAULT_INPUT);
  const result = useMemo(() => calculateRoi(input), [input]);

  const updateInput = (key: keyof RoiInput) => (value: number) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  const fields = [
    {
      id: "numSdrs",
      label: "Number of SDRs",
      hint: "Current human SDR headcount",
      value: input.numSdrs,
    },
    {
      id: "costPerSdr",
      label: "Fully-loaded cost per SDR/mo",
      hint: "Salary, benefits, tools, and overhead",
      prefix: "$",
      value: input.costPerSdr,
    },
    {
      id: "demosPerMonth",
      label: "Demos booked per month",
      hint: "Whole team total",
      value: input.demosPerMonth,
    },
    {
      id: "avgDealSize",
      label: "Average deal size",
      prefix: "$",
      value: input.avgDealSize,
    },
    {
      id: "closeRate",
      label: "Close rate",
      suffix: "%",
      value: input.closeRate,
    },
  ] satisfies Array<{
    id: keyof RoiInput;
    label: string;
    hint?: string;
    prefix?: string;
    suffix?: string;
    value: number;
  }>;

  return (
    <section
      id="calculator"
      className="mx-auto flex w-full max-w-[1140px] scroll-mt-24 flex-col gap-8 border-t border-emerald-100 px-4 py-10 sm:px-6 lg:py-16"
    >
      <div className="mx-auto max-w-3xl space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          ROI Calculator
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Run the numbers for your SDR team.
        </h2>
        <p className="text-base leading-7 text-slate-600 sm:text-lg">
          Enter your current costs and conversion metrics, then compare them
          against SalesCloser AI’s flat monthly subscription.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card className="border-slate-200 shadow-xl shadow-slate-950/5">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-950">
              Enter your current SDR numbers
            </CardTitle>
            <CardDescription className="text-base">
              Adjust each input and the ROI forecast updates instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {fields.map((field) => (
              <InputField
                key={field.id}
                {...field}
                onChange={updateInput(field.id)}
              />
            ))}
          </CardContent>
        </Card>

        <div id="results" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="Current Team Cost"
              value={usd(result.teamCost)}
              sub="per month"
            />
            <MetricCard
              label="SalesCloser AI Cost"
              value={usd(result.aiCost)}
              sub="flat monthly"
              highlight
            />
            <MetricCard
              label="Current Pipeline"
              value={usd(result.currentPipeline)}
              sub="estimated monthly"
            />
            <MetricCard
              label="Projected Pipeline"
              value={usd(result.projectedPipeline)}
              sub="with 3x demo volume"
              highlight
            />
          </div>

          <Card className="overflow-hidden border-emerald-500 bg-emerald-600 text-white shadow-xl shadow-emerald-900/20">
            <CardContent className="grid gap-5 p-5 text-center sm:grid-cols-3 sm:p-6">
              <SummaryMetric label="Net ROI" value={pct(result.netRoiPct)} />
              <SummaryMetric
                label="Monthly Savings"
                value={usd(result.monthlySavings)}
              />
              <SummaryMetric
                label="Payback Period"
                value={months(result.paybackMonths)}
              />
            </CardContent>
          </Card>

          <p className="rounded-2xl border border-slate-200 bg-white p-5 text-base leading-7 text-slate-600 shadow-sm sm:p-6">
            {result.verdict}
          </p>
        </div>
      </div>

      <BookDemoCta />
    </section>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-emerald-100">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{value}</p>
    </div>
  );
}
