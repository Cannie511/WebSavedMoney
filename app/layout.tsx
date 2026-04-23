import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Inter } from 'next/font/google';
import { Toaster } from "sonner";
import { Providers } from "@/components/ui/provider";
import Background from "@/components/background";

const inter = Inter({
  subsets: ['vietnamese'],
  variable: '--font-inter',
});

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SavingPig",
  description: "Saving with Như Thanh",
  icons: {
    apple: "/savedPig.png",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", figtree.variable)}
      suppressHydrationWarning
    >
      <head />
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen w-full relative">
      {/* Aurora Dream Soft Harmony */}
      
        <Background/>
         
            <Toaster richColors position="top-center"/>
            {children}
        </div>
         
        </Providers>
        
       </body>
    </html>
  );
}
