"use client";
import type { IntakeFormData } from "@/types";
import { getLocationById, CITY_LABELS } from "@/lib/locations";
import { SHOOT_TYPE_LABELS } from "@/lib/utils";

interface Props {
  data: IntakeFormData;
  isSubmitting: boolean;
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 border-b border-brand-border last:border-0">
      <span className="text-xs font-semibold text-brand-muted w-32 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-brand-black">{value}</span>
    </div>
  );
}

export default function Step7Review({ data, isSubmitting }: Props) {
  const location = data.locationId ? getLocationById(data.locationId) : null;

  const locationDisplay = location
    ? location.name
    : data.locationCustom
    ? data.locationCustom
    : data.locationCity
    ? CITY_LABELS[data.locationCity]
    : "—";

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-black mb-1">
          Review &amp; submit.
        </h2>
        <p className="text-brand-muted text-sm">
          Take a look at your session details. You can go back to make changes at any time.
        </p>
      </div>

      <div className="bg-white border border-brand-border rounded-xl overflow-hidden divide-y divide-brand-border">
        {/* Contact */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold mb-2">
            Contact
          </p>
          <Row label="Name" value={data.clientName} />
          <Row label="Email" value={data.clientEmail} />
          <Row label="Phone" value={data.clientPhone} />
          <Row label="Preferred Date" value={data.preferredDate} />
        </div>

        {/* Session */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold mb-2">
            Session
          </p>
          <Row
            label="Type"
            value={
              data.shootType === "other"
                ? data.shootTypeOther || "Other"
                : SHOOT_TYPE_LABELS[data.shootType] ?? data.shootType
            }
          />
          <Row label="Group Size" value={data.groupSize} />
        </div>

        {/* Location */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold mb-2">
            Location
          </p>
          <Row label="City" value={data.locationCity ? CITY_LABELS[data.locationCity] : undefined} />
          <Row label="Location" value={locationDisplay} />
          <Row
            label="Preference"
            value={
              data.outdoorIndoorPref === "outdoor"
                ? "Outdoor"
                : data.outdoorIndoorPref === "indoor"
                ? "Indoor / Studio"
                : data.outdoorIndoorPref === "no_preference"
                ? "No preference"
                : undefined
            }
          />
          {data.weatherSensitive && (
            <Row label="Weather" value="Weather check preferred before shoot day" />
          )}
        </div>

        {/* Vision */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold mb-2">
            Vision
          </p>
          <Row label="Description" value={data.visionDescription} />
          {data.moods.length > 0 && (
            <div className="flex gap-2 py-2 border-b border-brand-border">
              <span className="text-xs font-semibold text-brand-muted w-32 shrink-0 pt-0.5">
                Mood
              </span>
              <div className="flex flex-wrap gap-1">
                {data.moods.map((m) => (
                  <span
                    key={m}
                    className="text-xs bg-brand-cream-dark text-brand-black px-2 py-0.5 rounded-full"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Style */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold mb-2">
            Style &amp; Prep
          </p>
          <Row label="Palette" value={data.colorPaletteChoice} />
          <Row label="Outfits" value={data.outfitNotes} />
          <Row label="Props" value={data.props} />
          <Row label="Notes" value={data.additionalNotes} />
          {data.inspirationPhotos.length > 0 && (
            <Row
              label="Inspiration"
              value={`${data.inspirationPhotos.length} photo${data.inspirationPhotos.length > 1 ? "s" : ""} uploaded`}
            />
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 text-sm text-amber-900">
        By submitting, you&apos;re sharing your vision with Tavidee so we can plan the
        perfect session together. You&apos;ll receive a confirmation email at{" "}
        <strong>{data.clientEmail || "your email"}</strong>.
      </div>

      {isSubmitting && (
        <div className="text-center text-sm text-brand-muted animate-pulse">
          Sending your intake form…
        </div>
      )}
    </div>
  );
}
