"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { GithubRepo } from "@/lib/github";

export function FeaturedProjects() {
  const [projects, setProjects] = useState<GithubRepo[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/The-Lord-Buddha-Club/repos', {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Sort by stars and get top 3
        const sortedProjects = data.sort((a: GithubRepo, b: GithubRepo) => 
          b.stargazers_count - a.stargazers_count
        ).slice(0, 3);
        setProjects(sortedProjects);
      })
      .catch((error) => console.error('Failed to fetch projects:', error));
  }, []);

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <Button asChild variant="outline">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{project.name}</span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {project.stargazers_count}
                  </span>
                  <span className="flex items-center">
                    <GitFork className="h-4 w-4 mr-1" />
                    {project.forks_count}
                  </span>
                </div>
              </CardTitle>
              {project.language && (
                <Badge variant="secondary">{project.language}</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground line-clamp-2">
                {project.description || "No description available"}
              </p>
              <Button asChild variant="outline" className="w-full">
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <GithubIcon className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}