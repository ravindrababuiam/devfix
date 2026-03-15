import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { ClientShell } from "@/components/layout/ClientShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevFix — Developer Solutions Hub",
    template: "%s | DevFix",
  },
  description:
    "Real engineering problems. Real solutions. A troubleshooting library for software engineers, DevOps, cloud, and automation professionals.",
  metadataBase: new URL(process.env.SITE_URL || "https://devfix.dev"),
  openGraph: {
    title: "DevFix — Developer Solutions Hub",
    description:
      "Real engineering problems. Real solutions. A troubleshooting library for developers.",
    siteName: "DevFix",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevFix — Developer Solutions Hub",
    description:
      "Real engineering problems. Real solutions. A troubleshooting library for developers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  );
}
