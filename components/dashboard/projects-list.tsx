"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectsListProps {
  userId: string;
}

export function ProjectsList({ userId }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No projects yet.</p>
          <Button asChild className="mt-4">
            <a
              href="https://github.com/The-Lord-Buddha-Club"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View Organization Projects
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{project.name}</span>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}