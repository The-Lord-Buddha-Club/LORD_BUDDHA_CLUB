"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare, GitFork, Award } from 'lucide-react';
import Link from "next/link";

export function MemberDashboard() {
  const MotionCard = motion(Card);

  const cards = [
    {
      title: "Blog Posts",
      icon: PenSquare,
      description: "Write and manage your blog posts.",
      action: "Create Post",
      href: "/dashboard/posts/new",
    },
    {
      title: "Contributions",
      icon: GitFork,
      description: "View your project contributions.",
      action: "View Projects",
      href: "/projects",
    },
    {
      title: "Achievements",
      icon: Award,
      description: "Track your community achievements.",
      action: "View Achievements",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
      >
        Your Activity
      </motion.h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <MotionCard
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="overflow-hidden bg-gradient-to-br from-background to-background/80 border border-primary/20 shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <card.icon className="h-5 w-5" />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {card.description}
              </p>
              <Button
                asChild={!!card.href}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {card.href ? (
                  <Link href={card.href}>{card.action}</Link>
                ) : (
                  card.action
                )}
              </Button>
            </CardContent>
          </MotionCard>
        ))}
      </div>
    </motion.div>
  );
}

