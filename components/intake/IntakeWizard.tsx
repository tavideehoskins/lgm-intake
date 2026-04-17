"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { IntakeFormData } from "@/types";
import Step1Contact   from "./steps/Step1Contact";
import Step2Occasion  from "./steps/Step2Occasion";
import Step3Location  from "./steps/Step3Location";
import Step4Vision    from "./steps/Step4Vision";
import Step5Uploads   from "./steps/Step5Uploads";
import Step6StylePrep from "./steps/Step6StylePrep";
import Step7Review    from "./steps/Step7Review";

const STEPS = [
  { label: "Contact",  short: "You"       },
  { label: "Occasion", short: "Session"   },
  { label: "Location", short: "Where"     },
  { label: "Vision",   short: "Vision"    },
  { label: "Inspo",    short: "Inspo"     },
  { label: "Style",    short: "Style"     },
  { label: "Review",   short: "Review"    },
];

const INITIAL: IntakeFormData = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  preferredDate: "",
  bookingConfirmed: false,
  shootType: "",
  shootTypeOther: "",
  groupSize: "1",
  locationCity: "",
  locationId: "",
  locationCustom: "",
  outdoorIndoorPref: "no_preference",
  weatherSensitive: false,
  visionDescription: "",
  moods: [],
  lightingPref: "",
  inspirationPhotos: [],
  colorPaletteChoice: "",
  outfitNotes: "",
  props: "",
  additionalNotes: "",
};

function validate(step: number, data: IntakeFormData): string | null {
  if (step === 0) {
    if (!data.clientName.trim()) return "Please enter your name.";
    if (!data.clientEmail.trim() || !data.clientEmail.includes("@"))
      return "Please enter a valid email address.";
  }
  if (step === 1) {
    if (!data.shootType) return "Please select a session type.";
    if (data.shootType === "other" && !data.shootTypeOther.trim())
      return "Please describe your session.";
  }
  return null;
}

interface Props {
  onSuccess: () => void;
}

export default function IntakeWizard({ onSuccess }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeFormData>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateData(updates: Partial<IntakeFormData>) {
    setData((prev) => ({ ...prev, ...updates }));
    setError(null);
  }

  function goNext() {
    const err = validate(step, data);
    if (err) { setError(err); return; }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();

      // Append all non-file fields (exclude lightingPref — merged into visionDescription)
      const { inspirationPhotos, moods, lightingPref, visionDescription, ...rest } = data;
      Object.entries(rest).forEach(([k, v]) => {
        formData.append(k, String(v));
      });

      // Prepend lighting preference to vision description if selected
      const lightingNote = lightingPref
        ? `Lighting preference: ${lightingPref === "natural" ? "Natural / Ambient Light" : "Studio / Flash / Strobe"}\n\n`
        : "";
      formData.append("visionDescription", lightingNote + visionDescription);
      formData.append("moods", JSON.stringify(moods));

      // Append inspiration photos
      inspirationPhotos.forEach((file) => {
        formData.append("inspirationPhotos", file);
      });

      const res = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Submission failed. Please try again.");
      }

      onSuccess();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100;
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white/50">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-xs font-medium text-brand-gold">
            {STEPS[step].label}
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        {/* Step dots */}
        <div className="flex justify-between mt-2">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`text-[10px] font-medium transition-colors ${
                i === step
                  ? "text-brand-gold"
                  : i < step
                  ? "text-white/60"
                  : "text-white/20"
              }`}
            >
              {i < step ? "✓" : s.short}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm mb-4">
        {step === 0 && <Step1Contact   data={data} onChange={updateData} />}
        {step === 1 && <Step2Occasion  data={data} onChange={updateData} />}
        {step === 2 && <Step3Location  data={data} onChange={updateData} />}
        {step === 3 && <Step4Vision    data={data} onChange={updateData} />}
        {step === 4 && <Step5Uploads   data={data} onChange={updateData} />}
        {step === 5 && <Step6StylePrep data={data} onChange={updateData} />}
        {step === 6 && <Step7Review    data={data} isSubmitting={isSubmitting} />}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20 text-sm font-medium text-white/70 hover:border-brand-gold hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-brand-gold text-white text-sm font-semibold hover:bg-brand-gold-light transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            {isSubmitting ? "Sending…" : "Submit My Intake ✓"}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-gold text-white text-sm font-semibold hover:bg-brand-gold-light transition-all"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
