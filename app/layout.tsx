import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Where AI Actually Helps",
  description: "A summer of building, testing, and learning at the Center for Ocean Leadership.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
