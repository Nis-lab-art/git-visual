import { Book, GitForkIcon, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Repository } from "../types/github";
import React from "react";
import langColors from "@/utils/langcolours";
import { Flipper, Flipped } from "react-flip-toolkit";

interface RepositoryGridProps {
  repositories: Repository[];
}

export function RepositoryGrid({ repositories }: RepositoryGridProps) {
  const [sortBy, setSortBy] = React.useState<"stars" | "forks" | "size">(
    "stars"
  );

  // Function to format file size
  const formatSize = (size: number) => {
    if (size < 1024) return `${size} KB`;
    return `${(size / 1024).toFixed(1)} MB`;
  };

  // Sort repositories based on selected option
  const sortedRepositories = [...repositories]
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "size":
          return b.size - a.size;
        default:
          return 0;
      }
    })
    .slice(0, 6);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Top Repositories</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select
            value={sortBy}
            onValueChange={(value: "stars" | "forks" | "size") =>
              setSortBy(value)
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="forks">Forks</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Flipper
        flipKey={sortedRepositories.map((repo) => repo.id).join("")}
        spring="gentle"
      >
        {/* Ensure the grid class is here on the `ul` */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedRepositories.map((repo) => (
            <Flipped key={repo.id} flipId={repo.id.toString()}>
              <li>
                <Card className="hover:shadow-md transition-shadow w-full cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Book className="h-4 w-4 text-[#0079FF]" />
                        <CardTitle className="text-base font-semibold">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#0079FF] transition-colors"
                          >
                            {repo.name}
                          </a>
                        </CardTitle>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatSize(repo.size)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                      {repo.description || "No description provided"}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                langColors[repo.language] || "#ccc",
                            }}
                          />
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitForkIcon className="h-4 w-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            </Flipped>
          ))}
        </ul>
      </Flipper>
    </div>
  );
}
