import type { Metadata } from "next";
import { Poppins, Outfit } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Morning Cards",
  description: "4 surprise cards every morning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable}`}>
      <body className="bg-morning-animated min-h-screen text-white antialiased">
        {children}
      </body>
    </html>
  );
}
