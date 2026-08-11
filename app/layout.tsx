import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "From Five Minutes to Real Impact",
  description: "A summer of building, testing, and learning where AI actually helps at the Center for Ocean Leadership.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
