"use client";
import type { IntakeFormData } from "@/types";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

export default function Step1Contact({ data, onChange }: Props) {
  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-black mb-1">
          Let&apos;s start with you.
        </h2>
        <p className="text-brand-muted text-sm">
          Tell us how to reach you and when you&apos;re hoping to shoot.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brand-black mb-1">
            Full Name <span className="text-brand-gold">*</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-black mb-1">
            Email Address <span className="text-brand-gold">*</span>
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            value={data.clientEmail}
            onChange={(e) => onChange({ clientEmail: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-black mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="(225) 555-0100"
            value={data.clientPhone}
            onChange={(e) => onChange({ clientPhone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-black mb-1">
            Preferred Shoot Date
          </label>
          <input
            type="date"
            value={data.preferredDate}
            onChange={(e) => onChange({ preferredDate: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-3 sm:col-span-1 pt-6">
          <input
            type="checkbox"
            id="booking-confirmed"
            checked={data.bookingConfirmed}
            onChange={(e) => onChange({ bookingConfirmed: e.target.checked })}
            className="w-4 h-4 accent-brand-gold cursor-pointer"
            style={{ width: 18, height: 18 }}
          />
          <label
            htmlFor="booking-confirmed"
            className="text-sm text-brand-muted cursor-pointer select-none"
          >
            I have already booked via Setmore
          </label>
        </div>
      </div>

      {!data.bookingConfirmed && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
          Haven&apos;t booked yet?{" "}
          <a
            href="https://thelookingglassmedia.setmore.com/tavideehoskins"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            Reserve your date first →
          </a>{" "}
          then come back to complete this form.
        </div>
      )}
    </div>
  );
}
