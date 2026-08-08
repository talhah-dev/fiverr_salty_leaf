import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://www.saltyleaf.com.au";
const siteName = "Salty Leaf";
const defaultTitle = "Salty Leaf Florist | Weddings, Farewells & Events";
const defaultDescription =
  "Salty Leaf is a Mandurah-based florist crafting thoughtful floral experiences for weddings, farewells and events. Bespoke, seasonal, made with care.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "florist Mandurah",
    "wedding florist WA",
    "funeral flowers Mandurah",
    "event florist Western Australia",
    "Salty Leaf",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "florist",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FloristShop",
  name: siteName,
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  telephone: "+61424469349",
  email: "florist@saltyleaf.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5/10 Rafferty Road",
    addressLocality: "Mandurah",
    addressRegion: "WA",
    postalCode: "6210",
    addressCountry: "AU",
  },
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <SmoothScroll />
        {children}
        <Toaster />
      </body>
    </html>
  );
}