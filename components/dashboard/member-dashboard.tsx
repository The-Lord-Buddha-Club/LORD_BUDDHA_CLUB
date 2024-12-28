"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare, GitFork, Award } from "lucide-react";
import Link from "next/link";

export function MemberDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Activity</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenSquare className="h-5 w-5" />
              Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Write and manage your blog posts.
            </p>
            <Button asChild className="w-full">
              <Link href="/dashboard/posts/new">Create Post</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitFork className="h-5 w-5" />
              Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View your project contributions.
            </p>
            <Button asChild className="w-full">
              <Link href="/projects">View Projects</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Track your community achievements.
            </p>
            <Button className="w-full">View Achievements</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}