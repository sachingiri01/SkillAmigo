


"use client";
import { Facebook, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { cn } from "../../lib/utils";
import Image from "next/image";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";


interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface FullwidthIconNavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}




const AnimatedLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <svg
          width="35"
          height="35"
          viewBox="0 0 35 35"
          style={{ color: '#bbd3d0' }}
          className="animate-pulse"
        >
          {/* Outer circle with rotating gradient */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 4"
            className="animate-spin"
            style={{ animationDuration: '5s' }}
          />

          {/* Inner connecting nodes */}
          <g className="animate-pulse" style={{ animationDelay: '0.5s', color: '#e1ecea' }}>
            <circle cx="10" cy="10" r="2" fill="currentColor" opacity="1" />
            <circle cx="22" cy="10" r="2" fill="currentColor" opacity="1" />
            <circle cx="16" cy="22" r="2" fill="currentColor" opacity="1" />
            <circle cx="16" cy="16" r="3" fill="currentColor" />
          </g>

          {/* Connecting lines */}
          <g stroke="#f3f8f8" strokeWidth="1.5" opacity="0.9" className="animate-pulse" style={{ animationDelay: '0.5s' }}>
            <line x1="12" y1="12" x2="14" y2="14" />
            <line x1="20" y1="12" x2="18" y2="14" />
            <line x1="16" y1="19" x2="16" y2="18" />
          </g>
        </svg>

        {/* Floating skill icons */}
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: '#f3f8f8',
            animationDelay: '0.5s',
            animationDuration: '2s'
          }}
        />
        <div
          className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-bounce"
          style={{
            backgroundColor: '#e1ecea',
            animationDelay: '1s',
            animationDuration: '2.5s'
          }}
        />
      </div>
    </div>
  );
};

