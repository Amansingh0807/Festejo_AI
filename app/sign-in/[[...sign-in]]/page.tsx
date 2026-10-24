import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full bg-[#171e19] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="h-10 w-10 bg-black border-2 border-black flex items-center justify-center hard-shadow-2 group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
            <Zap className="h-6 w-6 text-[#ffe17c] fill-[#ffe17c]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-[#ffe17c] leading-none">
              Festejo AI
            </span>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#b7c6c2]">
              Decision Engine
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-black bg-[#b7c6c2] px-4 py-2 border-2 border-black hard-shadow-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Main Sign-In Form Container */}
      <div className="flex items-center justify-center my-8">
        <div className="w-full max-w-md bg-[#ffe17c] border-2 border-black hard-shadow-8 p-6 sm:p-8 flex flex-col items-center">
          <div className="mb-6 text-center space-y-1">
            <span className="font-mono text-xs uppercase font-extrabold tracking-widest bg-black text-[#ffe17c] px-3 py-0.5 border border-black inline-block">
              SECURE ACCESS GATE
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-tight">
              Sign In to Festejo
            </h1>
            <p className="font-body text-xs text-[#171e19] font-medium max-w-xs mx-auto">
              Access your protected Decision Desk, real-time stress testing, and Gemini AI Co-Pilot.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <Suspense fallback={<div className="font-mono text-xs text-black p-4">Loading secure portal...</div>}>
              <SignIn
                appearance={{
                  elements: {
                    card: "bg-transparent shadow-none border-0 p-0 w-full",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "bg-white border-2 border-black hard-shadow-2 hover:translate-x-[1px] hover:translate-y-[1px] font-heading font-bold text-xs uppercase text-black",
                    formButtonPrimary:
                      "bg-black hover:bg-neutral-800 text-[#ffe17c] font-heading font-extrabold text-xs uppercase tracking-wider border-2 border-black hard-shadow-4 py-3 neo-push-btn",
                    formFieldInput:
                      "bg-white border-2 border-black font-body text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-0 focus:border-black",
                    footerActionLink:
                      "font-bold text-black underline hover:text-neutral-700",
                  },
                }}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="text-center font-mono text-[11px] text-[#b7c6c2]">
        Protected by Supabase Database and Clerk Enterprise Auth
      </div>
    </div>
  );
}
