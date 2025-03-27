"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

// Client component that uses useSearchParams
function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setStatus("success");
        setMessage("Email verified successfully!");
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.message);
      });
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center gap-4">
      {status === "loading" ? (
        <div className="animate-pulse">Verifying your email...</div>
      ) : status === "success" ? (
        <>
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <p className="text-center">{message}</p>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </>
      ) : (
        <>
          <XCircle className="h-16 w-16 text-red-500" />
          <p className="text-center text-red-500">{message}</p>
          <Button asChild variant="outline">
            <Link href="/join">Try Again</Link>
          </Button>
        </>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function VerifyPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense fallback={
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <VerifyContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}