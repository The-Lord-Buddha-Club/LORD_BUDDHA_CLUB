import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const LATEST_POSTS = [
  {
    title: "Getting Started with Open Source",
    excerpt: "Learn how to contribute to open source projects...",
    date: new Date(2024, 0, 1),
  },
  {
    title: "Best Practices for Code Reviews",
    excerpt: "Essential tips for effective code reviews...",
    date: new Date(2024, 0, 15),
  },
  {
    title: "Community Guidelines",
    excerpt: "Our community values and guidelines...",
    date: new Date(2024, 1, 1),
  },
];

export function LatestBlogs() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
        <Button asChild variant="outline">
          <Link href="/blog">View All Posts</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LATEST_POSTS.map((post) => (
          <Card key={post.title}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(post.date, { addSuffix: true })}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}