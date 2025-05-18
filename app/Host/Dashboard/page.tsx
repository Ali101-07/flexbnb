"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function HostDashboard() {
  return (
    <div className="p-8">
      <SignedIn>
        <h1 className="text-3xl font-bold mb-4">Host Dashboard</h1>
        <p>Welcome to your dashboard! Here you will manage your properties, reservations, and more.</p>
        {/* Add dashboard features/components here */}
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="mb-4">You must be signed in to view the Host Dashboard.</p>
          <SignInButton />
        </div>
      </SignedOut>
    </div>
  );
} 