'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TierBadge } from '@/components/TierBadge'
import { type Event } from '@/lib/supabase'
import { Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

interface EventCardProps {
  event: Event
  isLocked?: boolean
}

export function EventCard({ event, isLocked = false }: EventCardProps) {
  const eventDate = new Date(event.event_date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return (
    <Card className={`
      group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1
      ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    `}>
      {isLocked && (
        <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg p-3 shadow-lg">
            <p className="text-sm font-medium text-gray-900">🔒 Upgrade Required</p>
          </div>
        </div>
      )}
      
      <div className="relative h-48 w-full overflow-hidden">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" />
        )}
        <div className="absolute top-3 right-3">
          <TierBadge tier={event.tier} />
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{formattedTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}