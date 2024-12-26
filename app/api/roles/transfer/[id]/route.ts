import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { roleTransfers, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/utils";
import { eq, and } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await req.json();
    if (!['accept', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    const transfer = await db.query.roleTransfers.findFirst({
      where: and(
        eq(roleTransfers.id, params.id),
        eq(roleTransfers.toUserId, currentUser.id),
        eq(roleTransfers.status, 'pending')
      ),
    });

    if (!transfer) {
      return NextResponse.json(
        { error: "Transfer request not found" },
        { status: 404 }
      );
    }

    if (action === 'accept') {
      // Update roles in a transaction
      await db.transaction(async (tx) => {
        // Update the recipient's role
        await tx
          .update(users)
          .set({ role: transfer.role })
          .where(eq(users.id, transfer.toUserId));

        // If transferring ownership, update the previous owner's role
        if (transfer.role === 'owner') {
          await tx
            .update(users)
            .set({ role: 'admin' })
            .where(eq(users.id, transfer.fromUserId));
        }

        // Update transfer status
        await tx
          .update(roleTransfers)
          .set({ status: 'accepted', updatedAt: new Date() })
          .where(eq(roleTransfers.id, transfer.id));
      });
    } else {
      // Reject the transfer
      await db
        .update(roleTransfers)
        .set({ status: 'rejected', updatedAt: new Date() })
        .where(eq(roleTransfers.id, transfer.id));
    }

    return NextResponse.json({
      message: `Transfer ${action === 'accept' ? 'accepted' : 'rejected'}`
    });
  } catch (error) {
    console.error("Role transfer action error:", error);
    return NextResponse.json(
      { error: "Failed to process transfer request" },
      { status: 500 }
    );
  }
}