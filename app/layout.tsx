import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ffe17c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Festejo AI : The Indian Event Decision Engine",
  description:
    "A vibrant Neo-Brutalist SaaS decision engine for Indian events. Deterministic budget stress-testing, dependency-aware reverse timeline, vendor quote deconstruction, and dynamic ripple simulations.",
  applicationName: "Festejo AI",
  keywords: [
    "Indian wedding planner",
    "event decision engine",
    "budget stress test",
    "vendor quote deconstructor",
    "reverse timeline countdown",
    "Prompt Wars",
  ],
  authors: [{ name: "Festejo AI Engineering Team" }],
  openGraph: {
    title: "Festejo AI : The Indian Event Decision Engine",
    description: "State-aware hybrid deterministic event planning engine for Indian celebrations.",
    type: "website",
    locale: "en_IN",
    siteName: "Festejo AI",
  },
  robots: {
    index: true,
    follow: true,
  },
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
