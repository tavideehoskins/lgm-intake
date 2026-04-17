"use client";
import type { IntakeFormData, ShootType } from "@/types";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

const OCCASIONS: { type: ShootType; label: string; emoji: string; desc: string }[] = [
  { type: "graduation",  label: "Graduation",          emoji: "🎓", desc: "Cap & gown milestones" },
  { type: "headshot",    label: "Headshots",            emoji: "💼", desc: "Professional portraits" },
  { type: "branding",    label: "Branding / Lifestyle", emoji: "✨", desc: "For your business or brand" },
  { type: "maternity",   label: "Maternity",            emoji: "🤰", desc: "Celebrating new life" },
  { type: "family",      label: "Family Portraits",     emoji: "👨‍👩‍👧‍👦", desc: "Everyone together" },
  { type: "birthday",    label: "Birthday",             emoji: "🎂", desc: "Milestone celebrations" },
  { type: "engagement",  label: "Engagement",           emoji: "💍", desc: "The next chapter" },
  { type: "event",       label: "Event Coverage",       emoji: "🎉", desc: "Gatherings & occasions" },
  { type: "holiday",     label: "Holiday / Seasonal",   emoji: "🎄", desc: "Christmas, fall, themed" },
  { type: "other",       label: "Something Else",       emoji: "📸", desc: "Tell us more below" },
];

const GROUP_SIZES = [
  { value: "1",   label: "Just Me" },
  { value: "2",   label: "2 People" },
  { value: "3-4", label: "3–4 People" },
  { value: "5-6", label: "5–6 People" },
  { value: "7+",  label: "7+ People" },
];

export default function Step2Occasion({ data, onChange }: Props) {
  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-black mb-1">
          What&apos;s the occasion?
        </h2>
        <p className="text-brand-muted text-sm">
          Select the type of session you&apos;re looking for.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {OCCASIONS.map(({ type, label, emoji, desc }) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange({ shootType: type })}
            className={`occasion-tile text-left border rounded-xl p-3 ${
              data.shootType === type
                ? "selected border-brand-gold bg-amber-50"
                : "border-brand-border bg-white"
            }`}
          >
            <span className="text-2xl block mb-1">{emoji}</span>
            <span className="font-medium text-sm text-brand-black block">{label}</span>
            <span className="text-xs text-brand-muted">{desc}</span>
          </button>
        ))}
      </div>

      {data.shootType === "other" && (
        <div>
          <label className="block text-sm font-medium text-brand-black mb-1">
            Describe your session
          </label>
          <input
            type="text"
            placeholder="Tell us what you have in mind..."
            value={data.shootTypeOther}
            onChange={(e) => onChange({ shootTypeOther: e.target.value })}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          How many people will be in the session?
        </label>
        <div className="flex flex-wrap gap-2">
          {GROUP_SIZES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ groupSize: value })}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                data.groupSize === value
                  ? "bg-brand-gold text-white border-brand-gold shadow-md scale-105"
                  : "bg-white border-brand-border text-brand-black hover:border-brand-gold"
              }`}
            >
              {data.groupSize === value ? `✓ ${label}` : label}
            </button>
          ))}
        </div>
        {!data.groupSize && (
          <p className="text-xs text-brand-muted mt-1">Select one to continue</p>
        )}
      </div>
    </div>
  );
}
