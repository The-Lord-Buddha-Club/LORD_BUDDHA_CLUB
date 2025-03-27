"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ErrorDetails {
  message: string;
  description: string;
}

// Create a separate component that uses useSearchParams
function ErrorContent() {
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<ErrorDetails>({
    message: "An error occurred",
    description: "Please try again or contact support if the problem persists."
  });

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      fetch(`/api/auth/error?error=${error}`)
        .then(res => res.json())
        .then(data => {
          setErrorDetails({
            message: "Authentication Error",
            description: data.error
          });
        })
        .catch(() => {
          setErrorDetails({
            message: "Authentication Error",
            description: "An unexpected error occurred during authentication."
          });
        });
    }
  }, [searchParams]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Authentication Error</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{errorDetails.message}</AlertTitle>
          <AlertDescription>
            {errorDetails.description}
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Try Again</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Main component with Suspense boundary
export default function ErrorPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Suspense fallback={
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
}