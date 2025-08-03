'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { EventCard } from '@/components/EventCard'
import { TierBadge } from '@/components/TierBadge'
import { Button } from '@/components/ui/button'
import { supabase, type Event } from '@/lib/supabase'
import { canAccessTier, getNextTier, type TierType } from '@/lib/tierUtils'
import { Loader2, Plus, Settings, User } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Get user tier from Clerk metadata, default to 'free'
  const userTier = ((user?.publicMetadata as Record<string, unknown>)?.tier || (user?.unsafeMetadata as Record<string, unknown>)?.tier) as TierType || 'free'
  const nextTier = getNextTier(userTier)

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        
        // Try Supabase first, fallback to mock data if it fails
        try {
          const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('event_date', { ascending: true })

          if (error) {
            throw error
          }

          setEvents(data || [])
        } catch (supabaseError) {
          console.warn('Supabase connection failed, using mock data:', supabaseError)
          
          // Mock data for testing
          const mockEvents = [
            {
              id: '1',
              title: 'Community Networking Mixer',
              description: 'Join fellow professionals for an evening of casual networking and community building.',
              event_date: '2024-02-15T18:00:00Z',
              tier: 'free' as const,
              image_url: null,
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '2',
              title: 'Open Source Contributor Meetup',
              description: 'Learn about contributing to open source projects and connect with maintainers.',
              event_date: '2024-02-22T19:00:00Z',
              tier: 'free' as const,
              image_url: null,
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '3',
              title: 'Professional Development Workshop',
              description: 'Advance your career with our intensive workshop covering modern development practices.',
              event_date: '2024-02-20T14:00:00Z',
              tier: 'silver' as const,
              image_url: null,
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '4',
              title: 'Tech Leadership Masterclass',
              description: 'Learn from seasoned tech leaders about building high-performing teams.',
              event_date: '2024-03-05T10:00:00Z',
              tier: 'silver' as const,
              image_url: null,
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '5',
              title: 'Exclusive Industry Conference',
              description: 'Join C-level executives and industry pioneers for cutting-edge insights.',
              event_date: '2024-03-12T09:00:00Z',
              tier: 'gold' as const,
              image_url: null,
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '6',
              title: 'VIP Product Launch Event',
              description: 'Be among the first to experience groundbreaking new products.',
              event_date: '2024-03-18T16:00:00Z',
              tier: 'gold' as const,
              image_url: null,
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '7',
              title: 'Private CEO Roundtable',
              description: 'Intimate discussion with Fortune 500 CEOs about market trends.',
              event_date: '2024-03-25T15:00:00Z',
              tier: 'platinum' as const,
              image_url: null,
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '8',
              title: 'Platinum Innovation Summit',
              description: 'Ultra-exclusive summit featuring unreleased technologies.',
              event_date: '2024-04-02T11:00:00Z',
              tier: 'platinum' as const,
              image_url: null,
              created_at: '2024-01-01T00:00:00Z'
            }
          ]
          
          setEvents(mockEvents)
        }
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Failed to load events. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded) {
      fetchEvents()
    }
  }, [isLoaded])

  const handleUpgradeTier = async () => {
    if (!user || !nextTier) return

    try {
      // Simulate tier upgrade by updating Clerk metadata
      // Note: In production, this would typically be handled by your backend
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          tier: nextTier
        }
      } as Parameters<typeof user.update>[0])
      
      // Refresh the page to show new events
      window.location.reload()
    } catch (err) {
      console.error('Error upgrading tier:', err)
    }
  }

  // Filter events based on user tier
  const accessibleEvents = events.filter(event => canAccessTier(userTier, event.tier))
  const lockedEvents = events.filter(event => !canAccessTier(userTier, event.tier))

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Tier Events
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm text-gray-600">
                  {user?.firstName} {user?.lastName}
                </span>
                <TierBadge tier={userTier} />
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Events</h1>
              <p className="text-gray-600 mt-1">
                Discover events available for your {userTier} tier membership
              </p>
            </div>
            {nextTier && (
              <Button onClick={handleUpgradeTier} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Upgrade to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">✓</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Events</p>
                <p className="text-2xl font-semibold text-gray-900">{accessibleEvents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">T</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Tier</p>
                <p className="text-2xl font-semibold text-gray-900 capitalize">{userTier}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-sm">🔒</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Locked Events</p>
                <p className="text-2xl font-semibold text-gray-900">{lockedEvents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Events */}
        {accessibleEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibleEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Locked Events Preview */}
        {lockedEvents.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Premium Events</h2>
                <p className="text-gray-600">Upgrade your tier to access these exclusive events</p>
              </div>
              {nextTier && (
                <Button onClick={handleUpgradeTier} variant="outline">
                  Upgrade to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedEvents.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} isLocked />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📅</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Available</h3>
            <p className="text-gray-600 mb-4">
              It looks like there are no events in the system yet.
            </p>
            <Button asChild>
              <Link href="/api/seed" target="_blank">
                Seed Sample Events
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}