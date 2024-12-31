import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/utils";
import { can, Role } from "@/lib/auth/roles";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const events = await db.query.events.findMany({
      orderBy: (events, { desc }) => [desc(events.startDate)],
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      columns: { role: true },
    });

    if (!userRole?.role || !can(userRole.role as Role, "create", "events")) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const data = await req.json();
    const event = await db.insert(events).values({
      ...data,
      id: crypto.randomUUID(),
      createdById: user.id,
      status: new Date(data.startDate) > new Date() ? "upcoming" : "past",
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}