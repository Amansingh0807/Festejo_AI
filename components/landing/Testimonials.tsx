"use client";

import React from "react";
import { Star } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Rajesh & Meera Sharma",
      event: "Delhi Wedding (350 Guests)",
      comment:
        "Festejo AI caught our caterer attempting to add an unquoted 18% GST and kitchen fuel charge worth INR 78,000 right before contract signing. The WhatsApp script saved us INR 65,000 on day one.",
      role: "Host Family, South Delhi",
    },
    {
      name: "Vikram Singhania",
      event: "Jaipur Sangeet (200 Guests)",
      comment:
        "When our guest count jumped by 50 two weeks before the event, the Ripple Effect engine absorbed it cleanly using the 10% statutory reserve without sacrificing our floral canopy design.",
      role: "Groom, Civil Lines Jaipur",
    },
    {
      name: "Pooja Deshmukh",
      event: "Society Diwali Carnival (500 Guests)",
      comment:
        "The reverse timeline enforced our Supreme Court 10 PM sound permission and generator fuel audit. For the first time in 5 years, our society celebration finished with zero police complaints.",
      role: "Secretary, Green Valley Mumbai",
    },
  ];

  return (
    <section id="testimonials" className="w-full bg-[#b7c6c2] border-b-2 border-black py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-black bg-[#ffe17c] px-3.5 py-1 rounded-full border-2 border-black hard-shadow-2">
            FIELD VALIDATION
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-black tracking-tight">
            PROVEN IN REAL CELEBRATIONS
          </h2>
          <p className="font-body text-sm sm:text-base text-[#171e19] max-w-xl mx-auto font-medium">
            Read how hosts and committee leaders used Festejo AI to eliminate vendor extortion and preserve sanity.
          </p>
        </div>

        {/* Grid of 3 White Cards with Asymmetric Corner Rounding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              style={{
                borderTopRightRadius: "1.5rem",
                borderBottomLeftRadius: "1.5rem",
                borderTopLeftRadius: "2px",
                borderBottomRightRadius: "2px",
              }}
              className="bg-white border-2 border-black p-6 hard-shadow-4 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating in #ffbc2e yellow */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#ffbc2e] text-[#ffbc2e]"
                    />
                  ))}
                  <span className="font-mono text-xs font-bold text-black ml-2">5.0 / 5.0</span>
                </div>

                <p className="font-body text-sm text-[#171e19] leading-relaxed italic mb-6">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t-2 border-black">
                <span className="font-heading text-base font-extrabold text-black block leading-none">
                  {rev.name}
                </span>
                <span className="font-mono text-[11px] text-gray-600 block mt-1">
                  {rev.event}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-[#171e19] bg-[#ffe17c] px-2 py-0.5 rounded border border-black inline-block mt-2">
                  {rev.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
