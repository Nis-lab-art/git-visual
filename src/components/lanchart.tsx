import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LanguageData {
  label: string;
  value: number;
  color: string;
}

interface LanguageChartProps {
  data: LanguageData[];
}

export function LanguageChart({ data }: LanguageChartProps) {
  const chartData = data.map((item) => ({
    name: item.label,
    value: item.value,
    fill: item.color,
  }));

  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>
            <p className="text-xl">Top Language</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px] w-full flex">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="35%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={140}
                  paddingAngle={0}
                  dataKey="value"
                  nameKey="name"
                  label={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      stroke="white"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
                <Legend
                  align="right"
                  verticalAlign="middle"
                  layout="vertical"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
