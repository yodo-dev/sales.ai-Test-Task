import type { RoiInput, RoiResult } from "@/lib/schemas";

const AI_COST_PER_MONTH = 2000;

const usd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const buildVerdict = (input: RoiInput, result: Omit<RoiResult, "verdict">) => {
  const savingsText =
    result.monthlySavings >= 0
      ? `saves you ${usd(result.monthlySavings)} monthly`
      : `costs ${usd(Math.abs(result.monthlySavings))} more monthly`;
  const paybackText =
    result.paybackMonths === null
      ? "Payback is not available because the current team costs do not exceed the AI subscription."
      : result.paybackMonths < 1
        ? "The payback period is less than 1 month."
        : `The payback period is about ${Math.ceil(result.paybackMonths)} months.`;

  return `With ${input.numSdrs} SDRs costing ${usd(result.teamCost)}/mo, SalesCloser AI ${savingsText} while projecting ${usd(result.projectedPipeline)} in pipeline from 3x demo volume. ${paybackText}`;
};

export function calculateRoi(input: RoiInput): RoiResult {
  const teamCost = input.numSdrs * input.costPerSdr;
  const currentPipeline =
    input.demosPerMonth * (input.closeRate / 100) * input.avgDealSize;
  const projectedPipeline =
    input.demosPerMonth * 3 * (input.closeRate / 100) * input.avgDealSize;
  const monthlySavings = teamCost - AI_COST_PER_MONTH;
  const netRoiPct =
    ((projectedPipeline - AI_COST_PER_MONTH) / AI_COST_PER_MONTH) * 100;
  const paybackMonths =
    monthlySavings > 0 ? AI_COST_PER_MONTH / monthlySavings : null;
  const result = {
    teamCost,
    aiCost: AI_COST_PER_MONTH,
    currentPipeline,
    projectedPipeline,
    monthlySavings,
    netRoiPct,
    paybackMonths,
  };

  return { ...result, verdict: buildVerdict(input, result) };
}
