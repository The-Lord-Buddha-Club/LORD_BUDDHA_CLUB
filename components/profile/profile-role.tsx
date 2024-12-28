"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import type { Role } from "@/lib/auth/roles";

interface ProfileRoleProps {
  userId: string;
}

export function ProfileRole({ userId }: ProfileRoleProps) {
  const [role, setRole] = useState<Role>("member"); // Initialize with default role

  useEffect(() => {
    fetch(`/api/users/${userId}/role`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch role");
        }
        return res.json();
      })
      .then((data) => {
        // Ensure that the fetched role is valid; otherwise, fallback to 'member'
        if (data.role && ["owner", "admin", "member"].includes(data.role)) {
          setRole(data.role as Role);
        } else {
          setRole("member");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch role:", error);
        setRole("member"); // Fallback to default role on error
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

  // Since 'role' is always defined, no need to check for undefined here
  const displayRole =
    role && typeof role === "string"
      ? role.charAt(0).toUpperCase() + role.slice(1)
      : "No Role Assigned";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Organization Role
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Current Role</p>
          <Badge className={getRoleBadgeColor(role)} variant="secondary">
            {displayRole}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileRole;