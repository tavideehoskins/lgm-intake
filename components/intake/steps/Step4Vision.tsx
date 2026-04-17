"use client";
import type { IntakeFormData } from "@/types";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

const MOODS = [
  "Natural & Candid",
  "Bright & Airy",
  "Moody & Dramatic",
  "Bold & Editorial",
  "Warm & Romantic",
  "Fun & Playful",
  "Clean & Minimal",
  "Earthy & Organic",
  "Cinematic",
  "Classic & Timeless",
];

export default function Step4Vision({ data, onChange }: Props) {
  function toggleMood(mood: string) {
    const current = data.moods;
    const updated = current.includes(mood)
      ? current.filter((m) => m !== mood)
      : [...current, mood];
    onChange({ moods: updated });
  }

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-black mb-1">
          Tell us your vision.
        </h2>
        <p className="text-brand-muted text-sm">
          Describe the feeling you&apos;re going for and select any moods that resonate.
        </p>
      </div>

      {/* Vision description */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">
          Describe your ideal shoot
        </label>
        <textarea
          rows={4}
          placeholder="Paint us a picture — what do you want to feel when you look at these photos? Any specific shots, moments, or elements you have in mind?"
          value={data.visionDescription}
          onChange={(e) => onChange({ visionDescription: e.target.value })}
          style={{ resize: "vertical" }}
        />
        <p className="text-xs text-brand-muted mt-1">
          The more detail you give, the better we can plan your shot list.
        </p>
      </div>

      {/* Mood selector */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          What&apos;s the mood? <span className="text-brand-muted font-normal">(pick all that apply)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => toggleMood(mood)}
              className={`mood-chip px-3 py-1.5 rounded-full border text-sm transition-all ${
                data.moods.includes(mood)
                  ? "selected bg-brand-black text-brand-cream border-brand-black"
                  : "bg-white border-brand-border text-brand-black hover:border-brand-gold"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
