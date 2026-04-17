"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import type { Submission, SubmissionStatus } from "@/types";
import { formatDateTime, SHOOT_TYPE_LABELS, STATUS_LABELS } from "@/lib/utils";
import { CITY_LABELS } from "@/lib/locations";

const STATUSES: SubmissionStatus[] = ["new", "reviewed", "confirmed", "completed"];

const STATUS_COLORS: Record<string, string> = {
  new:       "badge-new",
  reviewed:  "badge-reviewed",
  confirmed: "badge-confirmed",
  completed: "badge-completed",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-brand-border rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-brand-border bg-brand-cream-dark">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{title}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs font-semibold text-brand-muted mb-0.5">{label}</p>
      <p className="text-sm text-brand-black">{value}</p>
    </div>
  );
}

export default function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [sub, setSub] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/submissions/${id}`)
      .then((r) => r.json())
      .then((data: Submission) => {
        setSub(data);
        setAdminNotes(data.admin_notes ?? "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function updateStatus(status: SubmissionStatus) {
    if (!sub) return;
    const res = await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setSub((s) => s ? { ...s, status } : s);
  }

  async function saveNotes() {
    setSaving(true);
    const res = await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_notes: adminNotes }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-cream flex items-center justify-center">
        <p className="text-brand-muted animate-pulse">Loading submission…</p>
      </main>
    );
  }

  if (!sub) {
    return (
      <main className="min-h-screen bg-brand-cream flex items-center justify-center">
        <p className="text-brand-muted">Submission not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Header */}
      <header className="bg-brand-black text-white px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{sub.client_name}</p>
          <p className="text-white/50 text-xs">
            {SHOOT_TYPE_LABELS[sub.shoot_type] ?? sub.shoot_type} · {formatDateTime(sub.created_at)}
          </p>
        </div>
        <span className={STATUS_COLORS[sub.status]}>{STATUS_LABELS[sub.status]}</span>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* Status workflow */}
        <Section title="Status">
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  sub.status === s
                    ? "bg-brand-gold text-white border-brand-gold"
                    : "bg-white border-brand-border text-brand-black hover:border-brand-gold"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </Section>

        {/* Quick actions */}
        <Section title="Quick Actions">
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${sub.client_email}?subject=Your%20Upcoming%20Shoot%20with%20The%20Looking%20Glass%20Media`}
              className="flex items-center gap-2 px-4 py-2 bg-brand-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
            >
              <Mail className="w-4 h-4" /> Email Client
            </a>
            {sub.client_phone && (
              <a
                href={`tel:${sub.client_phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-border text-brand-black rounded-full text-sm font-medium hover:border-brand-gold transition-all"
              >
                <Phone className="w-4 h-4" /> Call Client
              </a>
            )}
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact Info">
          <Field label="Name" value={sub.client_name} />
          <Field label="Email" value={sub.client_email} />
          <Field label="Phone" value={sub.client_phone} />
          <Field label="Preferred Date" value={sub.preferred_date} />
          <Field
            label="Booking Confirmed?"
            value={sub.booking_confirmed ? "Yes — already booked via Setmore" : "No — has not booked yet"}
          />
        </Section>

        {/* Session */}
        <Section title="Session Details">
          <Field label="Type" value={SHOOT_TYPE_LABELS[sub.shoot_type] ?? sub.shoot_type} />
          {sub.shoot_type_other && <Field label="Description" value={sub.shoot_type_other} />}
          <Field label="Group Size" value={sub.group_size} />
        </Section>

        {/* Location */}
        <Section title="Location">
          <Field label="City" value={sub.location_city ? CITY_LABELS[sub.location_city] : undefined} />
          <Field label="Selected Location" value={sub.location_name} />
          <Field label="Custom / Notes" value={sub.location_custom} />
          <Field
            label="Outdoor/Indoor Preference"
            value={
              sub.outdoor_indoor_pref === "outdoor" ? "Outdoor"
              : sub.outdoor_indoor_pref === "indoor" ? "Indoor / Studio"
              : "No preference"
            }
          />
          {sub.weather_sensitive && (
            <div className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-2">
              ⛅ Client would like a weather check before shoot day.
            </div>
          )}
        </Section>

        {/* Vision */}
        <Section title="Vision & Mood">
          <Field label="Description" value={sub.vision_description} />
          {sub.moods?.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-brand-muted mb-1.5">Mood</p>
              <div className="flex flex-wrap gap-1.5">
                {sub.moods.map((m) => (
                  <span key={m} className="text-xs bg-brand-cream-dark text-brand-black px-2.5 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* Style */}
        <Section title="Style & Prep">
          <Field label="Color Palette" value={sub.color_palette_choice} />
          <Field label="Outfit Plans" value={sub.outfit_notes} />
          <Field label="Props / Items" value={sub.props} />
          <Field label="Additional Notes" value={sub.additional_notes} />
        </Section>

        {/* Inspiration photos */}
        {sub.inspiration_photo_urls?.length > 0 && (
          <Section title={`Inspiration Photos (${sub.inspiration_photo_urls.length})`}>
            <div className="grid grid-cols-3 gap-3">
              {sub.inspiration_photo_urls.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Inspiration ${i + 1}`}
                    className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </Section>
        )}

        {/* Admin notes */}
        <Section title="Your Notes">
          <textarea
            rows={4}
            placeholder="Add private notes about this client, location scouting, shot list ideas…"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            style={{ resize: "vertical" }}
          />
          <button
            onClick={saveNotes}
            disabled={saving}
            className="mt-2 px-5 py-2 bg-brand-gold text-white rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-all disabled:opacity-50"
          >
            {saved ? "Saved ✓" : saving ? "Saving…" : "Save Notes"}
          </button>
        </Section>
      </div>
    </main>
  );
}
