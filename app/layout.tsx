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
        <body className="antialiased bg-[var(--cuberto-bg-main)] text-[var(--cuberto-text-primary)] font-[var(--cuberto-font-matter-reg)] overflow-x-hidden">
          <div className="min-h-screen bg-[var(--cuberto-bg-main)]">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
