import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const sampleEvents = [
  // Free Tier Events
  {
    title: 'Community Networking Mixer',
    description: 'Join fellow professionals for an evening of casual networking and community building. Meet like-minded individuals and expand your professional circle.',
    event_date: new Date('2024-02-15T18:00:00Z').toISOString(),
    tier: 'free' as const,
    image_url: null
  },
  {
    title: 'Open Source Contributor Meetup',
    description: 'Learn about contributing to open source projects and connect with maintainers. Perfect for beginners looking to make their first contribution.',
    event_date: new Date('2024-02-22T19:00:00Z').toISOString(),
    tier: 'free' as const,
    image_url: null
  },
  
  // Silver Tier Events
  {
    title: 'Professional Development Workshop',
    description: 'Advance your career with our intensive workshop covering modern development practices, leadership skills, and industry trends.',
    event_date: new Date('2024-02-20T14:00:00Z').toISOString(),
    tier: 'silver' as const,
    image_url: null
  },
  {
    title: 'Tech Leadership Masterclass',
    description: 'Learn from seasoned tech leaders about building high-performing teams, strategic planning, and effective communication.',
    event_date: new Date('2024-03-05T10:00:00Z').toISOString(),
    tier: 'silver' as const,
    image_url: null
  },
  
  // Gold Tier Events
  {
    title: 'Exclusive Industry Conference',
    description: 'Join C-level executives and industry pioneers for cutting-edge insights, exclusive announcements, and premium networking opportunities.',
    event_date: new Date('2024-03-12T09:00:00Z').toISOString(),
    tier: 'gold' as const,
    image_url: null
  },
  {
    title: 'VIP Product Launch Event',
    description: 'Be among the first to experience groundbreaking new products. Includes early access, exclusive demos, and direct feedback sessions.',
    event_date: new Date('2024-03-18T16:00:00Z').toISOString(),
    tier: 'gold' as const,
    image_url: null
  },
  
  // Platinum Tier Events
  {
    title: 'Private CEO Roundtable',
    description: 'Intimate discussion with Fortune 500 CEOs about market trends, strategic insights, and future opportunities. Limited to 20 attendees.',
    event_date: new Date('2024-03-25T15:00:00Z').toISOString(),
    tier: 'platinum' as const,
    image_url: null
  },
  {
    title: 'Platinum Innovation Summit',
    description: 'Ultra-exclusive summit featuring unreleased technologies, private investor meetings, and one-on-one mentorship sessions.',
    event_date: new Date('2024-04-02T11:00:00Z').toISOString(),
    tier: 'platinum' as const,
    image_url: null
  }
]

export async function POST() {
  try {
    // Check if events already exist
    const { data: existingEvents } = await supabase
      .from('events')
      .select('id')
      .limit(1)

    if (existingEvents && existingEvents.length > 0) {
      return NextResponse.json({ 
        message: 'Events already seeded',
        count: existingEvents.length 
      })
    }

    // Insert sample events
    const { data, error } = await supabase
      .from('events')
      .insert(sampleEvents)
      .select()

    if (error) {
      console.error('Error seeding events:', error)
      return NextResponse.json(
        { error: 'Failed to seed events', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Events seeded successfully',
      count: data?.length || 0,
      events: data
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch events', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      events: events || [],
      count: events?.length || 0
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 }
    )
  }
}