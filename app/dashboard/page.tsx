"use client";

import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/header";
import { BlogPostsList } from "@/components/dashboard/blog-posts-list";
import { ProjectsList } from "@/components/dashboard/projects-list";
import { ContributionsList } from "@/components/dashboard/contributions-list";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="w-full h-20 mb-8" />
        <Skeleton className="w-[400px] h-10 mb-6" />
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 pt-20"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div variants={fadeInUp}>
          <DashboardHeader user={session.user} />
        </motion.div>
        
        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-lg p-1">
            <TabsTrigger value="posts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Blog Posts</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Projects</TabsTrigger>
            <TabsTrigger value="contributions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Contributions</TabsTrigger>
          </TabsList>
          
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
          >
            <TabsContent value="posts">
              <BlogPostsList userId={session.user.id} />
            </TabsContent>
            
            <TabsContent value="projects">
              <ProjectsList userId={session.user.id} />
            </TabsContent>
            
            <TabsContent value="contributions">
              <ContributionsList userId={session.user.id} />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </motion.div>
  );
}

