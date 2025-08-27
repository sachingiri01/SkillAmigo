"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.replace("/auth/sign-in");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      alert("Session not ready. Please sign in again.");
      return;
    }

    const res = await fetch("/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: session.user.email,
      }),
    });

    if (res.ok) {
      router.replace("/");
    } else {
      alert("Error saving user.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Complete Onboarding</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save & Continue
        </button>
      </form>
    </div>
  );
}
