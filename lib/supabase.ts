import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database schema
export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: 'free' | 'silver' | 'gold' | 'platinum';
}

export type Tier = 'free' | 'silver' | 'gold' | 'platinum';

// Helper function to get allowed tiers based on user tier
export function getAllowedTiers(userTier: Tier): Tier[] {
  const tierHierarchy: Tier[] = ['free', 'silver', 'gold', 'platinum'];
  const userIndex = tierHierarchy.indexOf(userTier);
  return tierHierarchy.slice(0, userIndex + 1);
}

// Helper function to get tier color
export function getTierColor(tier: Tier): string {
  const colors = {
    free: 'bg-gray-500',
    silver: 'bg-blue-500', 
    gold: 'bg-yellow-500',
    platinum: 'bg-purple-500',
  };
  return colors[tier];
}

// Helper function to get tier text color
export function getTierTextColor(tier: Tier): string {
  const colors = {
    free: 'text-gray-600',
    silver: 'text-blue-600',
    gold: 'text-yellow-600', 
    platinum: 'text-purple-600',
  };
  return colors[tier];
}