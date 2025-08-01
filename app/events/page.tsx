import { currentUser } from '@clerk/nextjs/server';
import { supabase, getAllowedTiers, type Event, type Tier } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import EventCard from '@/components/EventCard';
import TierUpgrade from '@/components/TierUpgrade';
import Link from 'next/link';

export default async function EventsPage() {
  // Get the current user
  const user = await currentUser();
  
  // Redirect to home if not authenticated
  if (!user) {
    redirect('/');
  }

  // Get user tier from metadata (default to 'free' if not set)
  const userTier = (user.unsafeMetadata?.tier as Tier) || 'free';
  
  // Get allowed tiers for this user
  const allowedTiers = getAllowedTiers(userTier);

  // Fetch events from Supabase based on allowed tiers
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .in('tier', allowedTiers)
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return (
      <div className="min-h-screen bg-[var(--cuberto-bg-main)]">
        <div className="cuberto-container py-12">
          <div className="text-center">
            <h1 className="mb-4">Error Loading Events</h1>
            <p className="text-[var(--cuberto-text-secondary)] mb-8">
              There was an error loading the events. Please try again later.
            </p>
            <Link href="/" className="cb-btn_more3">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-[var(--cuberto-bg-main)]">
      {/* Navigation */}
      <nav className="cuberto-nav">
        <Link href="/" className="cuberto-logo">
          <span className="text-gradient font-bold">Tier Events</span>
        </Link>
        <div className="cuberto-menu">
          <div className="flex items-center space-x-6">
            <Link href="/" className="nav-link">home</Link>
            <div className="flex items-center space-x-3">
              <span className="text-[var(--cuberto-text-secondary)] text-sm">Your tier:</span>
              <span className={`px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getTierGradient(userTier)} shadow-lg`}>
                {userTier.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with improved design */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[var(--cuberto-bg-main)] to-[var(--cuberto-bg-section)]">
        <div className="cuberto-container">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block px-4 py-2 rounded-full bg-[var(--cuberto-accent-blue)] bg-opacity-10 text-[var(--cuberto-accent-blue)] text-sm font-medium mb-6">
              🎯 Your Personal Event Dashboard
            </div>
            <h1 className="mb-6">
              Your <span className="text-gradient">{userTier.charAt(0).toUpperCase() + userTier.slice(1)}</span> Events
            </h1>
            <p className="text-[var(--cuberto-text-secondary)] max-w-3xl mx-auto text-xl">
              Welcome to your personalized event hub. You have access to <span className="font-semibold text-[var(--cuberto-text-primary)]">{allowedTiers.join(', ')}</span> tier events.
              {userTier !== 'platinum' && ' Upgrade your tier to unlock even more exclusive content!'}
            </p>
          </div>
        </div>
      </section>

      {/* Tier Upgrade Section - Only show if not platinum */}
      {userTier !== 'platinum' && (
        <section className="py-16 bg-[var(--cuberto-bg-section)]">
          <div className="cuberto-container">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <TierUpgrade />
            </div>
          </div>
        </section>
      )}

      {/* Events Section with better layout */}
      <section className="py-20 bg-[var(--cuberto-bg-main)]">
        <div className="cuberto-container">
          {events && events.length > 0 ? (
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="mb-4">Available Events</h2>
                  <p className="text-[var(--cuberto-text-secondary)]">
                    {events.length} event{events.length !== 1 ? 's' : ''} available for your tier
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-sm text-[var(--cuberto-text-muted)]">Filter by:</div>
                  <div className="flex space-x-2">
                    {allowedTiers.map((tier) => (
                      <span key={tier} className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTierGradient(tier)} text-white`}>
                        {tier.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event: Event, index: number) => (
                  <div key={event.id} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--cuberto-accent-blue)] to-[var(--cuberto-accent-purple)] rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a4 4 0 118 0v4m-4 7h8m-8 0a4 4 0 00-4 4v2a4 4 0 004 4h8a4 4 0 004-4v-2a4 4 0 00-4-4m-8 0V7" />
                  </svg>
                </div>
                <h3 className="mb-6 text-2xl">No Events Available</h3>
                <p className="text-[var(--cuberto-text-secondary)] mb-8 text-lg">
                  There are currently no events available for your tier. Check back later or upgrade your tier to access more exclusive events.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" className="cb-btn_more3">
                    Go Home
                  </Link>
                  {userTier !== 'platinum' && (
                    <button className="cb-btn_more2">
                      Upgrade Tier
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Tier Benefits Section */}
      <section className="py-20 bg-[var(--cuberto-bg-section)]">
        <div className="cuberto-container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="mb-6">Membership <span className="text-gradient">Benefits</span></h2>
            <p className="text-[var(--cuberto-text-secondary)] text-xl max-w-2xl mx-auto">
              Each tier provides cumulative access to all lower-tier benefits plus exclusive perks
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`cuberto-card p-8 text-center animate-float-slow ${userTier === 'free' ? 'border-2 border-[var(--cuberto-accent-blue)]' : ''}`}>
              <div className={`w-20 h-20 bg-gradient-to-br ${getTierGradient('free')} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-[var(--cuberto-text-primary)] font-bold text-lg">FREE</span>
              </div>
              <h3 className="mb-4">Free Tier</h3>
              <ul className="text-sm text-[var(--cuberto-text-secondary)] space-y-2">
                <li>✓ Weekly webinars</li>
                <li>✓ Community access</li>
                <li>✓ Basic resources</li>
                <li>✓ Event recordings</li>
              </ul>
              {userTier === 'free' && (
                <div className="mt-4 text-[var(--cuberto-accent-blue)] text-sm font-medium">
                  Your current tier
                </div>
              )}
            </div>
            
            <div className={`cuberto-card p-8 text-center animate-float-slow2 ${userTier === 'silver' ? 'border-2 border-[var(--cuberto-accent-purple)]' : ''}`}>
              <div className={`w-20 h-20 bg-gradient-to-br ${getTierGradient('silver')} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-white font-bold text-lg">SILVER</span>
              </div>
              <h3 className="mb-4">Silver Tier</h3>
              <ul className="text-sm text-[var(--cuberto-text-secondary)] space-y-2">
                <li>✓ Everything in Free</li>
                <li>✓ Premium workshops</li>
                <li>✓ Networking events</li>
                <li>✓ Priority support</li>
              </ul>
              {userTier === 'silver' && (
                <div className="mt-4 text-[var(--cuberto-accent-purple)] text-sm font-medium">
                  Your current tier
                </div>
              )}
            </div>
            
            <div className={`cuberto-card p-8 text-center animate-float-slow3 ${userTier === 'gold' ? 'border-2 border-[var(--cuberto-accent-teal)]' : ''}`}>
              <div className={`w-20 h-20 bg-gradient-to-br ${getTierGradient('gold')} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-white font-bold text-lg">GOLD</span>
              </div>
              <h3 className="mb-4">Gold Tier</h3>
              <ul className="text-sm text-[var(--cuberto-text-secondary)] space-y-2">
                <li>✓ Everything in Silver</li>
                <li>✓ Masterclasses</li>
                <li>✓ 1-on-1 sessions</li>
                <li>✓ Exclusive resources</li>
              </ul>
              {userTier === 'gold' && (
                <div className="mt-4 text-[var(--cuberto-accent-teal)] text-sm font-medium">
                  Your current tier
                </div>
              )}
            </div>
            
            <div className={`cuberto-card p-8 text-center animate-pulse-slow relative overflow-hidden ${userTier === 'platinum' ? 'border-2 border-[var(--cuberto-accent-orange)]' : ''}`}>
              <div className="absolute top-0 right-0 bg-[var(--cuberto-accent-orange)] text-white text-xs px-3 py-1 rounded-bl-lg">
                VIP
              </div>
              <div className={`w-20 h-20 bg-gradient-to-br ${getTierGradient('platinum')} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-white font-bold text-lg">PLAT</span>
              </div>
              <h3 className="mb-4">Platinum Tier</h3>
              <ul className="text-sm text-[var(--cuberto-text-secondary)] space-y-2">
                <li>✓ Everything in Gold</li>
                <li>✓ VIP summits</li>
                <li>✓ Private events</li>
                <li>✓ Direct expert access</li>
              </ul>
              {userTier === 'platinum' && (
                <div className="mt-4 text-[var(--cuberto-accent-orange)] text-sm font-medium">
                  Your current tier
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}