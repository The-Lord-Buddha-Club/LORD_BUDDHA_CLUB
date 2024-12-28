"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import Link from "next/link";

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const MotionCard = motion(Card);
  const MotionAvatar = motion(Avatar);

  return (
    <MotionCard
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden bg-gradient-to-br from-background to-background/80 border border-primary/20 shadow-lg"
    >
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <MotionAvatar
            className="h-20 w-20 border-4 border-primary/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {user.name?.[0]}
            </AvatarFallback>
          </MotionAvatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {user.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/dashboard/posts/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
        >
          {[
            { label: "Blog Posts", value: 0 },
            { label: "Projects", value: 0 },
            { label: "Contributions", value: 0 },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-4 bg-primary/5 rounded-lg"
            >
              <p className="text-3xl font-bold text-primary">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </MotionCard>
  );
}

