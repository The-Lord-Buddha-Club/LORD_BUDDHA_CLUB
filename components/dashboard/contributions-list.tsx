"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitCommit, GitPullRequest, GitMerge } from "lucide-react";

interface Contribution {
  id: string;
  type: "commit" | "pr" | "merge";
  title: string;
  description: string;
  date: string;
  url: string;
}

interface ContributionsListProps {
  userId: string;
}

export function ContributionsList({ userId }: ContributionsListProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}/contributions`)
      .then((res) => res.json())
      .then((data) => {
        setContributions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch contributions:", error);
        setLoading(false);
      });
  }, [userId]);

  const getIcon = (type: Contribution["type"]) => {
    switch (type) {
      case "commit":
        return <GitCommit className="h-4 w-4" />;
      case "pr":
        return <GitPullRequest className="h-4 w-4" />;
      case "merge":
        return <GitMerge className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (contributions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No contributions yet.</p>
          <Button asChild className="mt-4">
            <a
              href="https://github.com/The-Lord-Buddha-Club"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Contributing
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {contributions.map((contribution) => (
        <Card key={contribution.id}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              {getIcon(contribution.type)}
              <span>{contribution.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {contribution.description}
            </p>
            <Button variant="link" asChild className="p-0">
              <a
                href={contribution.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}