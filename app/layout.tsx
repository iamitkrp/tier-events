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
        <body className="antialiased text-[var(--cuberto-text-primary)] font-[var(--cuberto-font-matter-reg)] overflow-x-hidden">
          {/* Video Background */}
          <div className="video-background">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/bg/ribbon.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="min-h-screen relative">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
