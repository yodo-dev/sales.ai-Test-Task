import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { calculateRoi } from "@/lib/roi";
import { RoiInputSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const input = RoiInputSchema.parse(body);

    return NextResponse.json(calculateRoi(input));
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Invalid ROI calculator input.",
          details: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Invalid JSON request body.",
        details: {},
      },
      { status: 400 },
    );
  }
}
