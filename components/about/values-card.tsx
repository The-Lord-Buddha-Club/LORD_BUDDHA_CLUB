"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const values = [
  {
    title: "Open Source Advocacy",
    description: "Promoting and contributing to open-source software development"
  },
  {
    title: "Collaborative Learning",
    description: "Creating an environment where developers can learn from each other"
  },
  {
    title: "Knowledge Sharing",
    description: "Actively sharing expertise and experiences within the community"
  },
  {
    title: "Community Support",
    description: "Supporting each other's growth and development journey"
  },
  {
    title: "Continuous Improvement",
    description: "Constantly evolving and adapting to new technologies"
  }
];

export function ValuesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Values</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {values.map((value) => (
            <li key={value.title} className="space-y-1">
              <h3 className="font-medium">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}