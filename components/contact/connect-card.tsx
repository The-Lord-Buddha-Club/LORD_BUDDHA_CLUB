"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ConnectCard() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">GitHub Organization</h3>
        <p className="text-muted-foreground">
          Follow us on GitHub to stay updated with our latest projects and contributions.
        </p>
        <Button
          variant="outline"
          className="mt-2"
          asChild
        >
          <a
            href="https://github.com/The-Lord-Buddha-Club"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit GitHub Organization
          </a>
        </Button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Community</h3>
        <p className="text-muted-foreground">
          Join our community to connect with other developers and contribute to open-source projects.
        </p>
        <Button
          variant="outline"
          className="mt-2"
          asChild
        >
          <Link href="/join">Join Our Community</Link>
        </Button>
      </div>
    </div>
  );
}