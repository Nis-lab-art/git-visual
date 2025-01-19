import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex gap-6">
            <Skeleton className="h-28 w-28 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-4 w-3/4" />

          <Card>
            <CardContent className="grid grid-cols-3 gap-8 p-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
