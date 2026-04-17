export type ShootType =
  | "graduation"
  | "headshot"
  | "branding"
  | "maternity"
  | "family"
  | "birthday"
  | "engagement"
  | "event"
  | "holiday"
  | "other";

export type LocationCategory = "natural" | "urban" | "hybrid" | "studio";
export type LocationCity = "baton_rouge" | "lafayette" | "new_orleans" | "flexible" | "other";

export type SubmissionStatus = "new" | "reviewed" | "confirmed" | "completed";

export interface Location {
  id: string;
  name: string;
  city: LocationCity;
  category: LocationCategory;
  description: string;
  address?: string;
  priceNote?: string;
  tags: string[];
  imageUrl: string;
  bestFor: ShootType[];
}

export interface StyleGuide {
  shootType: ShootType;
  colorPalettes: ColorPalette[];
  outfitTips: string[];
  whatToAvoid: string[];
  whatToBring: string[];
  proTips: string[];
}

export interface ColorPalette {
  name: string;
  colors: string[];
  description: string;
}

export interface IntakeFormData {
  // Step 1 — Contact
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  bookingConfirmed: boolean;

  // Step 2 — Occasion
  shootType: ShootType | "";
  shootTypeOther: string;
  groupSize: string;

  // Step 3 — Location
  locationCity: LocationCity | "";
  locationId: string;
  locationCustom: string;
  outdoorIndoorPref: "outdoor" | "indoor" | "no_preference";
  weatherSensitive: boolean;

  // Step 4 — Vision
  visionDescription: string;
  moods: string[];

  // Step 5 — Uploads
  inspirationPhotos: File[];

  // Step 6 — Style & Prep
  colorPaletteChoice: string;
  outfitNotes: string;
  props: string;
  additionalNotes: string;
}

export interface Submission {
  id: string;
  created_at: string;

  // Contact
  client_name: string;
  client_email: string;
  client_phone: string;
  preferred_date: string;
  booking_confirmed: boolean;

  // Occasion
  shoot_type: ShootType;
  shoot_type_other: string;
  group_size: string;

  // Location
  location_city: LocationCity;
  location_id: string;
  location_name: string;
  location_custom: string;
  outdoor_indoor_pref: string;
  weather_sensitive: boolean;

  // Vision
  vision_description: string;
  moods: string[];

  // Style
  color_palette_choice: string;
  outfit_notes: string;
  props: string;
  additional_notes: string;

  // Inspiration photo URLs (from Supabase Storage)
  inspiration_photo_urls: string[];

  // Admin
  status: SubmissionStatus;
  admin_notes: string;
}
