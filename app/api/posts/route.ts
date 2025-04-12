import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/utils";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await db.query.blogPosts.findMany({
      where: eq(blogPosts.authorId, user.id),
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Read title, content, and published status from the request body
    const { title, content, published } = await req.json();

    // Insert the new post, using the received published status (defaulting to false if undefined)
    const post = await db.insert(blogPosts).values({
      id: crypto.randomUUID(),
      title,
      content,
      authorId: user.id,
      published: published ?? false, // Use the published value from the request
    }).returning(); // Use returning() to get the inserted post data back

    // Return the first element of the returned array
    return NextResponse.json(post[0]);
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
