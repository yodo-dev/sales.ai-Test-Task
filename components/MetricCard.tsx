import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

export function MetricCard({ label, value, sub, highlight }: MetricCardProps) {
  return (
    <Card
      className={
        highlight
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : undefined
      }
    >
      <CardContent className="p-4 sm:p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p
          className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${
            highlight ? "text-emerald-700" : "text-foreground"
          }`}
        >
          {value}
        </p>
        {sub ? <p className="mt-1 text-sm text-muted-foreground">{sub}</p> : null}
      </CardContent>
    </Card>
  );
}
