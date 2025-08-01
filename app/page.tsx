import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--cuberto-bg-main)] relative">
      {/* User Profile in top right corner - only when signed in */}
      <SignedIn>
        <div className="fixed top-6 right-6 z-50">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      {/* Main Layout with Divider */}
      <div className="min-h-screen flex">
        {/* Left Side - Content */}
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-[var(--cuberto-bg-main)] to-[var(--cuberto-bg-section)] relative">
          <div className="cuberto-container w-full">
            <div className="animate-fade-in-up max-w-2xl">
              <h1 className="mb-8 leading-tight">
                Unlock Exclusive{' '}
                <span className="block text-gradient">Tier-Based Events</span>
              </h1>
              <p className="text-[var(--cuberto-text-secondary)] text-xl mb-12">
                Discover premium events, masterclasses, and networking opportunities tailored to your membership tier.
              </p>
              
              <div className="flex">
                <SignedOut>
                  <Link href="/eventslocked" className="cb-btn_more3">
                    Browse Events
                  </Link>
                </SignedOut>
                
                <SignedIn>
                  <Link href="/eventsunlocked" className="cb-btn_more3">
                    Go to Events
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Divider */}
        <div className="w-1/2 relative">
          {/* Vertical Divider Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--cuberto-border-dark)] to-transparent"></div>
          
          {/* Background Pattern or Visual Element */}
          <div className="w-full h-full bg-gradient-to-br from-[var(--cuberto-bg-section)] to-[var(--cuberto-bg-main)] flex items-center justify-center">
            {/* Decorative Elements */}
            <div className="relative">
              {/* Floating circles */}
              <div className="absolute -top-20 -left-20 w-16 h-16 rounded-full bg-gradient-to-r from-[var(--cuberto-accent-blue)] to-[var(--cuberto-accent-purple)] opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-16 -right-16 w-12 h-12 rounded-full bg-gradient-to-r from-[var(--cuberto-accent-teal)] to-[var(--cuberto-accent-orange)] opacity-30 animate-pulse-slow2"></div>
              <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-gradient-to-r from-[var(--cuberto-accent-purple)] to-[var(--cuberto-accent-blue)] opacity-25 animate-pulse-slow3"></div>
              
              {/* Central Icon or Visual */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--cuberto-accent-blue)] to-[var(--cuberto-accent-purple)] flex items-center justify-center shadow-heavy">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
