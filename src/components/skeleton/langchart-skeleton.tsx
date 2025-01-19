import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LanguageChartSkeleton() {
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="h-[300px] w-full flex gap-8">
            <div className="w-2/3 relative">
              <Skeleton className="absolute inset-0 rounded-full" />
            </div>
            <div className="w-1/3 space-y-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-5" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
