import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nerds Room | Student Innovation Community",
  description: "A premium student innovation community for AI, startups, and builders.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE ?? "http://localhost:3000"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Nerds Room — Student Innovation Community",
    description: "Ship products, launch startups, and learn through live experiments.",
    images: [
      {
        url: "/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Nerds Room — Student innovation community",
      },
      {
        url: "/og-image-600x315.png",
        width: 600,
        height: 315,
        alt: "Nerds Room — Student innovation community (small)",
      },
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Nerds Room — vector preview",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preload" href="/logo.png" as="image" />
        <meta name="theme-color" content="#05060a" />
        {GA_ID && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        )}
      </head>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        <a href="#content" className="skip-link absolute left-2 top-2 z-100 rounded bg-slate-900/80 px-3 py-2 text-xs text-white opacity-0 focus:opacity-100">
          Skip to content
        </a>

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
            </Script>
          </>
        )}

        {children}
      </body>
    </html>
  );
}
