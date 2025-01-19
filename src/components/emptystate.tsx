import { Github } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative">
        <Github className="h-24 w-24 relative" />
      </div>
      <h2 className="mt-8 text-2xl font-semibold">Welcome to GitVisual</h2>
      <p className="mt-2 text-muted-foreground font-[family-name:var(--font-geist-mono)]">
        Visualize user profile, repositories, and code statistics
      </p>
    </div>
  );
}
