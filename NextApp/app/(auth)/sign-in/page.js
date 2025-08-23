'use client'
import React, { useState, useEffect } from 'react';
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import GradientOrb from '@/app/_components/gradientBack';
import FloatingElement from '@/app/_components/floatingElement';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const AuthPages = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if already signed in
  useEffect(() => {
    if (session?.user) {
      console.log("✅ Already signed in:", session.user);
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background Orbs */}
      

      {/* Auth Card */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className={`text-center mb-2 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg">
                  <img src="/finlogo.svg" alt="Logo" className="w-6 h-6"/>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                FinFriend
              </span>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 border border-slate-200/50 group-hover:border-slate-300/50 transition-all duration-500 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-cyan-50/30 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-3xl"></div>
                
                <div className="relative z-10">
                  {/* Form Title */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome</h1>
                    <p className="text-slate-600">Join thousands of finance enthusiasts</p>
                  </div>

                  {/* Provider Buttons */}
                  <div className="space-y-4 w-full max-w-sm mx-auto">
                    <button
                      onClick={() => signIn("google", { callbackUrl: "/" })}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:scale-[1.02] active:scale-95"
                    >
                      <FaGoogle /> Continue with Google
                    </button>

                    <button
                      onClick={() => signIn("github", { callbackUrl: "/" })}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg hover:scale-[1.02] active:scale-95"
                    >
                      <FaGithub /> Continue with GitHub
                    </button>

                    <button
                      onClick={() => signIn("linkedin", { callbackUrl: "/" })}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-blue-700 to-cyan-700 text-white shadow-lg hover:scale-[1.02] active:scale-95"
                    >
                      <FaLinkedinIn /> Continue with LinkedIn
                    </button>

                    <button
                      onClick={() => signIn("facebook", { callbackUrl: "/" })}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:scale-[1.02] active:scale-95"
                    >
                      <FaFacebookF /> Continue with Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
