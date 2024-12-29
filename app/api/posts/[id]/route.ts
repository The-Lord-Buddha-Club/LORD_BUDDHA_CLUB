import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/utils";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, params.id),
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await db.query.blogPosts.findFirst({
      where: and(
        eq(blogPosts.id, params.id),
        eq(blogPosts.authorId, user.id)
      ),
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const { title, content } = await req.json();
    await db
      .update(blogPosts)
      .set({ 
        title, 
        content,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, params.id));

    return NextResponse.json({ message: "Post updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await db.query.blogPosts.findFirst({
      where: and(
        eq(blogPosts.id, params.id),
        eq(blogPosts.authorId, user.id)
      ),
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    await db.delete(blogPosts).where(eq(blogPosts.id, params.id));

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}