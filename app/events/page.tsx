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
  const userTier = (user.publicMetadata?.tier as Tier) || 'free';
  
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Events</h1>
            <p className="text-gray-600">There was an error loading the events. Please try again later.</p>
            <Link 
              href="/" 
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Tier Events
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Your tier:</span>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                  userTier === 'free' ? 'bg-gray-500' :
                  userTier === 'silver' ? 'bg-blue-500' :
                  userTier === 'gold' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}>
                  {userTier.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover events available for your tier. You have access to {allowedTiers.join(', ')} tier events.
          </p>
        </div>

        {/* Tier Upgrade Section */}
        <div className="mb-8">
          <TierUpgrade />
        </div>

        {/* Events Grid */}
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: Event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a4 4 0 118 0v4m-4 7h8m-8 0a4 4 0 00-4 4v2a4 4 0 004 4h8a4 4 0 004-4v-2a4 4 0 00-4-4m-8 0V7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Available</h3>
              <p className="text-gray-600 mb-6">
                There are currently no events available for your tier. Check back later or upgrade your tier to access more events.
              </p>
              <div className="space-y-2">
                <Link 
                  href="/" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tier Information */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tier Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-600 font-bold text-sm">FREE</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Tier</h3>
              <p className="text-sm text-gray-600">Basic events and webinars</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-sm">SILVER</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Silver Tier</h3>
              <p className="text-sm text-gray-600">Premium talks + Free events</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 font-bold text-sm">GOLD</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gold Tier</h3>
              <p className="text-sm text-gray-600">Masterclasses + Silver + Free</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-sm">PLAT</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Platinum Tier</h3>
              <p className="text-sm text-gray-600">VIP summits + All tiers</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}