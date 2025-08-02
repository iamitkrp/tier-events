import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

export const metadata: Metadata = {
  title: "Tier Events",
  description: "Event showcase with tier-based access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className="antialiased overflow-x-hidden m-0 p-0">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
