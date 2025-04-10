import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { roleTransfers, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/utils";
import { can } from "@/lib/auth/roles";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toUserId, role } = await req.json();

    // Get current user's role
    const fromUser = await db.query.users.findFirst({
      where: eq(users.id, currentUser.id),
    });

    if (!fromUser || fromUser.role === null || !can(fromUser.role, 'transfer', role)) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Create transfer request
    await db.insert(roleTransfers).values({
      id: crypto.randomUUID(),
      fromUserId: currentUser.id,
      toUserId,
      role,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: "Transfer request created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error creating transfer request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}