"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings, Shield } from "lucide-react";
import { RoleTransferDialog } from "@/components/role-transfer-dialog";
import { useState } from "react";

export function OwnerDashboard() {
  const [showTransferDialog, setShowTransferDialog] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Organization Management</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Member Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Manage organization members and their roles.
            </p>
            <Button className="w-full">Manage Members</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Transfer ownership or manage admin roles.
            </p>
            <Button 
              className="w-full"
              onClick={() => setShowTransferDialog(true)}
            >
              Transfer Role
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Organization Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Configure organization settings and policies.
            </p>
            <Button className="w-full">Settings</Button>
          </CardContent>
        </Card>
      </div>

      <RoleTransferDialog
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
        currentUserRole="owner"
      />
    </div>
  );
}