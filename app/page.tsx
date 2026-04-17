"use client";
import { useState } from "react";
import IntakeWizard from "@/components/intake/IntakeWizard";

export default function IntakePage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#111111]">
        <div className="text-center max-w-md animate-slide-up">
          {/* Logo */}
          <div className="mb-8 inline-block rounded-xl overflow-hidden ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="The Looking Glass Media"
              className="h-16"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-serif text-white mb-3">
            You&apos;re all set!
          </h1>
          <p className="text-white/60 mb-6">
            Your shoot intake has been received. Tavidee will review your details
            and follow up with you to confirm logistics.
          </p>
          <p className="text-sm text-white/50 mb-8">
            In the meantime, explore the portfolio at{" "}
            <a
              href="https://www.lookinggm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold underline"
            >
              lookinggm.com
            </a>
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/60">
            <p className="font-semibold text-white mb-1">What happens next?</p>
            <ol className="text-left space-y-1 list-decimal list-inside">
              <li>Tavidee reviews your intake details</li>
              <li>You&apos;ll receive a follow-up to confirm location and finalize logistics</li>
              <li>Show up ready and have an amazing shoot</li>
            </ol>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center mb-8 max-w-xl mx-auto">
        <div className="inline-block rounded-xl overflow-hidden ring-1 ring-white/10 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="The Looking Glass Media"
            className="h-12"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white leading-tight mb-2">
          Tell us about your shoot.
        </h1>
        <p className="text-white/50 text-base">
          A few questions to help us plan the perfect session for you.
        </p>
      </div>

      <IntakeWizard onSuccess={() => setSubmitted(true)} />

      {/* Footer */}
      <p className="text-center text-xs text-white/30 mt-10">
        Questions? Email{" "}
        <a href="mailto:t.looking.g.media@gmail.com" className="text-brand-gold underline">
          t.looking.g.media@gmail.com
        </a>{" "}
        · (706) 341-2862
      </p>
    </main>
  );
}
