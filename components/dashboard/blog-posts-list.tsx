"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { BlogPost } from "@/lib/types";

interface BlogPostsListProps {
  userId: string;
}

export function BlogPostsList({ userId }: BlogPostsListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No blog posts yet.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/posts/new">Create your first post</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">{post.title}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href={`/dashboard/posts/${post.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
            <p className="line-clamp-2">{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}