"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

export default function AuthPages() {
  const { data: session } = useSession();
  const router = useRouter();

  // If user is already signed in → redirect home
  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          <FaGoogle /> Continue with Google
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
        >
          <FaGithub /> Continue with GitHub
        </button>

        <button
          onClick={() => signIn("linkedin", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-blue-700 text-white hover:bg-blue-800"
        >
          <FaLinkedinIn /> Continue with LinkedIn
        </button>

        <button
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <FaFacebookF /> Continue with Facebook
        </button>
      </div>
    </div>
  );
}
