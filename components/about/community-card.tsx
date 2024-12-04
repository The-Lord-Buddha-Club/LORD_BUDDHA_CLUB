"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommunityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Our Community</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          We welcome developers of all skill levels who are passionate about open source and continuous learning.
          Join our community to collaborate on projects, share knowledge, and grow together.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <a 
              href="https://github.com/The-Lord-Buddha-Club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub Organization</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}