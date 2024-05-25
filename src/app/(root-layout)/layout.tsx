import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import AuthProvider from "@/context/AuthProvider";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}