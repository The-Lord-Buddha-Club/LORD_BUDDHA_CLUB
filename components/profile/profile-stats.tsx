"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, GitFork, Star } from "lucide-react";

interface ProfileStats {
  posts: number;
  contributions: number;
  reputation: number;
}

interface ProfileStatsProps {
  userId: string;
}

export function ProfileStats({ userId }: ProfileStatsProps) {
  const [stats, setStats] = useState<ProfileStats>({
    posts: 0,
    contributions: 0,
    reputation: 0,
  });

  useEffect(() => {
    fetch(`/api/users/${userId}/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Failed to fetch stats:", error));
  }, [userId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>Blog Posts</span>
            </div>
            <span className="font-medium">{stats.posts}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GitFork className="h-4 w-4 text-muted-foreground" />
              <span>Contributions</span>
            </div>
            <span className="font-medium">{stats.contributions}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span>Reputation</span>
            </div>
            <span className="font-medium">{stats.reputation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}