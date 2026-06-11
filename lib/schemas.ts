import { z } from "zod";

import type { RoiResult } from "@/types/roi";

export const RoiInputSchema = z.object({
  numSdrs: z.number().int().min(1),
  costPerSdr: z.number().min(0),
  demosPerMonth: z.number().int().min(1),
  avgDealSize: z.number().min(0),
  closeRate: z.number().min(1).max(100),
});

export type RoiInput = z.infer<typeof RoiInputSchema>;
export type { RoiResult };
