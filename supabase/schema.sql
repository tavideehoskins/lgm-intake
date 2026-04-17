-- ============================================================
-- The Looking Glass Media — Shoot Intake App
-- Run this in your Supabase SQL Editor to set up the database
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── SUBMISSIONS TABLE ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS submissions (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Contact
  client_name           TEXT NOT NULL,
  client_email          TEXT NOT NULL,
  client_phone          TEXT,
  preferred_date        TEXT,
  booking_confirmed     BOOLEAN DEFAULT FALSE,

  -- Session
  shoot_type            TEXT NOT NULL,
  shoot_type_other      TEXT,
  group_size            TEXT,

  -- Location
  location_city         TEXT,
  location_id           TEXT,
  location_name         TEXT,
  location_custom       TEXT,
  outdoor_indoor_pref   TEXT DEFAULT 'no_preference',
  weather_sensitive     BOOLEAN DEFAULT FALSE,

  -- Vision
  vision_description    TEXT,
  moods                 TEXT[] DEFAULT '{}',

  -- Style
  color_palette_choice  TEXT,
  outfit_notes          TEXT,
  props                 TEXT,
  additional_notes      TEXT,

  -- Inspiration photos (public URLs from Storage)
  inspiration_photo_urls TEXT[] DEFAULT '{}',

  -- Admin
  status                TEXT DEFAULT 'new' CHECK (status IN ('new','reviewed','confirmed','completed')),
  admin_notes           TEXT DEFAULT ''
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_submissions_status      ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_shoot_type  ON submissions(shoot_type);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at  ON submissions(created_at DESC);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
-- Disable RLS (we use service role key server-side only)
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;

-- ─── STORAGE BUCKET ──────────────────────────────────────────
-- Run this in Supabase Dashboard → Storage → New bucket
-- Name: intake
-- Public: true (so public URLs work for inspiration photos)

-- To create via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('intake', 'intake', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public reads on the intake bucket
CREATE POLICY "Public read intake bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'intake');

-- Allow service role to insert (handled server-side)
CREATE POLICY "Service role upload intake"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'intake');
