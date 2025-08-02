import { SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function EventsLocked() {
  return (
    <div className="min-h-screen bg-[var(--cuberto-bg-main)] relative">
      {/* Main Content - Centered */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--cuberto-bg-main)] to-[var(--cuberto-bg-section)]">
        <div className="cuberto-container">
          <div className="text-center animate-fade-in-up max-w-2xl mx-auto">
            {/* Lock Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--cuberto-accent-blue)] to-[var(--cuberto-accent-purple)] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h1 className="mb-6">
              Events Are <span className="text-gradient">Locked</span>
            </h1>
            
            <p className="text-[var(--cuberto-text-secondary)] text-xl mb-12">
              Sign in to unlock exclusive tier-based events and start your journey with premium content.
            </p>
            
            <div className="space-y-6">
              <SignInButton mode="modal">
                <button className="cb-btn_more3">
                  Sign In to Unlock
                </button>
              </SignInButton>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-[var(--cuberto-text-muted)]">
                <span>✓ Free to start</span>
                <span>✓ Instant access</span>
                <span>✓ No credit card required</span>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-12">
              <Link href="/" className="text-[var(--cuberto-text-secondary)] hover:text-[var(--cuberto-text-primary)] transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}