"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Loader2, Search } from "lucide-react";
import { getUserDetails, getRepoDetails, getLanguageStats } from "@/api/api";
import type { GithubUser } from "../types/github";
import { UserCard } from "./usercard";
import { LanguageChart } from "./langchart";
import { RepositoryGrid } from "./repogrid";
import { UserCardSkeleton } from "./skeleton/usercard-skeleton";
import { LanguageChartSkeleton } from "./skeleton/langchart-skeleton";
import { RepositoryGridSkeleton } from "./skeleton/repogrid-skeleton";
import { EmptyState } from "./emptystate";
import Footer from "./footer";
import { ModeToggle } from "./mode-toggle";
import { RateLimitState } from "./ratelimitstate";

export default function SearchBar() {
  const [username, setUsername] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<GithubUser | null>(null);
  const [repoData, setRepoData] = React.useState<any | null>(null);
  const [lanData, setLanData] = React.useState<any | null>(null);
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await getUserDetails(username);
      const repos = await getRepoDetails(username);
      const languages = await getLanguageStats(username);
      setUserData(user);
      setRepoData(repos);
      setLanData(languages);
    } catch (err) {
      if (err instanceof Error && err.message === "Forbidden") {
        setIsRateLimited(true);
      } else {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setUsername("");
    setUserData(null);
    setRepoData(null);
    setLanData(null);
    setError(null);
    setIsRateLimited(false);
  };

  return (
    <div className="min-h-screen flex flex-col w-full max-w-[1200px] mx-auto p-4">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 justify-center items-center gap-4">
          <p
            className="font-[family-name:var(--font-geist-mono)] cursor-pointer font-bold text-xl"
            onClick={resetSearch}
          >
            GitVisual
          </p>
          <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-16 rounded-full border h-10 text-base",
                  "focus-visible:ring-2 focus-visible:ring-offset-2",
                  "transition-all duration-200"
                )}
                placeholder="Search GitHub username..."
                type="text"
              />
              <Button
                size="sm"
                type="submit"
                disabled={!username || isLoading}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 rounded-full",
                  "transition-all duration-200"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 container py-6 justify-center items-center">
        {error && <div className="text-center text-red-500 mb-6">{error}</div>}

        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserCardSkeleton />
              <LanguageChartSkeleton />
            </div>
            <RepositoryGridSkeleton />
          </div>
        ) : isRateLimited ? (
          <RateLimitState />
        ) : userData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="w-full">
                <UserCard user={userData} />
              </div>
              <div className="w-full">
                <LanguageChart data={lanData} />
              </div>
            </div>
            <RepositoryGrid repositories={repoData} />
          </div>
        ) : (
          !error && <EmptyState />
        )}
      </main>
      <Footer />
    </div>
  );
}
