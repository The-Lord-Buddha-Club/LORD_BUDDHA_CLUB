"use client";

import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/dashboard/header";
import { OwnerDashboard } from "@/components/dashboard/owner-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { MemberDashboard } from "@/components/dashboard/member-dashboard";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Role } from "@/lib/auth/roles";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState<Role | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/users/${session.user.id}/role`)
        .then(res => res.json())
        .then(data => setUserRole(data.role))
        .catch(() => setUserRole("member")); // Fallback to member role on error
    }
  }, [session]);

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const dashboardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={dashboardVariants}
      className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-20"
    >
      <div className="container mx-auto px-4 py-8 space-y-8">
        <AnimatePresence mode="wait">
          {status === "authenticated" && session.user ? (
            <motion.div key="header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DashboardHeader user={session.user} />
            </motion.div>
          ) : (
            <motion.div key="header-skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="bg-primary/5 border-primary/20 overflow-hidden">
                <CardContent className="p-6 flex items-center space-x-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {userRole ? (
            <motion.div 
              key={userRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {userRole === "owner" && <OwnerDashboard />}
              {userRole === "admin" && <AdminDashboard />}
              {userRole === "member" && <MemberDashboard />}
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[1, 2, 3].map((item) => (
                <Card key={item} className="bg-card">
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

