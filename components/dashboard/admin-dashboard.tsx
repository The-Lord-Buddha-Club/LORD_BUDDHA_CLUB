"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, GitPullRequest } from 'lucide-react';
import { RoleTransferDialog } from "@/components/role-transfer-dialog";
import { useState } from "react";

export function AdminDashboard() {
  const [showTransferDialog, setShowTransferDialog] = useState(false);

  const MotionCard = motion(Card);

  const cards = [
    {
      title: "Content Review",
      icon: FileText,
      description: "Review and manage blog posts and content.",
      action: "Review Content",
    },
    {
      title: "Project Review",
      icon: GitPullRequest,
      description: "Review project submissions and contributions.",
      action: "Review Projects",
    },
    {
      title: "Member Review",
      icon: Users,
      description: "Review member applications and activities.",
      action: "Review Members",
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
        Content Management
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {card.action}
              </Button>
            </CardContent>
          </MotionCard>
        ))}
      </div>

      <RoleTransferDialog
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
        currentUserRole="admin"
      />
    </motion.div>
  );
}

