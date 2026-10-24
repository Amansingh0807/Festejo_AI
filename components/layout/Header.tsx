"use client";

import React from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";

export function Header() {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-20 w-full bg-[#ffe17c] border-b-2 border-black px-4 sm:px-8 flex items-center justify-between select-none shadow-[0px_4px_0px_0px_#000000]">
      {/* Left: Logo with a 10x10 black square icon containing a #ffe17c bolt */}
      <Link href="/" className="flex items-center gap-3">
        <div className="h-10 w-10 bg-black border-2 border-black flex items-center justify-center hard-shadow-2">
          <Zap className="h-6 w-6 text-[#ffe17c] fill-[#ffe17c]" />
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
      <nav className="hidden lg:flex items-center gap-8 font-body font-bold text-sm text-black">
        <a
          href="#hero"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all"
        >
          Overview
        </a>
        <a
          href="#problem-solution"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all"
        >
          Problem vs Solution
        </a>
        <a
          href="#features"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all"
        >
          Features
        </a>
        <Link
          href="/workspace"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all bg-black text-[#ffe17c] px-3 py-1 border-2 border-black hard-shadow-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-1.5"
        >
          Live Co-Pilot
          <ArrowRight className="h-3 w-3" />
        </Link>
        <a
          href="#how-it-works"
          className="hover:underline underline-offset-4 decoration-2 decoration-black transition-all"
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
              className="bg-black text-[#ffe17c] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-5 py-2.5 border-2 border-black hard-shadow-4 neo-push-btn cursor-pointer inline-flex items-center gap-2"
            >
              Open Workspace
              <ArrowRight className="h-4 w-4" />
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
              className="hidden md:inline-flex items-center font-heading font-extrabold text-xs uppercase px-4 py-2.5 border-2 border-black bg-white text-black hard-shadow-2 neo-push-btn cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/workspace"
              className="bg-black text-[#ffe17c] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 border-2 border-black hard-shadow-4 neo-push-btn cursor-pointer inline-flex items-center gap-2"
            >
              Launch Workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

