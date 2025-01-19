import { Building, Link2, MapPin, Twitter } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { GithubUser } from "../types/github";

interface UserCardProps {
  user: GithubUser;
}

export function UserCard({ user }: UserCardProps) {
  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex gap-6">
            <Avatar className="h-28 w-28">
              <AvatarImage
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
              />
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold">
                    {user.name || user.login}
                  </h2>
                  <a
                    href={user.html_url}
                    className="text-[#0079FF] hover:underline"
                  >
                    @{user.login}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  Joined {joinDate}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            {user.bio || "Profile has no bio."}
          </p>
          <Card className="">
            <CardContent className="grid grid-cols-3 gap-8 p-4 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Repos</p>
                <p className="text-xl font-bold">{user.public_repos}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-xl font-bold">{user.followers}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Following</p>
                <p className="text-xl font-bold">{user.following}</p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Links */}
          <div className="grid grid-cols-2 gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{user.location || "Not Available"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              <span>
                {user.twitter_username ? (
                  <Badge variant="secondary" className="font-normal">
                    @{user.twitter_username}
                  </Badge>
                ) : (
                  "No Twitter listed"
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              {user.blog ? (
                <a
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                >
                  {user.blog}
                </a>
              ) : (
                <span>Not Available</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <Badge variant="secondary" className="font-normal">
                @github
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
