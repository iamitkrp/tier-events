'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const TIER_HIERARCHY = ['free', 'silver', 'gold', 'platinum'] as const;
type Tier = typeof TIER_HIERARCHY[number];

interface UpgradeButtonProps {
  currentTier: Tier;
}

export default function UpgradeButton({ currentTier }: UpgradeButtonProps) {
  const { user } = useUser();
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  const currentIndex = TIER_HIERARCHY.indexOf(currentTier);
  const nextTier = TIER_HIERARCHY[currentIndex + 1];
  
  const handleUpgrade = async () => {
    if (!nextTier || !user) return;
    
    setIsUpgrading(true);
    
    try {
      await user.update({
        unsafeMetadata: {
          tier: nextTier,
        },
      });
      
      window.location.reload();
    } catch (error) {
      console.error('Error upgrading tier:', error);
    } finally {
      setIsUpgrading(false);
    }
  };

  if (!nextTier) return null;

  return (
    <button 
      onClick={handleUpgrade}
      disabled={isUpgrading}
      className="text-sm underline"
    >
      {isUpgrading ? 'Upgrading...' : 'Upgrade tier'}
    </button>
  );
}