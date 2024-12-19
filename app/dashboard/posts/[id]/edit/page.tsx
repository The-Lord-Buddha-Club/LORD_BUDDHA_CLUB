"use client";

import { PostEditor } from "@/components/dashboard/post-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/types";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch post:", error);
        setLoading(false);
      });
  }, [params.id]);

  if (status === "loading" || loading) {
    return null;
  }

  if (!session) {
    redirect("/login");
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <PostEditor userId={session.user.id} post={post} />
        </CardContent>
      </Card>
    </div>
  );
}