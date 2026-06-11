export interface RoiResult {
  teamCost: number;
  aiCost: number;
  currentPipeline: number;
  projectedPipeline: number;
  monthlySavings: number;
  netRoiPct: number;
  paybackMonths: number | null;
  verdict: string;
}
