import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const font = localFont({
  src: "./cinzel.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Multiverse Mysteries",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-[#22223b] text-white`}>
        {children}
      </body>
    </html>
  );
}
