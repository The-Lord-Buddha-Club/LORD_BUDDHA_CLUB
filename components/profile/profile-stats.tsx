"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, GitFork, Star } from 'lucide-react';

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

  const statItems = [
    { icon: FileText, label: "Blog Posts", value: stats.posts },
    { icon: GitFork, label: "Contributions", value: stats.contributions },
    { icon: Star, label: "Reputation", value: stats.reputation },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-background to-background/80 border border-primary/20 shadow-lg">
        <CardHeader className="bg-primary/5 pb-6">
          <CardTitle className="text-2xl font-bold text-primary">Activity Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            {statItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-medium text-primary">{item.label}</span>
                </div>
                <span className="text-2xl font-bold text-primary">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

