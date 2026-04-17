# LGM Intake — Shoot Intake App

Client intake wizard + admin dashboard for **The Looking Glass Media**.

---

## One-Time Setup

### 1. Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Copy your keys from **Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 2. Gmail App Password

1. Go to your Google Account → **Security → 2-Step Verification → App Passwords**
2. Create a new app password named "LGM Intake"
3. Copy the 16-character code → `GMAIL_APP_PASSWORD`

### 3. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in the values in `.env.local` (see `.env.local.example` for instructions).

### 4. Install & Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — client intake form  
Open [http://localhost:3000/admin](http://localhost:3000/admin) — admin login

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in your [Vercel dashboard](https://vercel.com/new)
3. Add all environment variables from `.env.local` in Vercel's **Settings → Environment Variables**
   - Change `NEXTAUTH_URL` to your Vercel deployment URL (e.g. `https://lgm-intake.vercel.app`)
   - Change `JWT_SECRET` to a long random string
4. Deploy

---

## How to Use

### Client Side (`/`)
Clients fill out a 7-step wizard:
1. Contact info + preferred date
2. Session type + group size
3. Location selection (Baton Rouge, Lafayette, New Orleans)
4. Vision description + mood selection
5. Inspiration photo uploads (up to 6)
6. Style guide + outfit/color prep
7. Review & submit

On submission, you'll receive an email notification at `NOTIFY_EMAIL`.

### Admin Side (`/admin`)
- Login with the password from `ADMIN_PASSWORD`
- View all submissions, filter by status and session type
- Click any submission to see full details
- Update status: New → Reviewed → Confirmed → Completed
- Add private notes
- One-click to email or call the client

---

## File Structure

```
app/
  page.tsx                  # Client intake wizard page
  admin/
    page.tsx                # Admin login
    dashboard/
      page.tsx              # Submissions list
      [id]/page.tsx         # Submission detail
  api/
    submissions/
      route.ts              # POST (create), GET (list)
      [id]/route.ts         # GET (fetch), PATCH (update)
    admin/
      login/route.ts        # Auth
      logout/route.ts       # Clear cookie
components/
  intake/
    IntakeWizard.tsx        # 7-step wizard shell
    steps/                  # Step1Contact … Step7Review
lib/
  auth.ts                   # JWT helpers
  locations.ts              # All 18 shoot locations
  style-guides.ts           # Per-shoot-type style guides
  supabase.ts               # DB clients
  utils.ts                  # Formatters, labels
types/index.ts              # All TypeScript types
supabase/schema.sql         # Run this to set up the DB
```

---

## Configuration

### Change the Admin Password
Update `ADMIN_PASSWORD` in `.env.local` (and in Vercel env vars for production).

### Add or Edit Locations
Edit `lib/locations.ts`. Each location needs: `id`, `name`, `city`, `category`, `description`, `address`, `tags[]`, and optionally `priceNote`, `imageUrl`, `bestFor`.

### Edit Style Guides
Edit `lib/style-guides.ts`. Each shoot type can have custom color palettes, outfit tips, and pro tips.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Auth | JWT via `jose` |
| Email | Nodemailer + Gmail SMTP |
| Deployment | Vercel |
