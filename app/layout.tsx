import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITZ FIZZ — The Road Is Yours",
  description: "A cinematic, scroll-driven automotive experience.",
};

export const viewport: Viewport = {
  themeColor: "#1c232b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
