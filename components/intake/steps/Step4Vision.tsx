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

const LIGHTING_OPTIONS = [
  {
    value: "natural" as const,
    title: "Natural Light",
    subtitle: "Sun · Open shade · Window light",
    desc: "Soft, warm, and directional. Creates glowy skin tones, romantic shadows, and an editorial feel. Best for outdoor sessions or bright indoor spaces.",
    gradient: "from-amber-50 to-orange-50",
    icon: "☀️",
  },
  {
    value: "studio" as const,
    title: "Studio / Flash",
    subtitle: "Strobe · Softbox · Controlled light",
    desc: "Clean, even, and powerful. No harsh shadows or changing conditions. Best for polished headshots, commercial work, and studio sessions.",
    gradient: "from-blue-50 to-slate-50",
    icon: "⚡",
  },
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

      {/* Lighting preference */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-0.5">
          What kind of light do you prefer?
        </label>
        <p className="text-xs text-brand-muted mb-3">
          Compare the two styles below and choose what fits your vision best.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {LIGHTING_OPTIONS.map(({ value, title, subtitle, desc, gradient, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ lightingPref: data.lightingPref === value ? "" : value })}
              className={`border rounded-xl overflow-hidden text-left transition-all ${
                data.lightingPref === value
                  ? "border-brand-gold ring-2 ring-brand-gold/20"
                  : "border-brand-border hover:border-brand-gold/60"
              }`}
            >
              {/* Image area — drop your photos at /public/lighting/natural.jpg and /public/lighting/studio.jpg */}
              <div className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                <div className="flex flex-col items-center gap-1 text-center px-2">
                  <span className="text-3xl">{icon}</span>
                  <span className="text-[10px] font-medium text-brand-muted">Tap to add your photo</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/lighting/${value}.jpg`}
                  alt={`${title} example`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {data.lightingPref === value && (
                  <div className="absolute inset-0 bg-brand-gold/15 flex items-end justify-start p-2">
                    <span className="bg-brand-gold text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                      Selected ✓
                    </span>
                  </div>
                )}
              </div>
              {/* Text */}
              <div className="p-2.5">
                <p className="text-sm font-semibold text-brand-black">{title}</p>
                <p className="text-[10px] text-brand-gold font-medium mb-1">{subtitle}</p>
                <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
              </div>
            </button>
          ))}
        </div>
        {!data.lightingPref && (
          <p className="text-xs text-brand-muted mt-2 italic">Optional — skip if you&apos;re not sure yet</p>
        )}
      </div>

      {/* Mood selector */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          What&apos;s the mood?{" "}
          <span className="text-brand-muted font-normal">(pick all that apply)</span>
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
