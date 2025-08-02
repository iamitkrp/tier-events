'use client';

import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { supabase, getAllowedTiers, type Event, type Tier } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import Image from 'next/image';

// Event Card Component for accessible events
function EventCard({ event }: { event: Event }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      fullDate: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    };
  };

  const { day, month, time, fullDate } = formatDate(event.event_date);

  const getTierColor = (tier: Tier) => {
    switch (tier) {
      case 'free': return 'bg-gray-500/10 text-gray-700 border border-gray-200';
      case 'silver': return 'bg-blue-500/10 text-blue-700 border border-blue-200';
      case 'gold': return 'bg-amber-500/10 text-amber-700 border border-amber-200';
      case 'platinum': return 'bg-purple-500/10 text-purple-700 border border-purple-200';
      default: return 'bg-gray-500/10 text-gray-700 border border-gray-200';
    }
  };

  const getTierGradient = (tier: Tier) => {
    switch (tier) {
      case 'free': return 'from-gray-400 to-gray-600';
      case 'silver': return 'from-blue-400 to-blue-600';
      case 'gold': return 'from-amber-400 to-amber-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300 hover:bg-white/90">
      {/* Event Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div className={`absolute inset-0 bg-gradient-to-br ${getTierGradient(event.tier)} opacity-20`}></div>
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        
        {/* Fallback gradient when image fails */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getTierGradient(event.tier)} flex items-center justify-center`}>
          <div className="text-white/80 text-4xl font-bold">
            {event.title.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{day}</div>
            <div className="text-xs text-gray-600 uppercase font-medium">{month}</div>
          </div>
        </div>
        
        {/* Tier Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getTierColor(event.tier)} backdrop-blur-sm`}>
            {event.tier.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Event Date and Time */}
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 7h8m-8 0a4 4 0 00-4 4v2a4 4 0 004 4h8a4 4 0 004-4v-2a4 4 0 00-4-4m-8 0V7" />
              </svg>
            </div>
            <span className="font-medium">{fullDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium">{time}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className={`w-full px-6 py-3 bg-gradient-to-r ${getTierGradient(event.tier)} text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-black/20 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all duration-200 transform hover:scale-105`}>
          View Details
        </button>
      </div>
    </div>
  );
}

