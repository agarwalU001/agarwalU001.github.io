import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://utkarsh-agarwal.me"),
  alternates: { canonical: "/" },
  title: "Utkarsh Agarwal | Full-Stack Software Engineer",
  description:
    "Utkarsh Agarwal is a full-stack software engineer in Hyderabad building fast, secure enterprise web platforms with Java, Angular, React and micro-frontends. Available for freelance projects.",
  openGraph: {
    title: "Utkarsh Agarwal | Full-Stack Software Engineer",
    description:
      "Java · Angular · React · Micro-frontends. 4+ years building enterprise SaaS. Available for freelance.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="grain">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
