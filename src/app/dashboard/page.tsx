/**
 * Tier Events - Dashboard Page
 * Main dashboard for viewing tier-based events with glassmorphism design
 * 
 * Author: Amit Kumar Pandey
 * Website: https://amitkp.com
 * GitHub: https://github.com/iamitkrp
 */

'use client'

import { useEffect, useState } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'
import { EventCard } from '@/components/EventCard'
import { TierBadge } from '@/components/TierBadge'
import { Button } from '@/components/ui/button'
import { supabase, type Event } from '@/lib/supabase'
import { canAccessTier, getNextTier, getPreviousTier, type TierType } from '@/lib/tierUtils'
import { Loader2, Plus, User, LogOut, Crown, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  
  // Get user tier from Clerk metadata, default to 'free'
  const userTier = ((user?.publicMetadata as Record<string, unknown>)?.tier || (user?.unsafeMetadata as Record<string, unknown>)?.tier) as TierType || 'free'
  const nextTier = getNextTier(userTier)
  const previousTier = getPreviousTier(userTier)

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
            // FREE TIER EVENTS (6 events)
            {
              id: '1',
              title: 'Community Networking Mixer',
              description: 'Join fellow professionals for an evening of casual networking and community building at Mumbai&apos;s premier tech hub.',
              event_date: '2024-02-15T18:00:00Z',
              tier: 'free' as const,
              image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Bandra-Kurla Complex, Mumbai'
            },
            {
              id: '2',
              title: 'Open Source Contributor Meetup',
              description: 'Learn about contributing to open source projects and connect with maintainers in the heart of India&apos;s Silicon Valley.',
              event_date: '2024-02-22T19:00:00Z',
              tier: 'free' as const,
              image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Koramangala, Bengaluru'
            },
            {
              id: '3',
              title: 'Startup Pitch Night',
              description: 'Witness innovative startup pitches and network with budding entrepreneurs in Delhi&apos;s startup ecosystem.',
              event_date: '2024-02-28T17:30:00Z',
              tier: 'free' as const,
              image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Connaught Place, New Delhi'
            },
            {
              id: '4',
              title: 'Tech Career Fair',
              description: 'Connect with leading tech companies and explore career opportunities in Hyderabad&apos;s HITEC City.',
              event_date: '2024-03-05T10:00:00Z',
              tier: 'free' as const,
              image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'HITEC City, Hyderabad'
            },
            {
              id: '5',
              title: 'Women in Tech Meetup',
              description: 'Empowering women in technology through networking and mentorship in Pune&apos;s IT corridor.',
              event_date: '2024-03-12T14:00:00Z',
              tier: 'free' as const,
              image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Hinjewadi, Pune'
            },
            {
              id: '6',
              title: 'Digital Marketing Workshop',
              description: 'Learn the latest digital marketing strategies and tools in Chennai&apos;s growing tech scene.',
              event_date: '2024-03-18T11:00:00Z',
              tier: 'free' as const,
              image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'OMR, Chennai'
            },

            // SILVER TIER EVENTS (6 events)
            {
              id: '7',
              title: 'Professional Development Workshop',
              description: 'Advance your career with our intensive workshop covering modern development practices in Mumbai&apos;s financial district.',
              event_date: '2024-02-20T14:00:00Z',
              tier: 'silver' as const,
              image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Nariman Point, Mumbai'
            },
            {
              id: '8',
              title: 'Tech Leadership Masterclass',
              description: 'Learn from seasoned tech leaders about building high-performing teams in Bengaluru&apos;s tech capital.',
              event_date: '2024-03-05T10:00:00Z',
              tier: 'silver' as const,
              image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'MG Road, Bengaluru'
            },
            {
              id: '9',
              title: 'AI & Machine Learning Summit',
              description: 'Deep dive into artificial intelligence and machine learning trends with industry experts in Gurgaon.',
              event_date: '2024-03-15T09:00:00Z',
              tier: 'silver' as const,
              image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Cyber City, Gurgaon'
            },
            {
              id: '10',
              title: 'Cloud Architecture Workshop',
              description: 'Master cloud infrastructure and deployment strategies in Hyderabad&apos;s tech hub.',
              event_date: '2024-03-22T13:00:00Z',
              tier: 'silver' as const,
              image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Madhapur, Hyderabad'
            },
            {
              id: '11',
              title: 'Blockchain & Cryptocurrency Seminar',
              description: 'Explore the future of finance with blockchain technology experts in Pune&apos;s IT sector.',
              event_date: '2024-03-28T16:00:00Z',
              tier: 'silver' as const,
              image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Baner, Pune'
            },
            {
              id: '12',
              title: 'DevOps Excellence Training',
              description: 'Comprehensive DevOps training with hands-on experience in Chennai&apos;s software corridor.',
              event_date: '2024-04-05T10:30:00Z',
              tier: 'silver' as const,
              image_url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Thoraipakkam, Chennai'
            },

            // GOLD TIER EVENTS (6 events)
            {
              id: '13',
              title: 'Exclusive Industry Conference',
              description: 'Join C-level executives and industry pioneers for cutting-edge insights at Mumbai&apos;s premier business center.',
              event_date: '2024-03-12T09:00:00Z',
              tier: 'gold' as const,
              image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'World Trade Centre, Mumbai'
            },
            {
              id: '14',
              title: 'VIP Product Launch Event',
              description: 'Be among the first to experience groundbreaking new products in Bengaluru&apos;s innovation district.',
              event_date: '2024-03-18T16:00:00Z',
              tier: 'gold' as const,
              image_url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'UB City Mall, Bengaluru'
            },
            {
              id: '15',
              title: 'Global Tech Leaders Forum',
              description: 'Network with international tech leaders and investors in Delhi&apos;s diplomatic enclave.',
              event_date: '2024-03-25T11:00:00Z',
              tier: 'gold' as const,
              image_url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Chanakyapuri, New Delhi'
            },
            {
              id: '16',
              title: 'Venture Capital Showcase',
              description: 'Exclusive access to VC presentations and startup funding opportunities in Hyderabad.',
              event_date: '2024-04-02T14:30:00Z',
              tier: 'gold' as const,
              image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Financial District, Hyderabad'
            },
            {
              id: '17',
              title: 'Executive Leadership Retreat',
              description: 'Intensive leadership development program for senior executives in Pune&apos;s hill stations.',
              event_date: '2024-04-10T08:00:00Z',
              tier: 'gold' as const,
              image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Lonavala, Maharashtra'
            },
            {
              id: '18',
              title: 'Innovation Lab Tour',
              description: 'Private tour of cutting-edge research facilities and innovation labs in Chennai.',
              event_date: '2024-04-15T15:00:00Z',
              tier: 'gold' as const,
              image_url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'IIT Madras Research Park, Chennai'
            },

            // PLATINUM TIER EVENTS (6 events)
            {
              id: '19',
              title: 'Private CEO Roundtable',
              description: 'Intimate discussion with Fortune 500 CEOs about market trends in Mumbai&apos;s exclusive business club.',
              event_date: '2024-03-25T15:00:00Z',
              tier: 'platinum' as const,
              image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Mumbai Cricket Club, Mumbai'
            },
            {
              id: '20',
              title: 'Platinum Innovation Summit',
              description: 'Ultra-exclusive summit featuring unreleased technologies in Bengaluru&apos;s luxury hotel.',
              event_date: '2024-04-02T11:00:00Z',
              tier: 'platinum' as const,
              image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'The Leela Palace, Bengaluru'
            },
            {
              id: '21',
              title: 'Government Policy Briefing',
              description: 'Exclusive briefing on upcoming tech policies and regulations with government officials.',
              event_date: '2024-04-08T10:00:00Z',
              tier: 'platinum' as const,
              image_url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'India Gate, New Delhi'
            },
            {
              id: '22',
              title: 'Billionaire Investor Dinner',
              description: 'Private dinner with billionaire investors and tech moguls in Hyderabad&apos;s most exclusive venue.',
              event_date: '2024-04-12T19:00:00Z',
              tier: 'platinum' as const,
              image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'Taj Falaknuma Palace, Hyderabad'
            },
            {
              id: '23',
              title: 'Global Economic Forum',
              description: 'Participate in discussions shaping the global economy with world leaders in Pune.',
              event_date: '2024-04-18T09:30:00Z',
              tier: 'platinum' as const,
              image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'The Ritz-Carlton, Pune'
            },
            {
              id: '24',
              title: 'Space Technology Symposium',
              description: 'Exclusive access to ISRO officials and space technology innovations in Chennai.',
              event_date: '2024-04-25T12:00:00Z',
              tier: 'platinum' as const,
              image_url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=240&fit=crop',
              created_at: '2024-01-01T00:00:00Z',
              location: 'ISRO Headquarters, Chennai'
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

  const handleDowngradeTier = async () => {
    if (!user || !previousTier) return

    try {
      // Simulate tier downgrade by updating Clerk metadata
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          tier: previousTier
        }
      } as Parameters<typeof user.update>[0])
      
      // Refresh the page to show new events
      window.location.reload()
    } catch (err) {
      console.error('Error downgrading tier:', err)
    }
  }

  // Filter events based on user tier
  const accessibleEvents = events.filter(event => canAccessTier(userTier, event.tier))
  const lockedEvents = events.filter(event => !canAccessTier(userTier, event.tier))

  if (!isLoaded || loading) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/bg/ribbon.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-black/10">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-black" />
            <p className="text-black/70 font-light">Loading your events...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/bg/ribbon.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Error Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-black/10">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <p className="text-black mb-6 font-light">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-3"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg/ribbon.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link href="/" className="text-black/70 hover:text-black transition-colors duration-300 text-sm flex items-center gap-2 cursor-pointer">
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Top Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Personal Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-black/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-black/70" />
                </div>
                <div>
                  <h2 className="text-2xl font-light text-black">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-black/60 text-sm">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-black/5 rounded-xl">
                  <span className="text-sm font-light text-black/70 uppercase tracking-wide">Current Tier</span>
                  <TierBadge tier={userTier} />
                </div>
                
                <div className="space-y-3">
                  {previousTier && (
                    <Button
                      onClick={handleDowngradeTier}
                      variant="outline"
                      className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200 rounded-full py-3 cursor-pointer"
                    >
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Downgrade to {previousTier.charAt(0).toUpperCase() + previousTier.slice(1)}
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => signOut({ redirectUrl: '/' })}
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 rounded-full py-3 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Your Events Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-black/10">
              <div>
                <h1 className="text-4xl lg:text-5xl font-light text-black mb-2">Your Events</h1>
                <div className="w-16 h-0.5 bg-black/20 mb-4"></div>
                <p className="text-black/70 text-lg font-light mb-6">
                  Discover premium experiences curated for your {userTier} tier membership
                </p>
                {nextTier && (
                  <Button 
                    onClick={handleUpgradeTier} 
                    className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-3 flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    Upgrade to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
                  </Button>
                )}
              </div>
            </div>
          </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/10 p-6 hover:bg-white/90 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-lg">✓</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-light text-black/60 uppercase tracking-wide">Available Events</p>
                <p className="text-3xl font-light text-black">{accessibleEvents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/10 p-6 hover:bg-white/90 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">👑</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-light text-black/60 uppercase tracking-wide">Current Tier</p>
                <p className="text-3xl font-light text-black capitalize">{userTier}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/10 p-6 hover:bg-white/90 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-lg">🔒</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-light text-black/60 uppercase tracking-wide">Premium Events</p>
                <p className="text-3xl font-light text-black">{lockedEvents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Events */}
        {accessibleEvents.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-4">Available Events</h2>
              <div className="w-16 h-0.5 bg-black/20 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibleEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Locked Events Preview */}
        {lockedEvents.length > 0 && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-black/10 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="text-center flex-1">
                <h2 className="text-3xl font-light text-black mb-2">Premium Events</h2>
                <div className="w-16 h-0.5 bg-black/20 mx-auto mb-4"></div>
                <p className="text-black/70 font-light">Upgrade your tier to unlock these exclusive experiences</p>
              </div>
              {nextTier && (
                <Button 
                  onClick={handleUpgradeTier} 
                  variant="outline"
                  className="bg-transparent border-black/30 text-black hover:bg-black/10 rounded-full px-6 py-3 backdrop-blur-sm ml-8 cursor-pointer"
                >
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
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-black/10">
            <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📅</span>
            </div>
            <h3 className="text-2xl font-light text-black mb-4">No Events Available</h3>
            <div className="w-16 h-0.5 bg-black/20 mx-auto mb-6"></div>
            <p className="text-black/70 font-light mb-8 max-w-md mx-auto">
              It looks like there are no events in the system yet. Let&apos;s add some sample events to get started.
            </p>
            <Button 
              asChild
              className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-3"
            >
              <Link href="/api/seed" target="_blank">
                Seed Sample Events
              </Link>
            </Button>
          </div>
        )}

        {/* Footer Attribution */}
        <div className="mt-16 pt-8 border-t border-black/10">
          <div className="text-center">
            <p className="text-black/50 text-xs font-light">
              Made by -{' '}
              <a 
                href="https://amitkp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black/70 hover:text-black transition-colors duration-300 cursor-pointer"
              >
                Amit
              </a>
            </p>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}