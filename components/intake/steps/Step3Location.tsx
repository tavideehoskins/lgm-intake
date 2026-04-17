"use client";
import { useState } from "react";
import type { IntakeFormData, LocationCity } from "@/types";
import {
  LOCATIONS,
  CITY_LABELS,
  CATEGORY_LABELS,
  getLocationsByCity,
} from "@/lib/locations";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

const CITIES: { value: LocationCity; label: string; flag: string }[] = [
  { value: "baton_rouge",  label: "Baton Rouge",     flag: "🏙️" },
  { value: "lafayette",    label: "Lafayette",        flag: "🌿" },
  { value: "new_orleans",  label: "New Orleans",      flag: "🎺" },
  { value: "flexible",     label: "I'm Flexible",     flag: "🗺️" },
  { value: "other",        label: "Out of Town",      flag: "📍" },
];

const CATEGORIES = ["natural", "urban", "hybrid", "studio"] as const;

export default function Step3Location({ data, onChange }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const cityLocations = data.locationCity && data.locationCity !== "flexible" && data.locationCity !== "other"
    ? getLocationsByCity(data.locationCity)
    : LOCATIONS;

  const filtered =
    activeCategory === "all"
      ? cityLocations
      : cityLocations.filter((l) => l.category === activeCategory);

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-black mb-1">
          Where do you want to shoot?
        </h2>
        <p className="text-brand-muted text-sm">
          Pick a city, then choose a location — or describe your own.
        </p>
      </div>

      {/* City selector */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          City / Area
        </label>
        <div className="flex flex-wrap gap-2">
          {CITIES.map(({ value, label, flag }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ locationCity: value, locationId: "" })}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                data.locationCity === value
                  ? "bg-brand-black text-brand-cream border-brand-black"
                  : "bg-white border-brand-border text-brand-black hover:border-brand-gold"
              }`}
            >
              <span>{flag}</span> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Outdoor / Indoor preference */}
      {data.locationCity && data.locationCity !== "other" && (
        <div>
          <label className="block text-sm font-medium text-brand-black mb-2">
            Outdoor or indoor preference?
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { v: "outdoor",      l: "Prefer Outdoor" },
              { v: "indoor",       l: "Prefer Indoor/Studio" },
              { v: "no_preference", l: "No Preference" },
            ].map(({ v, l }) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange({ outdoorIndoorPref: v as IntakeFormData["outdoorIndoorPref"] })}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  data.outdoorIndoorPref === v
                    ? "bg-brand-black text-brand-cream border-brand-black"
                    : "bg-white border-brand-border text-brand-black hover:border-brand-gold"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Weather sensitivity */}
      {data.outdoorIndoorPref !== "indoor" && data.locationCity && data.locationCity !== "other" && (
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.weatherSensitive}
            onChange={(e) => onChange({ weatherSensitive: e.target.checked })}
            className="cursor-pointer"
            style={{ width: 18, height: 18, accentColor: "#AB830A" }}
          />
          <span className="text-sm text-brand-muted">
            I&apos;m weather-sensitive — I&apos;d like to check conditions before shoot day
          </span>
        </label>
      )}

      {/* Out of town / custom */}
      {data.locationCity === "other" && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-brand-black mb-1">
            Describe your location or general vibe
          </label>
          <textarea
            rows={3}
            placeholder="e.g. 'A park in Houston, TX' or 'Outdoor natural setting with tall grass and open sky'"
            value={data.locationCustom}
            onChange={(e) => onChange({ locationCustom: e.target.value })}
            style={{ resize: "vertical" }}
          />
        </div>
      )}

      {/* Location grid */}
      {data.locationCity && data.locationCity !== "other" && (
        <div>
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-4">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeCategory === "all"
                  ? "bg-brand-black text-white border-brand-black"
                  : "bg-white border-brand-border text-brand-muted hover:border-brand-gold"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  activeCategory === cat
                    ? "bg-brand-black text-white border-brand-black"
                    : "bg-white border-brand-border text-brand-muted hover:border-brand-gold"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-brand-muted text-center py-6">
              No locations in this category for the selected city.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() =>
                  onChange({
                    locationId: loc.id,
                    locationCustom: "",
                  })
                }
                className={`location-card text-left border rounded-xl overflow-hidden bg-white ${
                  data.locationId === loc.id
                    ? "selected border-brand-gold"
                    : "border-brand-border"
                }`}
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden bg-gradient-to-br from-brand-cream-dark to-brand-cream flex items-center justify-center">
                  <span className="text-brand-muted text-xs font-medium px-4 text-center leading-relaxed opacity-50">
                    {loc.name}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.imageUrl}
                    alt={loc.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <span className="absolute top-2 left-2 bg-white/90 text-xs font-medium px-2 py-0.5 rounded-full text-brand-black">
                    {CATEGORY_LABELS[loc.category]}
                  </span>
                  {data.locationId === loc.id && (
                    <span className="absolute top-2 right-2 bg-brand-gold text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      Selected ✓
                    </span>
                  )}
                </div>
                {/* Info */}
                <div className="p-3">
                  <p className="font-semibold text-sm text-brand-black">{loc.name}</p>
                  <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">
                    {loc.description}
                  </p>
                  {loc.priceNote && (
                    <p className="text-xs font-medium text-brand-gold mt-1.5">
                      {loc.priceNote}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {loc.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-brand-cream-dark text-brand-muted px-1.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Custom note */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-brand-black mb-1">
              Have a specific spot in mind? Tell us more (optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. 'The oak tree at the corner of Dalrymple and Highland' or 'Prefer the garden section at Burden'"
              value={data.locationCustom}
              onChange={(e) => onChange({ locationCustom: e.target.value })}
              style={{ resize: "vertical" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
