import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "primary" | "secondary" | "accent" | "orange";
}

export function MetricCard({ title, value, icon: Icon, trend, variant = "primary" }: MetricCardProps) {
  const variantStyles = {
    primary: "bg-gradient-assai text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    orange: "bg-accent-orange text-primary-foreground",
  };

  return (
    <Card className={cn("p-6 shadow-medium hover:shadow-strong transition-shadow", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90 mb-2">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <p className={cn("text-sm mt-2 opacity-80", trend.isPositive ? "opacity-100" : "opacity-70")}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% vs. período anterior
            </p>
          )}
        </div>
        <div className="bg-white/20 p-3 rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
