"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ChevronUp, ChevronDown } from 'lucide-react';
import type { Role } from "@/lib/auth/roles";

interface ProfileRoleProps {
  userId: string;
}

export function ProfileRole({ userId }: ProfileRoleProps) {
  const [role, setRole] = useState<Role>("member");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${userId}/role`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch role");
        }
        return res.json();
      })
      .then((data) => {
        if (data.role && ["owner", "admin", "member"].includes(data.role)) {
          console.log(data)
          console.log(userId)
          setRole(data.role as Role);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch role:", error);
      });
  }, [userId]);

  const getRoleBadgeColor = (role: Role) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      case "admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "member":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  const displayRole = role.charAt(0).toUpperCase() + role.slice(1);

  const roleDescriptions = {
    owner: "Full control over the organization and its members.",
    admin: "Manage users and content within the organization.",
    member: "Participate in discussions and contribute content.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-background to-background/80 border border-primary/20 shadow-lg">
        <CardHeader className="bg-primary/5 pb-6">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Shield className="h-6 w-6" />
            Organization Role
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Current Role</p>
            <Badge className={`${getRoleBadgeColor(role)} px-3 py-1 text-sm font-medium`}>
              {displayRole}
            </Badge>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-muted-foreground">
              {roleDescriptions[role]}
            </p>
          </motion.div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center text-sm text-primary hover:underline focus:outline-none"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                Show details
              </>
            )}
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
