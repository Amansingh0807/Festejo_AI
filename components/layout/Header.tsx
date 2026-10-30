"use client";

import React from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";

export function Header(): React.ReactElement {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-20 w-full bg-[#ffe17c] border-b-2 border-black px-4 sm:px-8 flex items-center justify-between select-none shadow-[0px_4px_0px_0px_#000000]">
      {/* Left: Logo with a 10x10 black square icon containing a #ffe17c bolt */}
      <Link
        href="/"
        aria-label="Festejo AI Home"
        className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-black outline-none"
      >
        <div className="h-10 w-10 bg-black border-2 border-black flex items-center justify-center hard-shadow-2">
          <Zap className="h-6 w-6 text-[#ffe17c] fill-[#ffe17c]" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-2xl font-extrabold tracking-tight text-black leading-none">
            Festejo AI
          </span>
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#171e19]">
            Decision Engine
          </span>
        </div>
      </Link>

      {/* Center: Horizontal links in bold Satoshi */}
      <nav
        aria-label="Main Navigation"
        className="hidden lg:flex items-center gap-8 font-body font-bold text-sm text-black"
      >
        <a
          href="#hero"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all focus-visible:ring-2 focus-visible:ring-black outline-none"
        >
          Overview
        </a>
        <a
          href="#problem-solution"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all focus-visible:ring-2 focus-visible:ring-black outline-none"
        >
          Problem vs Solution
        </a>
        <a
          href="#features"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all focus-visible:ring-2 focus-visible:ring-black outline-none"
        >
          Features
        </a>
        <Link
          href="/workspace"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all bg-black text-[#ffe17c] px-3 py-1 border-2 border-black hard-shadow-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black outline-none"
        >
          <span>Live Co-Pilot</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
        <a
          href="#how-it-works"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all focus-visible:ring-2 focus-visible:ring-black outline-none"
        >
          How It Works
        </a>
      </nav>

      {/* Right: Actions and Auth Push Buttons */}
      <div className="flex items-center gap-3">
        {isLoaded && isSignedIn ? (
          <>
            <Link
              href="/workspace"
              className="bg-black text-[#ffe17c] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-5 py-2.5 border-2 border-black hard-shadow-4 neo-push-btn cursor-pointer inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-black outline-none"
            >
              <span>Open Workspace</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="border-2 border-black p-1 bg-white hard-shadow-2 flex items-center justify-center">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8",
                  },
                }}
              />
            </div>
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="hidden md:inline-flex items-center font-heading font-extrabold text-xs uppercase px-4 py-2.5 border-2 border-black bg-white text-black hard-shadow-2 neo-push-btn cursor-pointer focus-visible:ring-2 focus-visible:ring-black outline-none"
            >
              Sign In
            </Link>
            <Link
              href="/workspace"
              className="bg-black text-[#ffe17c] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 border-2 border-black hard-shadow-4 neo-push-btn cursor-pointer inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-black outline-none"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
