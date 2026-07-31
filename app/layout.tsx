import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "dr-mritunjaysp.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Dr. Mritunjay Shall Peelam",
      template: "%s · Dr. Mritunjay Shall Peelam",
    },
    description:
      "Academic portfolio of Dr. Mritunjay Shall Peelam, Assistant Professor (Selection Grade) at UPES Dehradun, researching Blockchain, IoT, Edge AI, Federated Learning, and Multimodal Machine Learning.",
    keywords: [
      "Mritunjay Shall Peelam",
      "UPES Dehradun",
      "Blockchain",
      "Internet of Things",
      "Edge AI",
      "Intelligent Transportation Systems",
      "Multimodal Machine Learning",
    ],
    authors: [{ name: "Dr. Mritunjay Shall Peelam" }],
    icons: {
      icon: "/apple-touch-icon.png",
      shortcut: "/apple-touch-icon.png",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      url: origin,
      title: "Dr. Mritunjay Shall Peelam",
      description:
        "Assistant Professor (Selection Grade) · Researcher in Blockchain, IoT, Edge AI, and Multimodal ML.",
      siteName: "Dr. Mritunjay Shall Peelam",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1736,
          height: 909,
          alt: "Dr. Mritunjay Shall Peelam academic portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dr. Mritunjay Shall Peelam",
      description:
        "Assistant Professor (Selection Grade) · Researcher in Blockchain, IoT, Edge AI, and Multimodal ML.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
