import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--cuberto-bg-main)] relative">
      {/* User Profile in top right corner - only when signed in */}
      <SignedIn>
        <div className="fixed top-4 right-4 lg:top-6 lg:right-6 z-50">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      {/* Main Layout with Divider */}
      <div className="lg:min-h-screen lg:flex lg:flex-row">
        {/* Content Section - Full screen on mobile, half width on desktop */}
        <div className="min-h-screen lg:w-1/2 bg-gradient-to-br from-[var(--cuberto-bg-main)] to-[var(--cuberto-bg-section)] relative flex items-center justify-center px-6 py-16 lg:px-0 lg:py-0">
          <div className="cuberto-container w-full">
            <div className="animate-fade-in-up max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              
              {/* Title section */}
              <h1 className="leading-tight text-4xl sm:text-5xl lg:text-[7vw] mb-20">
                Unlock Exclusive{' '}
                <span className="block text-gradient">Tier-Based Events</span>
              </h1>
              
              {/* Description section */}
              <p className="text-[var(--cuberto-text-secondary)] text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 mb-20">
                Discover premium events, masterclasses, and networking opportunities tailored to your membership tier.
              </p>
              
              {/* Button section */}
              <div className="flex justify-center lg:justify-start">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <button className="cb-btn_more3">
                      Sign Up or Login
                    </button>
                  </SignUpButton>
                </SignedOut>
                
                <SignedIn>
                  <Link href="/events" className="cb-btn_more3">
                    Browse Events
                  </Link>
                </SignedIn>
              </div>
              
            </div>
          </div>
        </div>

        {/* Right Side - Visual Divider (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 relative lg:min-h-screen">
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
