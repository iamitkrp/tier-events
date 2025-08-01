'use client';

import { currentUser } from '@clerk/nextjs/server';
import { supabase, getAllowedTiers, type Event, type Tier } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

// Tier Card Component
function TierCard({ userTier, onUpgrade }: { userTier: Tier; onUpgrade: () => void }) {
  const getTierGradient = (tier: Tier) => {
    switch (tier) {
      case 'free':
        return 'from-[var(--cuberto-light-gray)] to-[var(--cuberto-border-light)]';
      case 'silver':
        return 'from-[var(--cuberto-accent-blue)] to-[var(--cuberto-accent-purple)]';
      case 'gold':
        return 'from-[var(--cuberto-accent-purple)] to-[var(--cuberto-accent-teal)]';
      case 'platinum':
        return 'from-[var(--cuberto-accent-teal)] to-[var(--cuberto-accent-orange)]';
      default:
        return 'from-[var(--cuberto-light-gray)] to-[var(--cuberto-border-light)]';
    }
  };

  const getTierIcon = (tier: Tier) => {
    switch (tier) {
      case 'free':
        return '🆓';
      case 'silver':
        return '⚡';
      case 'gold':
        return '👑';
      case 'platinum':
        return '💎';
      default:
        return '🆓';
    }
  };

  return (
    <div className="cuberto-card p-8 bg-gradient-to-br from-[var(--cuberto-bg-main)] to-[var(--cuberto-bg-section)] animate-fade-in-up hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className={`w-20 h-20 bg-gradient-to-br ${getTierGradient(userTier)} rounded-xl flex items-center justify-center shadow-lg animate-float-slow`}>
            <span className="text-2xl">{getTierIcon(userTier)}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--cuberto-text-primary)] mb-2">
              {userTier.charAt(0).toUpperCase() + userTier.slice(1)} Member
            </h2>
            <p className="text-[var(--cuberto-text-secondary)]">
              {userTier === 'platinum' 
                ? 'You have access to all exclusive events' 
                : 'Upgrade to unlock more premium content'
              }
            </p>
          </div>
        </div>
        
        {userTier !== 'platinum' && (
          <button
            onClick={onUpgrade}
            className="cb-btn_more3 transform hover:scale-105 transition-all duration-300"
          >
            Upgrade
          </button>
        )}
      </div>
    </div>
  );
}

