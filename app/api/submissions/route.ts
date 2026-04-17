import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { getLocationById } from "@/lib/locations";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const supabase = getServiceClient();

    // Parse fields
    const get = (key: string) => formData.get(key)?.toString() ?? "";
    const moodsRaw = get("moods");
    const moods: string[] = moodsRaw ? JSON.parse(moodsRaw) : [];

    const locationId = get("locationId");
    const loc = locationId ? getLocationById(locationId) : null;

    // Upload inspiration photos to Supabase Storage
    const photoUrls: string[] = [];
    const photoFiles = formData.getAll("inspirationPhotos") as File[];

    for (const file of photoFiles) {
      if (!(file instanceof File)) continue;
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `inspiration/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("intake")
        .upload(path, file, { contentType: file.type });
      if (!uploadErr) {
        const { data: urlData } = supabase.storage.from("intake").getPublicUrl(path);
        if (urlData.publicUrl) photoUrls.push(urlData.publicUrl);
      }
    }

    // Insert submission
    const { data, error } = await supabase
      .from("submissions")
      .insert({
        client_name:          get("clientName"),
        client_email:         get("clientEmail"),
        client_phone:         get("clientPhone"),
        preferred_date:       get("preferredDate"),
        booking_confirmed:    get("bookingConfirmed") === "true",
        shoot_type:           get("shootType"),
        shoot_type_other:     get("shootTypeOther"),
        group_size:           get("groupSize"),
        location_city:        get("locationCity"),
        location_id:          locationId,
        location_name:        loc?.name ?? get("locationCustom"),
        location_custom:      get("locationCustom"),
        outdoor_indoor_pref:  get("outdoorIndoorPref"),
        weather_sensitive:    get("weatherSensitive") === "true",
        vision_description:   get("visionDescription"),
        moods,
        color_palette_choice: get("colorPaletteChoice"),
        outfit_notes:         get("outfitNotes"),
        props:                get("props"),
        additional_notes:     get("additionalNotes"),
        inspiration_photo_urls: photoUrls,
        status:               "new",
        admin_notes:          "",
      })
      .select()
      .single();

    if (error) throw error;

    // Send notification email (best-effort)
    try {
      await sendNotificationEmail(data);
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (err: unknown) {
    console.error("Submission error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Submission failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Admin-only: list all submissions
  try {
    const supabase = getServiceClient();
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const shootType = url.searchParams.get("shootType");

    let query = supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (shootType) query = query.eq("shoot_type", shootType);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch" },
      { status: 500 }
    );
  }
}

async function sendNotificationEmail(submission: Record<string, unknown>) {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!notifyEmail) return;

  // Use Gmail SMTP via nodemailer if configured; otherwise skip
  // (configured via GMAIL_USER + GMAIL_APP_PASSWORD env vars)
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) return;

  // Dynamic import to avoid bundling if not configured
  const nodemailer = await import("nodemailer").catch(() => null);
  if (!nodemailer) return;

  const transporter = nodemailer.default.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  await transporter.sendMail({
    from: `"LGM Intake" <${gmailUser}>`,
    to: notifyEmail,
    subject: `New Intake: ${submission.client_name} — ${submission.shoot_type}`,
    html: `
      <h2>New Shoot Intake Submitted</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 12px;font-weight:bold;color:#AB830A">Name</td><td>${submission.client_name}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;color:#AB830A">Email</td><td>${submission.client_email}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;color:#AB830A">Phone</td><td>${submission.client_phone || '—'}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;color:#AB830A">Shoot Type</td><td>${submission.shoot_type}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;color:#AB830A">Location</td><td>${submission.location_name || submission.location_custom || '—'}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;color:#AB830A">Date</td><td>${submission.preferred_date || 'Not specified'}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;color:#AB830A">Group Size</td><td>${submission.group_size}</td></tr>
      </table>
      <p><a href="${process.env.NEXTAUTH_URL ?? 'https://your-app.vercel.app'}/admin/dashboard/${submission.id}" style="background:#AB830A;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold">View Full Intake →</a></p>
    `,
  });
}
