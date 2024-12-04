"use client";

import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/header";
import { BlogPostsList } from "@/components/dashboard/blog-posts-list";
import { ProjectsList } from "@/components/dashboard/projects-list";
import { ContributionsList } from "@/components/dashboard/contributions-list";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader user={session.user} />
      
      <Tabs defaultValue="posts" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          <BlogPostsList userId={session.user.id} />
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6">
          <ProjectsList userId={session.user.id} />
        </TabsContent>
        
        <TabsContent value="contributions" className="mt-6">
          <ContributionsList userId={session.user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}