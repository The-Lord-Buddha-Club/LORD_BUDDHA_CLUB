"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Key } from "lucide-react";

export function ProfileSecurity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
          </div>
          <Button variant="outline">Enable</Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Access Tokens</p>
              <p className="text-sm text-muted-foreground">
                Manage your API tokens
              </p>
            </div>
          </div>
          <Button variant="outline">Manage</Button>
        </div>
      </CardContent>
    </Card>
  );
}