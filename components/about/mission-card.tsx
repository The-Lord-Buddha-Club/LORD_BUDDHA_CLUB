"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const missionPoints = [
  {
    title: "Open Source Development",
    description: "Fostering a community dedicated to creating impactful open-source projects"
  },
  {
    title: "Collaborative Learning",
    description: "Providing a platform for developers to learn and grow together"
  },
  {
    title: "Innovation",
    description: "Pushing the boundaries of technology through creative problem-solving"
  },
  {
    title: "Ethical Practices",
    description: "Promoting mindful and ethical approaches in software development"
  },
  {
    title: "Global Impact",
    description: "Striving to make a positive difference in the tech world and beyond"
  }
];

export function MissionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Mission</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {missionPoints.map((point) => (
            <li key={point.title} className="space-y-1">
              <h3 className="font-medium">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

