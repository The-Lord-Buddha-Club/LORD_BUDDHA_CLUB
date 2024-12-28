"use client";

import { SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileForm } from "@/components/profile/profile-form";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProfileSecurity } from "@/components/profile/profile-security";
import { ProfileRole } from "@/components/profile/profile-role";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, BarChartIcon as ChartBar, ShieldCheck, UserCog } from 'lucide-react';

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const neonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const borderVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>;
  }

  if (!session) {
    redirect("/login");
  }

  const handleTabChange = (value: SetStateAction<string>) => {
    setActiveTab(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 space-y-8 min-h-screen bg-gradient-to-b from-background to-background/80"
    >
      <div className="flex flex-col items-center space-y-4 mb-8">
        <Avatar className="w-24 h-24 border-4 border-primary">
          <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
          <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {session.user.name}&apos;s Profile
        </h1>
        <p className="text-muted-foreground">{session.user.email}</p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
          variants={borderVariants}
          initial="initial"
          animate="animate"
        />
        <Card className="relative w-full overflow-hidden shadow-xl">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full justify-start bg-background/95 backdrop-blur-sm p-0 h-16">
              <TabsTrigger value="profile" className="flex-1 h-full data-[state=active]:bg-muted/50 relative">
                <UserCircle className="w-5 h-5 mr-2" />
                Profile
                {activeTab === "profile" && (
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-md"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex-1 h-full data-[state=active]:bg-muted/50 relative">
                <ChartBar className="w-5 h-5 mr-2" />
                Stats
                {activeTab === "stats" && (
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-md"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1 h-full data-[state=active]:bg-muted/50 relative">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Security
                {activeTab === "security" && (
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-md"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="role" className="flex-1 h-full data-[state=active]:bg-muted/50 relative">
                <UserCog className="w-5 h-5 mr-2" />
                Role
                {activeTab === "role" && (
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-md"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
            </TabsList>
            <CardContent className="p-6 relative bg-background/95 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={neonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg filter blur-xl"
                />
              </AnimatePresence>
              <TabsContent value="profile" className="relative z-10">
                <motion.div variants={tabVariants} initial="hidden" animate="visible">
                  <ProfileForm user={session.user} />
                </motion.div>
              </TabsContent>
              <TabsContent value="stats" className="relative z-10">
                <motion.div variants={tabVariants} initial="hidden" animate="visible">
                  <ProfileStats userId={session.user.id} />
                </motion.div>
              </TabsContent>
              <TabsContent value="security" className="relative z-10">
                <motion.div variants={tabVariants} initial="hidden" animate="visible">
                  <ProfileSecurity />
                </motion.div>
              </TabsContent>
              <TabsContent value="role" className="relative z-10">
                <motion.div variants={tabVariants} initial="hidden" animate="visible">
                  <ProfileRole userId={session.user.id} />
                </motion.div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </motion.div>
  );
}

