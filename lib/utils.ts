import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
}

export function formatDateTime(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  });
}

export const SHOOT_TYPE_LABELS: Record<string, string> = {
  graduation: "Graduation",
  headshot: "Headshots",
  branding: "Branding / Lifestyle",
  maternity: "Maternity",
  family: "Family Portraits",
  birthday: "Birthday",
  engagement: "Engagement",
  event: "Event Coverage",
  holiday: "Holiday / Seasonal",
  other: "Other",
};

export const STATUS_LABELS: Record<string, string> = {
  new: "New",
  reviewed: "Reviewed",
  confirmed: "Confirmed",
  completed: "Completed",
};
