"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard/posts/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Blog Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Projects</p>
          </div>
          <div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Contributions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}