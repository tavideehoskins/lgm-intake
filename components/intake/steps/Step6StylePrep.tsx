"use client";
import type { IntakeFormData } from "@/types";
import { getStyleGuide } from "@/lib/style-guides";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

export default function Step6StylePrep({ data, onChange }: Props) {
  const guide = data.shootType ? getStyleGuide(data.shootType) : null;

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-black mb-1">
          Style &amp; preparation.
        </h2>
        <p className="text-brand-muted text-sm">
          Let us know your outfit plans, props, and anything else we should know before shoot day.
        </p>
      </div>

      {/* Style guide card */}
      {guide && (
        <div className="bg-white border border-brand-border rounded-xl overflow-hidden">
          <div className="bg-brand-black px-4 py-3">
            <p className="text-brand-cream text-sm font-semibold">
              📋 Style guide for your session
            </p>
          </div>

          <div className="p-4 space-y-5">
            {/* Color palettes */}
            {guide.colorPalettes.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted mb-3">
                  Suggested Color Palettes
                </p>
                <div className="space-y-3">
                  {guide.colorPalettes.map((palette) => (
                    <button
                      key={palette.name}
                      type="button"
                      onClick={() => onChange({ colorPaletteChoice: palette.name })}
                      className={`w-full text-left border rounded-lg p-3 transition-all ${
                        data.colorPaletteChoice === palette.name
                          ? "border-brand-gold bg-amber-50"
                          : "border-brand-border hover:border-brand-gold"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1 shrink-0">
                          {palette.colors.map((color) => (
                            <span
                              key={color}
                              className="palette-swatch"
                              style={{
                                backgroundColor: color,
                                width: 22,
                                height: 22,
                                borderRadius: "50%",
                                border: "2px solid rgba(255,255,255,0.6)",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                                display: "inline-block",
                              }}
                            />
                          ))}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand-black">{palette.name}</p>
                          <p className="text-xs text-brand-muted">{palette.description}</p>
                        </div>
                        {data.colorPaletteChoice === palette.name && (
                          <span className="ml-auto text-brand-gold text-xs font-bold">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tips grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guide.outfitTips.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted mb-2">
                    Outfit Tips
                  </p>
                  <ul className="space-y-1.5">
                    {guide.outfitTips.map((tip, i) => (
                      <li key={i} className="text-xs text-brand-black flex gap-2">
                        <span className="text-brand-gold mt-0.5 shrink-0">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {guide.whatToAvoid.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted mb-2">
                    What to Avoid
                  </p>
                  <ul className="space-y-1.5">
                    {guide.whatToAvoid.map((tip, i) => (
                      <li key={i} className="text-xs text-brand-black flex gap-2">
                        <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {guide.whatToBring.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted mb-2">
                  What to Bring
                </p>
                <div className="flex flex-wrap gap-2">
                  {guide.whatToBring.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs bg-brand-cream-dark text-brand-black px-2.5 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {guide.proTips.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <p className="text-xs font-semibold text-brand-gold mb-1.5">Pro Tips</p>
                <ul className="space-y-1">
                  {guide.proTips.map((tip, i) => (
                    <li key={i} className="text-xs text-amber-900">
                      💡 {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Outfit notes */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">
          What are you planning to wear?
        </label>
        <textarea
          rows={3}
          placeholder="Describe your outfit(s) — colors, styles, number of looks you're bringing..."
          value={data.outfitNotes}
          onChange={(e) => onChange({ outfitNotes: e.target.value })}
          style={{ resize: "vertical" }}
        />
      </div>

      {/* Props */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">
          Props or special items you&apos;re bringing
        </label>
        <textarea
          rows={2}
          placeholder="e.g. Balloons, flowers, a sign, baby shoes, your dog, branded products..."
          value={data.props}
          onChange={(e) => onChange({ props: e.target.value })}
          style={{ resize: "vertical" }}
        />
      </div>

      {/* Additional notes */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">
          Anything else we should know?
        </label>
        <textarea
          rows={3}
          placeholder="Special requests, physical limitations, timing preferences, kids nap schedules, anything at all..."
          value={data.additionalNotes}
          onChange={(e) => onChange({ additionalNotes: e.target.value })}
          style={{ resize: "vertical" }}
        />
      </div>
    </div>
  );
}
