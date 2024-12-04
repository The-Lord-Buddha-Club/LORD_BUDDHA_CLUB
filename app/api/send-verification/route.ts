import { NextResponse } from "next/server";
import { Resend } from "resend";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { verificationTokens } from "@/lib/db/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const token = nanoid();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await db.insert(verificationTokens).values({
      identifier: email,
      token,
      expires,
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}&email=${encodeURIComponent(
      email
    )}`;

    await resend.emails.send({
      from: "TLBC <noreply@yourdomain.com>",
      to: email,
      subject: "Verify your email for The Lord Buddha Club",
      html: `
        <h2>Welcome to The Lord Buddha Club!</h2>
        <p>Click the link below to verify your email and join our community:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    return NextResponse.json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}