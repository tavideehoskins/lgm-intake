"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw, Filter } from "lucide-react";
import type { Submission } from "@/types";
import { formatDateTime, SHOOT_TYPE_LABELS } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  new:       "badge-new",
  reviewed:  "badge-reviewed",
  confirmed: "badge-confirmed",
  completed: "badge-completed",
};

const STATUSES = ["all", "new", "reviewed", "confirmed", "completed"];

export default function DashboardPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("shootType", typeFilter);
      const res = await fetch(`/api/submissions?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSubmissions(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [statusFilter, typeFilter]);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  const counts = submissions.reduce<Record<string, number>>((acc, s) => {
    acc[s.status] = (acc[s.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Top bar */}
      <header className="bg-brand-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="LGM"
            className="h-8 invert"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div>
            <p className="font-semibold text-sm">Intake Dashboard</p>
            <p className="text-white/50 text-xs">{submissions.length} submission{submissions.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSubmissions}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Status summary cards */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {["new", "reviewed", "confirmed", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s === statusFilter ? "all" : s)}
              className={`bg-white border rounded-xl p-3 text-center transition-all ${
                statusFilter === s ? "border-brand-gold shadow-sm" : "border-brand-border"
              }`}
            >
              <p className="text-2xl font-serif font-bold text-brand-black">
                {counts[s] ?? 0}
              </p>
              <p className="text-xs text-brand-muted capitalize mt-0.5">{s}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <Filter className="w-4 h-4 text-brand-muted" />
          <div className="flex gap-1 flex-wrap">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  statusFilter === s
                    ? "bg-brand-black text-white border-brand-black"
                    : "bg-white border-brand-border text-brand-muted hover:border-brand-gold"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="ml-auto text-xs py-1 px-3 rounded-full border border-brand-border bg-white"
            style={{ width: "auto" }}
          >
            <option value="all">All session types</option>
            {Object.entries(SHOOT_TYPE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {/* Submissions table */}
        {loading ? (
          <div className="text-center py-16 text-brand-muted text-sm animate-pulse">
            Loading submissions…
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-16 text-brand-muted">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">No submissions yet</p>
            <p className="text-sm mt-1">Share your intake form link with clients to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((s) => (
              <button
                key={s.id}
                onClick={() => router.push(`/admin/dashboard/${s.id}`)}
                className="w-full text-left bg-white border border-brand-border rounded-xl p-4 hover:border-brand-gold hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-brand-black">{s.client_name}</p>
                      <span className={STATUS_COLORS[s.status]}>{s.status}</span>
                    </div>
                    <p className="text-sm text-brand-muted">
                      {SHOOT_TYPE_LABELS[s.shoot_type] ?? s.shoot_type}
                      {s.location_name ? ` · ${s.location_name}` : ""}
                      {s.preferred_date ? ` · ${s.preferred_date}` : ""}
                    </p>
                    <p className="text-xs text-brand-muted mt-1">
                      {s.client_email}
                      {s.client_phone ? ` · ${s.client_phone}` : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-brand-muted">{formatDateTime(s.created_at)}</p>
                    {s.inspiration_photo_urls?.length > 0 && (
                      <p className="text-xs text-brand-gold mt-1">
                        📷 {s.inspiration_photo_urls.length} photo{s.inspiration_photo_urls.length > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
