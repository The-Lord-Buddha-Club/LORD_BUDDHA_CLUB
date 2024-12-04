"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MissionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Mission</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert">
        <p className="text-muted-foreground">
          The Lord Buddha Club is a community-driven organization dedicated to fostering open-source development
          and collaborative learning. We believe in the power of shared knowledge and collective growth,
          working together to create impactful solutions and nurture the next generation of developers.
        </p>
      </CardContent>
    </Card>
  );
}