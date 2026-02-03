import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers";
import Footer from "@/components/ui/Footer";
import { Header } from "@/components/ui/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dir-Khir - Plateforme d'Entraide Citoyenne",
  description: "L'entraide de quartier, de Tanger à Lagouira. Connectez les cœurs bienveillants pour coordonner la solidarité de proximité.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header/>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
