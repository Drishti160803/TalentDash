import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/features/site-header";
import { SiteFooter } from "@/components/features/site-footer";
import { SavedItemsProvider } from "@/lib/store/saved-items";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "TalentDash — Real Salary Data for Indian Tech",
    template: "%s · TalentDash",
  },
  description:
    "Compensation intelligence for India's tech industry. Compare real salary data across companies, levels, and cities — decision-ready, not crowd-sourced guesswork.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased flex min-h-screen flex-col`}>
        <SavedItemsProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </SavedItemsProvider>
      </body>
    </html>
  );
}
