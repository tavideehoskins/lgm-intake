import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shoot Intake | The Looking Glass Media",
  description:
    "Tell us about your upcoming session so we can make your shoot exactly what you envision.",
  openGraph: {
    title: "Shoot Intake | The Looking Glass Media",
    description: "Plan your perfect shoot with The Looking Glass Media.",
    siteName: "The Looking Glass Media",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream">
        {children}
      </body>
    </html>
  );
}
