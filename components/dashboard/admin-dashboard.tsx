"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, GitPullRequest } from "lucide-react";
import { RoleTransferDialog } from "@/components/role-transfer-dialog";
import { useState } from "react";

export function AdminDashboard() {
  const [showTransferDialog, setShowTransferDialog] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Content Management</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Review and manage blog posts and content.
            </p>
            <Button className="w-full">Review Content</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5" />
              Project Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Review project submissions and contributions.
            </p>
            <Button className="w-full">Review Projects</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Member Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Review member applications and activities.
            </p>
            <Button className="w-full">Review Members</Button>
          </CardContent>
        </Card>
      </div>

      <RoleTransferDialog
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
        currentUserRole="admin"
      />
    </div>
  );
}