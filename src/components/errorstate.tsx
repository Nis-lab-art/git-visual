import { FrownIcon } from "lucide-react";

interface ErrorStateProps {
  message: string;
}
export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center font-[family-name:var(--font-geist-mono)]">
      <div className="relative">
        <FrownIcon className="h-24 w-24" />
      </div>
      <h2 className="mt-8 text-2xl font-semibold">Github API Says</h2>
      <p className="mt-2 text-muted-foreground max-w-sm">{message}</p>
    </div>
  );
}
