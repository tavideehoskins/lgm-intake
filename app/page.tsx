"use client";
import { useState } from "react";
import IntakeWizard from "@/components/intake/IntakeWizard";

export default function IntakePage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-brand-cream">
        <div className="text-center max-w-md animate-slide-up">
          {/* Logo */}
          <div className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="The Looking Glass Media"
              className="h-16 mx-auto"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-serif text-brand-black mb-3">
            You&apos;re all set!
          </h1>
          <p className="text-brand-muted mb-6">
            Your shoot intake has been received. Tavidee will review your details
            and follow up with you to confirm logistics.
          </p>
          <p className="text-sm text-brand-muted mb-8">
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
          <div className="bg-white border border-brand-border rounded-xl p-4 text-sm text-brand-muted">
            <p className="font-semibold text-brand-black mb-1">What happens next?</p>
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
    <main className="min-h-screen bg-brand-cream px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center mb-8 max-w-xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="The Looking Glass Media"
          className="h-12 mx-auto mb-5"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <h1 className="text-3xl sm:text-4xl font-serif text-brand-black leading-tight mb-2">
          Tell us about your shoot.
        </h1>
        <p className="text-brand-muted text-base">
          A few questions to help us plan the perfect session for you.
        </p>
      </div>

      <IntakeWizard onSuccess={() => setSubmitted(true)} />

      {/* Footer */}
      <p className="text-center text-xs text-brand-muted mt-10">
        Questions? Email{" "}
        <a href="mailto:t.looking.g.media@gmail.com" className="text-brand-gold underline">
          t.looking.g.media@gmail.com
        </a>{" "}
        · (706) 341-2862
      </p>
    </main>
  );
}
