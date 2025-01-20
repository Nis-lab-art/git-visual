import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LanguageChartSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32 mt-1.5" />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px] relative">
          <Skeleton className="absolute inset-0 rounded-full" />{" "}
          {/* Pie Chart */}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-4 w-48" />
      </CardFooter>
    </Card>
  );
}
