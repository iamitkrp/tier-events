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

  const getTierColor = (tier: Tier) => {
    switch (tier) {
      case 'free':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'silver':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Don't show upgrade button if already at highest tier
  if (!nextTier) {
    return (
      <div className="text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Maximum Tier Achieved!</h3>
        <p className="text-gray-600">
          You have <span className="font-semibold text-purple-600">Platinum access</span> and can view all exclusive events.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          Upgrade to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
        </h3>
        <p className="text-sm text-gray-600">
          Unlock more exclusive events and premium content
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTierColor(currentTier)}`}>
            {currentTier.toUpperCase()}
          </span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTierColor(nextTier)}`}>
            {nextTier.toUpperCase()}
          </span>
        </div>
        
        <button
          onClick={handleUpgrade}
          disabled={isUpgrading}
          className={`px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap ${
            isUpgrading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUpgrading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
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
      </div>
    </div>
  );
}