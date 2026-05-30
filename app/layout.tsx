import type { Metadata } from "next";
import "./globals.css"; // THIS IS THE CRUCIAL LINE!

export const metadata: Metadata = {
  title: "Lumina Dashboard",
  description: "Next-Gen Learning Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}