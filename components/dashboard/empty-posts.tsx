import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function EmptyPosts() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PenSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Blog Posts Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Share your thoughts and experiences with the community by creating your first blog post.
          </p>
          <Button asChild>
            <Link href="/dashboard/posts/new">
              Create Your First Post
            </Link>
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}