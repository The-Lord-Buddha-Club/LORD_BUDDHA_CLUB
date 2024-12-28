"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/profile-form";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProfileSecurity } from "@/components/profile/profile-security";
import { ProfileRole } from "@/components/profile/profile-role";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Profile Settings</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <ProfileForm user={session.user} />
          <ProfileRole userId={session.user.id} />
        </div>
        <div className="space-y-8">
          <ProfileStats userId={session.user.id} />
          <ProfileSecurity />
        </div>
      </div>
    </div>
  );
}