"use client";

import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/dashboard/header";
import { OwnerDashboard } from "@/components/dashboard/owner-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { MemberDashboard } from "@/components/dashboard/member-dashboard";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import type { Role } from "@/lib/auth/roles";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState<Role>("member");

  useEffect(() => {
    if (session?.user?.id) {
      // Fetch user's role
      fetch(`/api/users/${session.user.id}/role`)
        .then(res => res.json())
        .then(data => setUserRole(data.role));
    }
  }, [session]);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader user={session.user} />
      
      <div className="mt-8">
        {userRole === "owner" && <OwnerDashboard />}
        {userRole === "admin" && <AdminDashboard />}
        {userRole === "member" && <MemberDashboard />}
      </div>
    </div>
  );
}