/**
 * Tier Management Utilities
 * Functions for handling user tiers and access control
 * 
 * Author: Amit Kumar Pandey
 * Website: https://amitkp.com
 * GitHub: https://github.com/iamitkrp
 */

export type TierType = 'free' | 'silver' | 'gold' | 'platinum';

// Tier hierarchy for comparison
const TIER_HIERARCHY = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3
} as const;

/**
 * Checks if a user can access events of a specific tier
 * Users can access events at their tier level or below
 */
export function canAccessTier(userTier: TierType, eventTier: TierType): boolean {
  return TIER_HIERARCHY[userTier] >= TIER_HIERARCHY[eventTier];
}

/**
 * Gets all accessible tiers for a user
 */
export function getAccessibleTiers(userTier: TierType): TierType[] {
  const userTierLevel = TIER_HIERARCHY[userTier];
  return Object.entries(TIER_HIERARCHY)
    .filter(([, level]) => level <= userTierLevel)
    .map(([tier]) => tier as TierType);
}

/**
 * Gets the tier color for UI display
 */
export function getTierColor(tier: TierType): string {
  const colors = {
    free: 'bg-gray-100 text-gray-800 border-gray-200',
    silver: 'bg-slate-100 text-slate-800 border-slate-200',
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    platinum: 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[tier];
}

/**
 * Gets the tier display name
 */
export function getTierDisplayName(tier: TierType): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

/**
 * Gets the next tier in hierarchy
 */
export function getNextTier(currentTier: TierType): TierType | null {
  const currentLevel = TIER_HIERARCHY[currentTier];
  const nextTier = Object.entries(TIER_HIERARCHY)
    .find(([, level]) => level === currentLevel + 1);
  
  return nextTier ? nextTier[0] as TierType : null;
}

/**
 * Gets the previous tier in hierarchy
 */
export function getPreviousTier(currentTier: TierType): TierType | null {
  const currentLevel = TIER_HIERARCHY[currentTier];
  const previousTier = Object.entries(TIER_HIERARCHY)
    .find(([, level]) => level === currentLevel - 1);
  
  return previousTier ? previousTier[0] as TierType : null;
}