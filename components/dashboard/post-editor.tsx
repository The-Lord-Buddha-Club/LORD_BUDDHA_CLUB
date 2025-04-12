"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image"; // Import the Image extension
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { EditorToolbar } from "@/components/dashboard/editor-toolbar";
import { ShareDialog } from "@/components/dashboard/share-dialog";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Share, X } from 'lucide-react';

interface PostEditorProps {
  userId: string;
  post?: BlogPost;
}

export function PostEditor({ userId, post }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image, // Add the Image extension here
    ],
    content: post?.content || "",
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none min-h-[300px] focus:outline-none p-4",
      },
    },
  });

  const handleSave = async () => {
    if (!editor || !title.trim()) return;

    setSaving(true);
    const content = editor.getHTML();
    const method = post ? "PUT" : "POST";
    const url = post ? `/api/posts/${post.id}` : "/api/posts";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          authorId: userId,
          // Explicitly set published status when creating a new post
          published: !post ? true : undefined, // Send true if it's a new post (POST), otherwise let PUT handle it (or default)
        }),
      });

      if (!response.ok) throw new Error("Failed to save post");

      toast({
        title: "Success",
        description: `Post ${post ? "updated" : "created"} successfully!`,
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto mb-8">
      <Card className="w-full bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Write your story</CardTitle>
          <p className="text-muted-foreground">
            Share your experiences, insights, and knowledge with the community
          </p>
        </CardHeader>
      </Card>

      <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-muted/50 p-4">
          <Label htmlFor="title" className="text-lg font-semibold mb-2 block">Post Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an engaging title for your post..."
            className="text-xl font-bold bg-background/50 backdrop-blur-sm"
          />
        </CardHeader>
        <CardContent className="p-0">
          <EditorToolbar editor={editor} />
          <div className="border-t">
            <EditorContent editor={editor} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between bg-muted/50 p-4">
          <div className="space-x-2">
            <Button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">
                {saving ? "Saving..." : post ? "Update Post" : "Publish Post"}
              </span>
              {saving ? (
                <Loader2 className="animate-spin ml-2 h-4 w-4 inline" />
              ) : (
                <Save className="ml-2 h-4 w-4 inline" />
              )}
              <span className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">Cancel</span>
              <X className="ml-2 h-4 w-4 inline" />
              <span className="absolute inset-0 bg-destructive/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </Button>
          </div>
          {post && (
            <Button
              variant="outline"
              onClick={() => setShowShareDialog(true)}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">Share Post</span>
              <Share className="ml-2 h-4 w-4 inline" />
              <span className="absolute inset-0 bg-secondary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        postId={post?.id}
        title={title}
      />
    </div>
  );
}