// Event Card Component with click handler
function EventCardClickable({ event, onClick }: { event: Event; onClick: () => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const { day, month, time } = formatDate(event.event_date);

  const getTierColor = (tier: Tier) => {
    switch (tier) {
      case 'free': return 'text-[var(--cuberto-text-muted)]';
      case 'silver': return 'text-[var(--cuberto-accent-blue)]';
      case 'gold': return 'text-[var(--cuberto-accent-purple)]';
      case 'platinum': return 'text-[var(--cuberto-accent-orange)]';
      default: return 'text-[var(--cuberto-text-muted)]';
    }
  };

  return (
    <div 
      className="cuberto-card overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up"
      onClick={onClick}
    >
      <div className="relative h-48 bg-gradient-to-br from-[var(--cuberto-bg-section)] to-[var(--cuberto-light-gray)]">
        <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md">
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--cuberto-text-primary)]">{day}</div>
            <div className="text-xs text-[var(--cuberto-text-secondary)] uppercase">{month}</div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white shadow-md ${getTierColor(event.tier)}`}>
            {event.tier.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-[var(--cuberto-text-primary)] mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-[var(--cuberto-text-secondary)] text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        <div className="flex items-center text-sm text-[var(--cuberto-text-muted)]">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

// Upgrade Dialog Component
function UpgradeDialog({ userTier, isOpen, onClose }: { userTier: Tier; isOpen: boolean; onClose: () => void }) {
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  if (!isOpen) return null;

  const getNextTier = (tier: Tier): Tier | null => {
    const tiers: Tier[] = ['free', 'silver', 'gold', 'platinum'];
    const currentIndex = tiers.indexOf(tier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const nextTier = getNextTier(userTier);
  if (!nextTier) return null;

  const getBenefits = (tier: Tier) => {
    switch (tier) {
      case 'silver':
        return [
          'Access to premium workshops',
          'Networking events',
          'Priority support',
          'Exclusive content library'
        ];
      case 'gold':
        return [
          'All Silver benefits',
          'Masterclasses with experts',
          '1-on-1 mentoring sessions',
          'Advanced resources',
          'VIP community access'
        ];
      case 'platinum':
        return [
          'All Gold benefits',
          'VIP summits and conferences',
          'Private events',
          'Direct expert access',
          'Custom learning paths'
        ];
      default:
        return [];
    }
  };

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    // Simulate upgrade process
    setTimeout(() => {
      setIsUpgrading(false);
      onClose();
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-up">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in-up transform scale-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--cuberto-accent-blue)] to-[var(--cuberto-accent-purple)] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🚀</span>
          </div>
          <h3 className="text-2xl font-bold text-[var(--cuberto-text-primary)] mb-2">
            Upgrade to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
          </h3>
          <p className="text-[var(--cuberto-text-secondary)]">
            Unlock exclusive benefits and premium events
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-[var(--cuberto-text-primary)] mb-3">What you&apos;ll get:</h4>
          <ul className="space-y-2">
            {getBenefits(nextTier).map((benefit, index) => (
              <li key={index} className="flex items-center text-sm text-[var(--cuberto-text-secondary)]">
                <svg className="w-4 h-4 text-[var(--cuberto-accent-blue)] mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-[var(--cuberto-border-dark)] rounded-lg text-[var(--cuberto-text-secondary)] hover:bg-[var(--cuberto-bg-section)] transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="flex-1 cb-btn_more2 py-3"
          >
            {isUpgrading ? 'Upgrading...' : `Upgrade Now`}
          </button>
        </div>
      </div>
    </div>
  );
}

// Event Info Dialog Component
function EventInfoDialog({ event, isOpen, onClose }: { event: Event | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      fullDate: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const { fullDate, time } = formatDate(event.event_date);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-up">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in-up transform scale-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--cuberto-bg-section)] text-[var(--cuberto-text-secondary)]">
                {event.tier.toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--cuberto-text-primary)] mb-2">
              {event.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-[var(--cuberto-bg-section)] rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-[var(--cuberto-text-secondary)] leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-[var(--cuberto-text-secondary)]">
            <svg className="w-5 h-5 mr-3 text-[var(--cuberto-accent-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 7h8m-8 0a4 4 0 00-4 4v2a4 4 0 004 4h8a4 4 0 004-4v-2a4 4 0 00-4-4m-8 0V7" />
            </svg>
            <span>{fullDate}</span>
          </div>
          <div className="flex items-center text-[var(--cuberto-text-secondary)]">
            <svg className="w-5 h-5 mr-3 text-[var(--cuberto-accent-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
          </div>
        </div>

        <button className="w-full cb-btn_more2 py-3">
          Register for Event
        </button>
      </div>
    </div>
  );
}

export default function EventsUnlocked() {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const userTier = (user?.unsafeMetadata?.tier as Tier) || 'free';
  const allowedTiers = getAllowedTiers(userTier);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('tier', allowedTiers)
        .order('event_date', { ascending: true });

      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [allowedTiers]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDialog(true);
  };

  if (!user) {
    redirect('/eventslocked');
  }

  return (
    <div className="min-h-screen bg-[var(--cuberto-bg-main)] relative">
      {/* User Profile in top right corner */}
      <div className="fixed top-6 right-6 z-40">
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-12">
        <div className="cuberto-container max-w-7xl">
          {/* Tier Card */}
          <div className="mb-12">
            <TierCard 
              userTier={userTier} 
              onUpgrade={() => setShowUpgradeDialog(true)} 
            />
          </div>

          {/* Events Grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[var(--cuberto-text-primary)] mb-2">
                  Your Events
                </h2>
                <p className="text-[var(--cuberto-text-secondary)]">
                  {loading ? 'Loading...' : `${events.length} events available for your tier`}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="cuberto-card h-80 bg-[var(--cuberto-bg-section)] animate-pulse"></div>
                ))}
              </div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <div key={event.id} style={{ animationDelay: `${0.1 * index}s` }}>
                    <EventCardClickable 
                      event={event} 
                      onClick={() => handleEventClick(event)} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--cuberto-light-gray)] to-[var(--cuberto-border-light)] rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-12 h-12 text-[var(--cuberto-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a4 4 0 118 0v4m-4 7h8m-8 0a4 4 0 00-4 4v2a4 4 0 004 4h8a4 4 0 004-4v-2a4 4 0 00-4-4m-8 0V7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--cuberto-text-primary)] mb-4">No Events Available</h3>
                <p className="text-[var(--cuberto-text-secondary)] mb-8">
                  Check back later for new events or upgrade your tier for more content.
                </p>
                {userTier !== 'platinum' && (
                  <button 
                    onClick={() => setShowUpgradeDialog(true)}
                    className="cb-btn_more3"
                  >
                    Upgrade Tier
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <UpgradeDialog 
        userTier={userTier} 
        isOpen={showUpgradeDialog} 
        onClose={() => setShowUpgradeDialog(false)} 
      />
      
      <EventInfoDialog 
        event={selectedEvent} 
        isOpen={showEventDialog} 
        onClose={() => {
          setShowEventDialog(false);
          setSelectedEvent(null);
        }} 
      />
    </div>
  );
}