'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const TIER_HIERARCHY = ['free', 'silver', 'gold', 'platinum'] as const;
type Tier = typeof TIER_HIERARCHY[number];

export default function TierUpgrade() {
  const { user } = useUser();
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  const currentTier = (user?.publicMetadata?.tier as Tier) || 'free';
  const currentIndex = TIER_HIERARCHY.indexOf(currentTier);
  const nextTier = TIER_HIERARCHY[currentIndex + 1];
  
  const handleUpgrade = async () => {
    if (!nextTier || !user) return;
    
    setIsUpgrading(true);
    
    try {
      // Update user metadata to simulate tier upgrade
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
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

  // Don't show upgrade button if already at highest tier
  if (!nextTier) {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-purple-700">
              Congratulations! You have the highest tier access and can view all events.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upgrade Your Tier
        </h3>
        <p className="text-gray-600 mb-4">
          Upgrade from <span className="font-medium text-gray-900">{currentTier}</span> to{' '}
          <span className="font-medium text-blue-600">{nextTier}</span> to access more exclusive events!
        </p>
        <button
          onClick={handleUpgrade}
          disabled={isUpgrading}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors ${
            isUpgrading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isUpgrading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
        <p className="text-xs text-gray-500 mt-2">
          * This is a simulation - no actual payment required
        </p>
      </div>
    </div>
  );
}