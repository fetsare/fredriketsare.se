import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { socialLinks } from "@/content/meta";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Fredrik Etsare - Portfolio",
    template: "%s | Fredrik Etsare",
  },
  description: "Personal portfolio and blog",
  keywords: [
    "Fredrik Etsare",
    "portfolio",
    "web developer",
    "software engineer",
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Stockholm",
  ],
  applicationName: "Fredrik Etsare",
  authors: [{ name: "Fredrik Etsare" }],
  creator: "Fredrik Etsare",
  publisher: "Fredrik Etsare",
  category: "technology",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
    url: false,
    date: true,
  },
  icons: {
    icon: "/fredriketsare.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        {/* JSON-LD structured data (only when a public site URL exists) */}
        {siteUrl && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Fredrik Etsare",
                url: siteUrl,
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${siteUrl}/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Fredrik Etsare",
              jobTitle: "Web Developer",
              ...(siteUrl ? { url: siteUrl } : {}),
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Align content to the top so the navbar doesn't shift vertically between pages */}
        <div className="min-h-screen px-6 py-8 pt-20">
          <div className="max-w-4xl w-full mx-auto">
            <FadeInSection direction="up">
              <div className="flex items-center gap-4 mb-2">
                <Image
                  src="/images/me.jpg"
                  alt="Fredrik Etsare"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <h1 className="text-4xl md:text-5xl font-bold ">
                  Fredrik Etsare
                </h1>
              </div>
            </FadeInSection>
            <Navbar />
            <main className="my-8">{children}</main>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <FadeInSection key={index} direction="up" delay={index * 100}>
                    <Link
                      target="_blank"
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      aria-label={link.label}
                    >
                      <Icon size={24} />
                    </Link>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
