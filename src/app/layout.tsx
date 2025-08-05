import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "NakedTruth - Forecasting Nigeria's 2027 Elections",
  description: "Anonymous polling and data-driven insights ahead of Nigeria's 2027 presidential elections. Secure, transparent forecasting platform for voter sentiment analysis.",
  keywords: "Nigeria elections 2027, polling, forecasting, voter sentiment, INEC, presidential election, anonymous voting",
  authors: [{ name: "NakedTruth Team" }],
  creator: "NakedTruth",
  publisher: "NakedTruth",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nakedtruth.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "NakedTruth - Forecasting Nigeria's 2027 Elections",
    description: "Anonymous polling and data-driven insights ahead of Nigeria's 2027 presidential elections",
    url: 'https://nakedtruth.com',
    siteName: 'NakedTruth',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NakedTruth - Forecasting Nigeria's 2027 Elections",
    description: "Anonymous polling and data-driven insights ahead of Nigeria's 2027 presidential elections",
    creator: '@nakedtruthng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
