'use client'


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
    <div className={`
      group relative overflow-hidden rounded-2xl backdrop-blur-sm border border-black/10 
      transition-all duration-500 hover:scale-105 hover:bg-white/90
      ${isLocked ? 'bg-white/40' : 'bg-white/80 cursor-pointer'}
    `}>
      {isLocked && (
        <div className="absolute inset-0 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-black/10 shadow-lg">
            <p className="text-sm font-medium text-black flex items-center gap-2">
              <span className="text-lg">🔒</span>
              Upgrade Required
            </p>
          </div>
        </div>
      )}
      
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 via-gray-300 to-slate-400 opacity-80" />
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
        <div className="absolute top-4 right-4">
          <TierBadge tier={event.tier} />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-light text-black mb-2 line-clamp-2 group-hover:text-black transition-colors">
            {event.title}
          </h3>
          <div className="w-8 h-0.5 bg-black/20 mb-3"></div>
          <p className="text-black/70 text-sm font-light line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-black/60">
            <Calendar className="h-4 w-4" />
            <span className="font-light">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-black/60">
            <MapPin className="h-4 w-4" />
            <span className="font-light">{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-black/10 transition-colors duration-300 pointer-events-none"></div>
    </div>
  )
}