"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import type { Role } from "@/lib/auth/roles";

interface RoleTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUserRole: Role;
  onTransferComplete?: () => void;
}

export function RoleTransferDialog({
  open,
  onOpenChange,
  currentUserRole,
  onTransferComplete,
}: RoleTransferDialogProps) {
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTransfer = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      const response = await fetch("/api/roles/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId: selectedUser,
          role: currentUserRole,
        }),
      });

      if (!response.ok) throw new Error("Failed to transfer role");

      toast({
        title: "Success",
        description: "Role transfer request sent successfully",
      });

      onTransferComplete?.();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to transfer role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer {currentUserRole} Role</DialogTitle>
          <DialogDescription>
            Select a member to transfer your {currentUserRole} role to.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Member</label>
            <Select
              value={selectedUser}
              onValueChange={setSelectedUser}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {/* We'll fetch and map users here */}
                <SelectItem value="user1">John Doe</SelectItem>
                <SelectItem value="user2">Jane Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={!selectedUser || loading}
            >
              {loading ? "Transferring..." : "Transfer Role"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}