// Locked Event Card Component for events above user tier
function LockedEventCard({ event, userTier }: { event: Event; userTier: Tier }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    };
  };

  const { day, month, fullDate } = formatDate(event.event_date);

  const getTierColor = (tier: Tier) => {
    switch (tier) {
      case 'free': return 'bg-gray-500/10 text-gray-700 border border-gray-200';
      case 'silver': return 'bg-blue-500/10 text-blue-700 border border-blue-200';
      case 'gold': return 'bg-amber-500/10 text-amber-700 border border-amber-200';
      case 'platinum': return 'bg-purple-500/10 text-purple-700 border border-purple-200';
      default: return 'bg-gray-500/10 text-gray-700 border border-gray-200';
    }
  };

  const getTierGradient = (tier: Tier) => {
    switch (tier) {
      case 'free': return 'from-gray-400 to-gray-600';
      case 'silver': return 'from-blue-400 to-blue-600';
      case 'gold': return 'from-amber-400 to-amber-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const { user } = useUser();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const getNextRequiredTier = (eventTier: Tier, currentTier: Tier): Tier | null => {
    const tiers: Tier[] = ['free', 'silver', 'gold', 'platinum'];
    const currentIndex = tiers.indexOf(currentTier);
    const eventIndex = tiers.indexOf(eventTier);
    
    if (eventIndex > currentIndex) {
      return eventTier;
    }
    return null;
  };

  const requiredTier = getNextRequiredTier(event.tier, userTier);

  const handleUpgrade = async () => {
    if (!requiredTier || !user) return;
    
    setIsUpgrading(true);
    
    try {
      await user.update({
        unsafeMetadata: {
          tier: requiredTier,
        },
      });
      
      window.location.reload();
    } catch (error) {
      console.error('Error upgrading tier:', error);
      alert('Failed to upgrade tier. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="group bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden relative transform transition-all duration-300 hover:bg-white/50">
      {/* Locked overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 z-10 flex items-center justify-center backdrop-blur-[2px]">
        <div className="text-center p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl max-w-xs mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-800 mb-4 leading-relaxed">
            Upgrade to <span className="text-amber-600 font-bold">{requiredTier?.charAt(0).toUpperCase()}{requiredTier?.slice(1)}</span> to access this event
          </p>
          <button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className={`px-6 py-3 bg-gradient-to-r ${getTierGradient(requiredTier || 'free')} text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-black/20 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isUpgrading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Upgrading...
              </div>
            ) : (
              `Upgrade to ${requiredTier?.charAt(0).toUpperCase()}${requiredTier?.slice(1)}`
            )}
          </button>
        </div>
      </div>

      {/* Event Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div className={`absolute inset-0 bg-gradient-to-br ${getTierGradient(event.tier)} opacity-30`}></div>
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        
        {/* Fallback gradient when image fails */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getTierGradient(event.tier)} flex items-center justify-center`}>
          <div className="text-white/60 text-4xl font-bold">
            {event.title.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg opacity-75">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{day}</div>
            <div className="text-xs text-gray-600 uppercase font-medium">{month}</div>
          </div>
        </div>
        
        {/* Tier Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getTierColor(event.tier)} backdrop-blur-sm opacity-90`}>
            {event.tier.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6 opacity-75">
        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Event Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 7h8m-8 0a4 4 0 00-4 4v2a4 4 0 004 4h8a4 4 0 004-4v-2a4 4 0 00-4-4m-8 0V7" />
            </svg>
          </div>
          <span className="font-medium">{fullDate}</span>
        </div>
      </div>
    </div>
  );
}

// Tier upgrade component
function TierUpgradeSection({ userTier }: { userTier: Tier }) {
  const { user } = useUser();
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  const TIER_HIERARCHY = ['free', 'silver', 'gold', 'platinum'] as const;
  const currentIndex = TIER_HIERARCHY.indexOf(userTier);
  const nextTier = TIER_HIERARCHY[currentIndex + 1];

  const getTierGradient = (tier: Tier) => {
    switch (tier) {
      case 'free': return 'from-gray-400 to-gray-600';
      case 'silver': return 'from-blue-400 to-blue-600';
      case 'gold': return 'from-amber-400 to-amber-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

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
      alert('Failed to upgrade tier. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  if (!nextTier) return null;

  return (
    <div className="mb-12 p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${getTierGradient(nextTier)} rounded-2xl flex items-center justify-center shadow-lg`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Upgrade to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
            </h3>
            <p className="text-gray-600">
              Unlock more exclusive events and premium content
            </p>
          </div>
        </div>
        
        <button
          onClick={handleUpgrade}
          disabled={isUpgrading}
          className={`px-8 py-4 bg-gradient-to-r ${getTierGradient(nextTier)} text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-black/20 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all duration-200 transform hover:scale-105 whitespace-nowrap ${
            isUpgrading ? 'opacity-50 cursor-not-allowed transform-none' : ''
          }`}
        >
          {isUpgrading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Upgrading...
            </div>
          ) : (
            `Upgrade to ${nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}`
          )}
        </button>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  if (!user) {
    redirect('/');
  }

  const userTier = (user.unsafeMetadata?.tier as Tier) || 'free';
  const allowedTiers = getAllowedTiers(userTier);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch ALL events, not just accessible ones
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: true });

        if (error) {
          setError('Error loading events');
        } else {
          setEvents(data || []);
        }
      } catch (err) {
        setError('Error loading events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-x-hidden">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-50 pointer-events-none" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
        
        <div className="relative z-10 w-full min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gray-300 rounded-3xl animate-pulse"></div>
                <div>
                  <div className="h-12 bg-gray-300 rounded-lg w-48 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 h-96 animate-pulse shadow-lg">
                  <div className="h-48 bg-gray-200 rounded-t-2xl mb-4"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-full mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-x-hidden">
        <div className="fixed inset-0 opacity-50 pointer-events-none" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
        
        <div className="relative z-10 w-full min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Events</h3>
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Separate accessible and locked events
  const accessibleEvents = events.filter(event => allowedTiers.includes(event.tier));
  const lockedEvents = events.filter(event => !allowedTiers.includes(event.tier));

  const getTierGradient = (tier: Tier) => {
    switch (tier) {
      case 'free': return 'from-gray-400 to-gray-600';
      case 'silver': return 'from-blue-400 to-blue-600';
      case 'gold': return 'from-amber-400 to-amber-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTierIcon = (tier: Tier) => {
    switch (tier) {
      case 'free': return '🆓';
      case 'silver': return '⚡';
      case 'gold': return '👑';
      case 'platinum': return '💎';
      default: return '🆓';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-50 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}>
      </div>
      
      <div className="relative z-10 w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 bg-gradient-to-br ${getTierGradient(userTier)} rounded-3xl flex items-center justify-center shadow-xl`}>
              <span className="text-3xl">{getTierIcon(userTier)}</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Events</h1>
              <div className="flex items-center gap-3">
                <p className="text-gray-600">Your tier:</p>
                <span className={`px-4 py-2 bg-gradient-to-r ${getTierGradient(userTier)} text-white text-sm font-semibold rounded-full capitalize shadow-lg`}>
                  {userTier}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Upgrade section */}
        {userTier !== 'platinum' && (
          <TierUpgradeSection userTier={userTier} />
        )}

        {/* Accessible Events Section */}
        {accessibleEvents.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Available Events
                </h2>
                <p className="text-gray-600">
                  {accessibleEvents.length} events you can access
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {accessibleEvents.map((event, index) => (
                <div key={event.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Events Section */}
        {lockedEvents.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Premium Events
                </h2>
                <p className="text-gray-600">
                  {lockedEvents.length} exclusive events • Upgrade to unlock
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {lockedEvents.map((event, index) => (
                <div key={event.id} style={{ animationDelay: `${(accessibleEvents.length + index) * 0.1}s` }} className="animate-fade-in">
                  <LockedEventCard event={event} userTier={userTier} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No events fallback */}
        {events.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a4 4 0 118 0v4m-4 7h8m-8 0a4 4 0 00-4 4v2a4 4 0 004 4h8a4 4 0 004-4v-2a4 4 0 00-4-4m-8 0V7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No Events Available</h3>
            <p className="text-gray-600 text-lg">
              Check back later for new events.
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}