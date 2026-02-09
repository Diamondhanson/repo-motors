import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://repomotors.com"),
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  title: {
    default: "Repo Motors - Bank Repossessed & Fairly Used Cars",
    template: "%s | Repo Motors",
  },
  description:
    "Trust-first marketplace for fairly used and bank-repossessed cars. Fixed prices, no auctions. Find your next vehicle with confidence.",
  keywords: [
    "bank repossessed cars",
    "repo cars",
    "used cars",
    "fairly used vehicles",
    "pre-owned cars",
    "certified used cars",
    "repo motors",
    "buy repossessed cars",
    "affordable cars",
  ],
  authors: [{ name: "Repo Motors" }],
  creator: "Repo Motors",
  publisher: "Repo Motors",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://repomotors.com",
    siteName: "Repo Motors",
    title: "Repo Motors - Bank Repossessed & Fairly Used Cars",
    description:
      "Trust-first marketplace for fairly used and bank-repossessed cars. Fixed prices, no auctions. Find your next vehicle with confidence.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Repo Motors - Quality Pre-Owned Vehicles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Repo Motors - Bank Repossessed & Fairly Used Cars",
    description:
      "Trust-first marketplace for fairly used and bank-repossessed cars. Fixed prices, no auctions.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
