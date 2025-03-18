import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/utils";
import { can } from "@/lib/auth/roles";
import { eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = await db.query.users.findFirst({
      where: eq(user.id, user.id),
      columns: { role: true },
    });

    if (!userRole || !can(user.role, "edit", "events")) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const data = await req.json();
    await db
      .update(events)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(events.id, params.id));

    return NextResponse.json({ message: "Event updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = await db.query.users.findFirst({
      where: eq(user.id, user.id),
      columns: { role: true },
    });

    if (!userRole || !can(user.role, "delete", "events")) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    await db.delete(events).where(eq(events.id, params.id));

    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}