import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Festejo AI : The Indian Event Decision Engine",
  description:
    "A vibrant Neo-Brutalist SaaS decision engine for Indian events. Deterministic budget stress-testing, dependency-aware reverse timeline, vendor quote deconstruction, and dynamic ripple simulations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full scroll-smooth antialiased">
        <body className="min-h-full w-full bg-[#171e19] text-black font-body overflow-x-hidden">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
