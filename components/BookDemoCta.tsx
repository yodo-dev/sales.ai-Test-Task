import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BookDemoCta() {
  return (
    <Card className="overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 text-white shadow-2xl shadow-emerald-900/20">
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl text-white sm:text-3xl">
          Ready to triple your demo volume?
          </CardTitle>
          <CardDescription className="max-w-2xl text-base leading-7 text-emerald-50">
          See how SalesCloser AI can replace SDR overhead with a flat monthly
          subscription.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Button
            asChild
            size="lg"
            className="w-full bg-white text-emerald-800 hover:bg-emerald-50 sm:w-auto"
          >
            <a
              href="https://salescloser.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a demo with SalesCloser AI"
            >
              Book a Demo
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
