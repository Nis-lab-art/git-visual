"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Loader2, Search } from "lucide-react";
import {
  getUserDetails,
  getRepoDetails,
  getLanguageStats,
  getRateLimit,
} from "@/api/api";
import type { GithubUser, ApiError } from "../types/github";
import { UserCard } from "./usercard";
import { LanguageChart } from "./langchart";
import { RepositoryGrid } from "./repogrid";
import { UserCardSkeleton } from "./skeleton/usercard-skeleton";
import { LanguageChartSkeleton } from "./skeleton/langchart-skeleton";
import { RepositoryGridSkeleton } from "./skeleton/repogrid-skeleton";
import { EmptyState } from "./emptystate";
import Footer from "./footer";
import { ModeToggle } from "./mode-toggle";
import { ErrorState } from "./errorstate";

export default function SearchBar() {
  const [username, setUsername] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<GithubUser | null>(null);
  const [repoData, setRepoData] = React.useState<any | null>(null);
  const [lanData, setLanData] = React.useState<any | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetSearch();
    setIsLoading(true);
    try {
      const limit = await getRateLimit();
      const user = await getUserDetails(username);
      const repos = await getRepoDetails(username);
      const languages = await getLanguageStats(username);
      setUserData(user);
      setRepoData(repos);
      setLanData(languages);
    } catch (err: any) {
      const error = err as ApiError;
      if (typeof err.statusCode === "number") {
        switch (err.statusCode) {
          case 403:
            setErrorMessage("Access denied: Rate limit exceeded.");
            break;
          case 404:
            setErrorMessage("User not found in Github.");
            break;
          case 500:
            setErrorMessage("Server error. Please try again later.");
            break;
          default:
            setErrorMessage(err.message || "An unexpected error occurred.");
            break;
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
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
    setErrorMessage(null);
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
        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserCardSkeleton />
              <LanguageChartSkeleton />
            </div>
            <RepositoryGridSkeleton />
          </div>
        ) : errorMessage ? (
          <ErrorState message={errorMessage} />
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
          !errorMessage && <EmptyState />
        )}
      </main>
      <Footer />
    </div>
  );
}
