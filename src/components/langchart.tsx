"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface LanguageData {
  label: string;
  value: number;
  color: string;
}

interface LanguageChartProps {
  data: LanguageData[];
}

export function LanguageChart({ data }: LanguageChartProps) {
  // Transform data for Recharts
  const chartData = data.map((item) => ({
    language: item.label,
    percentage: item.value,
    fill: item.color,
  }));

  // Create config object for the chart container
  const chartConfig = data.reduce((acc, item) => {
    acc[item.label.toLowerCase()] = {
      label: item.label,
      color: item.color,
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>) satisfies ChartConfig;

  function findHighestPercentage(data: LanguageData[]) {
    const total = data.reduce((acc, item) => acc + item.value, 0);

    if (total === 0) return "No data to calculate percentages";

    const highest = data.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    );
    const percentage = ((highest.value / total) * 100).toFixed(2);
    return { label: highest.label, percentage: `${percentage}%` };
  }
  const highestPercentage = findHighestPercentage(data);
  console.log(highestPercentage);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center">
        <CardTitle>Language Distribution</CardTitle>
        <CardDescription>Most Used Languages</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="language"
              innerRadius={0}
              outerRadius={120}
              paddingAngle={2}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {typeof highestPercentage === "string"
            ? highestPercentage
            : `${highestPercentage.label} makes up ${highestPercentage.percentage}`}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Based on repository content analysis
        </div>
      </CardFooter>
    </Card>
  );
}
