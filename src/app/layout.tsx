import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/LayoutShell";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ravity Fleet",
  description: "Power your mobility stack with artificial intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/jpeg" />
      </head>
      <body className={`${plusJakarta.variable} ${geistMono.variable} antialiased font-sans`}>
        <div style={{ zoom: '0.9' }}>
          <LayoutShell>{children}</LayoutShell>
        </div>
      </body>
    </html>
  );
}