const FullwidthIconNavbar = ({
  menu = [
    { title: "Find Skills", url: "/skills" },
    { title: "Offer Skills", url: "/dashboard" },
    { title: "How It Works", url: "/how-works" },
    { title: "About Us", url: "/about" },
    { title: "Ai-Agent", url: "/ai-agent" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
}: FullwidthIconNavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { data: session } = useSession();

  return (
    <section
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-jet-stream-975/95 backdrop-blur-lg border-b border-jet-stream-400/30 shadow-lg shadow-black/20"
          : "bg-jet-stream-975/80 backdrop-blur-md border-b border-jet-stream-400/20"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex justify-between items-center py-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-1 group transition-transform duration-200 hover:scale-105"
          >
            <Image
  src="/skill_logo.svg"
  alt="Logo"
  width={45}
  height={45}
  className="w-12 h-12"
/>
            <span className="text-xl font-display font-semibold tracking-tight text-jet-stream-100 group-hover:text-saffron transition-colors duration-200">
              SkillAmigo
            </span>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-8 xl:gap-10">
            {menu.map((item, index) => (
              <a
                key={item.title}
                href={item.url}
                className="relative text-sm font-medium text-white hover:text-saffron transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(230,126,34,0.6)]"></span>
              </a>
            ))}



          </div>




          {/* Auth Buttons */}
          {/* <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              onClick={() => {
                if (!session) {
                  signIn("google", { callbackUrl: "/" });
                } else {
                  signOut({ callbackUrl: "/" });
                }
              }}
              className="bg-transparent border-jet-stream-400/40 text-white hover:bg-saffron hover:border-saffron hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(230,126,34,0.4)] transition-all duration-300"
            >
              <a className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="hidden xl:inline">
                  {session ? "Logout" : "Login with Google"}
                </span>
                <span className="xl:hidden">{session ? "Logout" : "Google"}</span>
              </a>
            </Button>
            <div>
              <div className="flex items-center gap-2">
            
            <span className="text-sm font-medium">{session && session.user?.name}</span>
            {session &&( <img
              
              src={session && session.user?.image ? session.user.image : "/default-avatar.png"}
              alt="Profile"
              className="w-8 h-8 rounded-full border"
            />)}
            </div>


            </div>
          </div> */}
          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {session ? (
              <>
                {/* Profile Picture */}
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />

                {/* User Name */}
                <span className="text-sm font-medium text-white">
                  {session.user?.name}
                </span>

                {/* Coin + Balance */}
                <div className="flex items-center gap-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 64 64"
                    className="animate-spin-slow"
                  >
                    {/* Outer bright coin ring */}
                    <circle cx="32" cy="32" r="20" fill="#FFEB3B" />
                    {/* Inner ring for depth */}
                    <circle cx="32" cy="32" r="16" fill="#FBC02D" />
                    {/* Even smaller inner circle for layering */}
                    <circle cx="32" cy="32" r="16" fill="#FFF176" />

                    {/* Rupee symbol */}
                    <text
                      x="32"
                      y="42"
                      textAnchor="middle"
                      fontSize="26"
                      fontWeight="bold"
                      fill="#F57F17"
                      fontFamily="Arial, sans-serif"
                      stroke="#F57F17"
                      strokeWidth="0.5"
                      paintOrder="stroke"
                    >
                      ₹
                    </text>
                  </svg>
                  <span className="font-semibold text-yellow-700 text-lg">{session.user?.balance ?? 0}</span>
                </div>



                {/* Logout Button */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-transparent border-jet-stream-400/40 text-white hover:bg-saffron hover:border-saffron hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(230,126,34,0.4)] transition-all duration-300"
                >
                  <a className="flex items-center gap-2">
                    Logout
                  </a>
                </Button>
              </>
            ) : (
              // Login Button when no session
              <Button
                asChild
                variant="outline"
                size="sm"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="bg-transparent border-jet-stream-400/40 text-white hover:bg-saffron hover:border-saffron hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(230,126,34,0.4)] transition-all duration-300"
              >
                <a className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12"
                    viewBox="0 0 24 24"
                  >
                    <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                    {/* Google icon paths */}
                  </svg>
                  <span className="hidden xl:inline">Login with Google</span>
                  <span className="xl:hidden">Google</span>
                </a>
              </Button>
            )}
          </div>

        </nav>

        {/* Tablet Menu */}
        <div className="hidden md:flex lg:hidden justify-between items-center py-4">
          <a
            href="/"
            className="flex items-center gap-1 group transition-transform duration-200 hover:scale-105"
          >
            <Image
  src="/skill_logo.svg"
  alt="Logo"
  width={45}
  height={45}
  className="w-12 h-12"
/>
            <span className="text-xl font-display font-semibold tracking-tight text-jet-stream-100 group-hover:text-saffron transition-colors duration-200">
              SkillAmigo
            </span>
          </a>

          <div className="flex items-center gap-6">
            {menu.slice(0, 2).map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="relative text-sm font-medium text-white hover:text-saffron transition-all duration-300 group"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-jet-stream-400/40 text-white hover:bg-jet-stream-400/20 hover:border-saffron/50 hover:text-saffron transition-all duration-200"
              >
                {isOpen ? (
                  <X className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <Menu className="w-4 h-4 transition-transform duration-200" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-jet-stream-975/98 backdrop-blur-lg border-jet-stream-400/30 w-80 flex flex-col">
              <SheetHeader className="border-b border-jet-stream-400/20 pb-4 mb-6">
                <SheetTitle className="flex justify-center">
                  <a href="/" className="flex items-center gap-1 group">
                    <Image
  src="/skill_logo.svg"
  alt="Logo"
  width={45}
  height={45}
  className="w-12 h-12"
/>
                    <span className="text-xl font-display font-semibold tracking-tight text-jet-stream-100 group-hover:text-saffron transition-colors duration-200">
                      SkillAmigo
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col flex-1 justify-between">
                <div className="flex flex-col gap-6">
                  {menu.map((item, index) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className="text-center text-base font-medium text-white hover:text-saffron transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(230,126,34,0.6)] py-3 px-4 rounded-lg hover:bg-jet-stream-900/30"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pt-6 border-t border-jet-stream-400/20">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"

                    className="w-full bg-transparent border-jet-stream-400/40 text-white hover:bg-saffron hover:border-saffron hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    <a href="/sign-in" className="flex items-center gap-3 justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Login with Google
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-saffron hover:bg-saffron/90 text-white hover:scale-105 hover:shadow-[0_0_25px_rgba(230,126,34,0.6)] transition-all duration-300"
                  >
                    <a href="/auth/facebook" className="flex items-center gap-3 justify-center">
                      <Facebook className="w-5 h-5" />
                      Login with Facebook
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center justify-between py-3">
          <a
            href="/"
            className="flex items-center gap-1 group transition-transform duration-200 hover:scale-105"
          >
            <Image
  src="/skill_logo.svg"
  alt="Logo"
  width={45}
  height={45}
  className="w-12 h-12"
/> 
            <span className="text-lg font-display font-semibold tracking-tight text-jet-stream-100 group-hover:text-saffron transition-colors duration-200">
              SkillAmigo
            </span>
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-jet-stream-400/40 text-white hover:bg-jet-stream-400/20 hover:border-saffron/50 hover:text-saffron transition-all duration-200"
              >
                {isOpen ? (
                  <X className="w-5 h-5 transition-transform duration-200 rotate-180" />
                ) : (
                  <Menu className="w-5 h-5 transition-transform duration-200" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-jet-stream-975/98 backdrop-blur-lg border-jet-stream-400/30 w-full sm:w-80 flex flex-col p-0"
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent border-jet-stream-400/40 text-white hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-200 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <SheetHeader className="border-b border-jet-stream-400/20 p-6 pb-4 pt-16">
                <SheetTitle className="flex justify-center">
                  <a href="/" className="flex items-center gap-1 group" onClick={() => setIsOpen(false)}>
                    <Image
  src="/skill_logo.svg"
  alt="Logo"
  width={45}
  height={45}
  className="w-12 h-12"
/>
                    <span className="text-xl font-display font-semibold tracking-tight text-jet-stream-100 group-hover:text-saffron transition-colors duration-200">
                      SkillAmigo
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col flex-1 justify-between p-6">
                {/* Navigation Links */}
                <div className="flex flex-col gap-2 pt-4">
                  {menu.map((item, index) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className="group text-center text-lg font-medium text-white hover:text-saffron transition-all duration-300 py-4 px-6 rounded-xl hover:bg-gradient-to-r hover:from-jet-stream-900/40 hover:to-saffron/10 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(230,126,34,0.4)] border border-transparent hover:border-saffron/20"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        opacity: 0,
                        animation: `fadeInUp 0.5s ease-out ${index * 100}ms forwards`
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span
                          className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse"
                          style={{ backgroundColor: '#bbd3d0' }}
                        ></span>
                        {item.title}
                        <span
                          className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse"
                          style={{ backgroundColor: '#bbd3d0' }}
                        ></span>
                      </div>
                    </a>
                  ))}
                </div>




                {/* Auth Buttons */}
                <div className="flex flex-col gap-4 pt-6 border-t border-jet-stream-400/20">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full h-12 bg-transparent border-jet-stream-400/40 text-white hover:bg-saffron hover:border-saffron hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(230,126,34,0.4)] transition-all duration-300"
                  >
                    <a href="/auth/google" className="flex items-center gap-3 justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span className="font-medium">Login with Google</span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-12 bg-saffron hover:bg-saffron/90 text-white hover:scale-105 hover:shadow-[0_0_25px_rgba(230,126,34,0.6)] transition-all duration-300"
                  >
                    <a href="/auth/facebook" className="flex items-center gap-3 justify-center">
                      <Facebook className="w-5 h-5" />
                      <span className="font-medium">Login with Facebook</span>
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export { FullwidthIconNavbar };








// "use client";
// import { Facebook, Menu, X } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { cn } from "../../lib/utils";
// import Image from "next/image";

// import { Button } from "../ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "../ui/sheet";

// interface MenuItem {
//   title: string;
//   url: string;
//   description?: string;
//   icon?: React.ReactNode;
//   items?: MenuItem[];
// }

// interface FullwidthIconNavbarProps {
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//   };
//   menu?: MenuItem[];
//   auth?: {
//     login: { title: string; url: string };
//     signup: { title: string; url: string };
//   };
// }

// const AnimatedLogo = ({ className = "" }: { className?: string }) => (
//   <div className={`flex items-center gap-2 ${className}`}>
//     <div className="relative">
//       <svg
//         width="35"
//         height="35"
//         viewBox="0 0 35 35"
//         aria-hidden="true"
//         className="animate-pulse"
//         style={{ color: "#bbd3d0" }}
//       >
//         <circle
//           cx="16"
//           cy="16"
//           r="14"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeDasharray="8 4"
//           className="animate-spin"
//           style={{ animationDuration: "5s" }}
//         />
//         <g
//           className="animate-pulse"
//           style={{ animationDelay: "0.5s", color: "#e1ecea" }}
//         >
//           <circle cx="10" cy="10" r="2" fill="currentColor" />
//           <circle cx="22" cy="10" r="2" fill="currentColor" />
//           <circle cx="16" cy="22" r="2" fill="currentColor" />
//           <circle cx="16" cy="16" r="3" fill="currentColor" />
//         </g>
//         <g
//           stroke="#f3f8f8"
//           strokeWidth="1.5"
//           opacity="0.9"
//           className="animate-pulse"
//           style={{ animationDelay: "0.5s" }}
//         >
//           <line x1="12" y1="12" x2="14" y2="14" />
//           <line x1="20" y1="12" x2="18" y2="14" />
//           <line x1="16" y1="19" x2="16" y2="18" />
//         </g>
//       </svg>

//       <div
//         className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-bounce"
//         style={{
//           backgroundColor: "#f3f8f8",
//           animationDelay: "0.5s",
//           animationDuration: "2s",
//         }}
//       />
//       <div
//         className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-bounce"
//         style={{
//           backgroundColor: "#e1ecea",
//           animationDelay: "1s",
//           animationDuration: "2.5s",
//         }}
//       />
//     </div>
//   </div>
// );

// const FullwidthIconNavbar = ({
//   menu = [
//     { title: "Find Skills", url: "/skills" },
//     { title: "Offer Skills", url: "/dashboard" },
//     { title: "How It Works", url: "/how-works" },
//     { title: "About Us", url: "/about" },
//   ],
//   auth = {
//     login: { title: "Login", url: "/login" },
//     signup: { title: "Sign up", url: "/signup" },
//   },
// }: FullwidthIconNavbarProps) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const { data: session } = useSession();

//   useEffect(() => {
//     setMounted(true);
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
//         isScrolled
//           ? "bg-jet-stream-975/95 backdrop-blur-lg border-b border-jet-stream-400/30 shadow-lg shadow-black/20"
//           : "bg-jet-stream-975/80 backdrop-blur-md border-b border-jet-stream-400/20"
//       )}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Desktop Menu */}
//         <nav className="hidden lg:flex justify-between items-center py-4">
//           <a
//             href="/"
//             className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
//           >
//             <AnimatedLogo />
//             <span className="text-xl font-display font-semibold tracking-tight text-white group-hover:text-saffron transition-colors duration-200">
//               SkillAmigo
//             </span>
//           </a>

//           {/* Nav Links */}
//           <div className="flex items-center gap-8 xl:gap-10">
//             {menu.map((item, index) => (
//               <a
//                 key={item.title}
//                 href={item.url}
//                 className="relative text-sm font-medium text-white hover:text-saffron transition-all duration-300 group"
//                 {...(mounted && { style: { animationDelay: `${index * 100}ms` } })}
//               >
//                 {item.title}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(230,126,34,0.6)]"></span>
//               </a>
//             ))}
//           </div>

//           {/* Auth */}
//           <div className="flex items-center gap-3">
//             <Button
//               asChild
//               variant="outline"
//               size="sm"
//               onClick={() =>
//                 session
//                   ? signOut({ callbackUrl: "/" })
//                   : signIn("google", { callbackUrl: "/" })
//               }
//               className="bg-transparent border-jet-stream-400/40 text-white hover:bg-saffron hover:border-saffron hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(230,126,34,0.4)] transition-all duration-300"
//             >
//               <a className="flex items-center gap-2">
//                 <svg
//                   className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12"
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 <span className="hidden xl:inline">
//                   {session ? "Logout" : "Login with Google"}
//                 </span>
//                 <span className="xl:hidden">{session ? "Logout" : "Google"}</span>
//               </a>
//             </Button>
//             {session && (
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium">{session.user?.name}</span>
//                 <Image
//                   src={session.user?.image || "/default-avatar.png"}
//                   alt="Profile"
//                   width={32}
//                   height={32}
//                   className="w-8 h-8 rounded-full border"
//                 />
//               </div>
//             )}
//           </div>
//         </nav>

//         {/* Tablet + Mobile menus unchanged … */}
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export { FullwidthIconNavbar };
