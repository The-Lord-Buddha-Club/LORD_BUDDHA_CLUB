"use client";

import { PostEditor } from "@/components/dashboard/post-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 pt-20">
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <PostEditor userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  </div>

  );
}