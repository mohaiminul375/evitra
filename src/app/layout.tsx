import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';
import QueryProvider from "../Provider/QueryProvider";
import { AuthProvider } from "@/Provider/AuthProvider";
import Footer from "@/components/Shared/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const playfair_Display = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Evitra",
    template: "%s | Evitra"
  },
  description: "Evitra is a Event Management Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair_Display.className} antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className="md:max-w-7xl mx-auto my-32 min-h-[calc(100vh-524px)]">
                {children}
              </main>
              <Footer />
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html >
  );
}
