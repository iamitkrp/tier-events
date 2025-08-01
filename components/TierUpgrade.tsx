'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const TIER_HIERARCHY = ['free', 'silver', 'gold', 'platinum'] as const;
type Tier = typeof TIER_HIERARCHY[number];

export default function TierUpgrade() {
  const { user } = useUser();
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  const currentTier = (user?.unsafeMetadata?.tier as Tier) || 'free';
  const currentIndex = TIER_HIERARCHY.indexOf(currentTier);
  const nextTier = TIER_HIERARCHY[currentIndex + 1];
  
  const handleUpgrade = async () => {
    if (!nextTier || !user) return;
    
    setIsUpgrading(true);
    
    try {
      // Update user metadata to simulate tier upgrade
      await user.update({
        unsafeMetadata: {
          tier: nextTier,
        },
      });
      
      // Refresh the page to show new events
      window.location.reload();
    } catch (error) {
      console.error('Error upgrading tier:', error);
      alert('Failed to upgrade tier. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  const getTierGradient = (tier: Tier) => {
    switch (tier) {
      case 'silver':
        return 'from-[var(--cuberto-accent-blue)] to-[var(--cuberto-accent-purple)]';
      case 'gold':
        return 'from-[var(--cuberto-accent-purple)] to-[var(--cuberto-accent-teal)]';
      case 'platinum':
        return 'from-[var(--cuberto-accent-teal)] to-[var(--cuberto-accent-orange)]';
      default:
        return 'from-[var(--cuberto-accent-blue)] to-[var(--cuberto-accent-purple)]';
    }
  };

  // Don't show upgrade button if already at highest tier
  if (!nextTier) {
    return (
      <div className="cuberto-card p-8 bg-gradient-to-br from-[var(--cuberto-bg-main)] to-[var(--cuberto-bg-section)] border-2 border-[var(--cuberto-accent-orange)] animate-pulse-slow">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--cuberto-accent-teal)] to-[var(--cuberto-accent-orange)] rounded-full flex items-center justify-center mx-auto mb-6 animate-wiggle">
            <svg className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-[var(--cuberto-text-primary)] mb-4">🎉 Maximum Tier Achieved!</h3>
          <p className="text-[var(--cuberto-text-secondary)] text-lg">
            Congratulations! You have <span className="text-gradient font-semibold">Platinum access</span> and can view all exclusive events and premium content.
          </p>
          <div className="mt-6 flex justify-center space-x-4 text-sm text-[var(--cuberto-text-muted)]">
            <span>✓ All Events</span>
            <span>✓ VIP Access</span>
            <span>✓ Premium Support</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cuberto-card p-8 bg-gradient-to-br from-[var(--cuberto-bg-main)] to-[var(--cuberto-bg-section)] animate-fade-in-up">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--cuberto-light-gray)] to-[var(--cuberto-border-light)] rounded-full flex items-center justify-center">
            <span className="text-[var(--cuberto-text-primary)] font-bold text-sm">{currentTier.toUpperCase()}</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-[var(--cuberto-accent-blue)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-xs text-[var(--cuberto-text-muted)]">upgrade</span>
          </div>
          <div className={`w-16 h-16 bg-gradient-to-br ${getTierGradient(nextTier)} rounded-full flex items-center justify-center animate-pulse-slow`}>
            <span className="text-white font-bold text-sm">{nextTier.toUpperCase()}</span>
          </div>
        </div>
        
        <h3 className="mb-4 text-2xl">
          Upgrade to <span className="text-gradient">{nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}</span>
        </h3>
        
        <p className="text-[var(--cuberto-text-secondary)] mb-8 text-lg">
          Unlock exclusive events and premium content with your next tier upgrade.
          Get access to more networking opportunities and specialized workshops.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
          <div className="flex items-center justify-center space-x-2 text-[var(--cuberto-text-secondary)]">
            <svg className="w-4 h-4 text-[var(--cuberto-accent-blue)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>More Events</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-[var(--cuberto-text-secondary)]">
            <svg className="w-4 h-4 text-[var(--cuberto-accent-purple)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Premium Content</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-[var(--cuberto-text-secondary)]">
            <svg className="w-4 h-4 text-[var(--cuberto-accent-teal)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Priority Access</span>
          </div>
        </div>
        
        <button
          onClick={handleUpgrade}
          disabled={isUpgrading}
          className={`cb-btn_more2 ${
            isUpgrading
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {isUpgrading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Upgrading...
            </>
          ) : (
            `Upgrade to ${nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}`
          )}
        </button>
        
        <p className="text-[var(--cuberto-text-muted)] text-sm mt-6">
          * This is a simulation - no actual payment required
        </p>
      </div>
    </div>
  );
}