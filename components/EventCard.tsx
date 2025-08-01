import { type Event, getTierColor } from '@/lib/supabase';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  // Format the date
  const eventDate = new Date(event.event_date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="cuberto-card overflow-hidden animate-fade-in-up hover:scale-105 transition-all duration-300">
      {/* Event Image */}
      <div className="relative h-48 w-full">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Tier Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-block px-3 py-1 rounded-full text-[var(--cuberto-text-primary)] text-sm font-medium glass-effect">
            {event.tier.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-semibold text-[var(--cuberto-text-primary)] mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-[var(--cuberto-text-secondary)] text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Event Date and Time */}
        <div className="space-y-1">
          <div className="flex items-center text-sm text-[var(--cuberto-text-muted)]">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3a4 4 0 118 0v4m-4 7h8m-8 0a4 4 0 00-4 4v2a4 4 0 004 4h8a4 4 0 004-4v-2a4 4 0 00-4-4m-8 0V7"
              />
            </svg>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-[var(--cuberto-text-muted)]">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button className="w-full cb-btn_more3">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}