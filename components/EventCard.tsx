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

  const getTierGradient = (tier: string) => {
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
    <div className="cuberto-card overflow-hidden animate-fade-in-up hover:scale-105 transition-all duration-300 group">
      {/* Event Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Tier Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getTierGradient(event.tier)} text-white shadow-lg`}>
            {event.tier.toUpperCase()}
          </span>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-semibold text-[var(--cuberto-text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--cuberto-accent-blue)] transition-colors duration-300">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-[var(--cuberto-text-secondary)] text-sm mb-4 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Event Date and Time */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-[var(--cuberto-text-muted)]">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
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
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-[var(--cuberto-text-muted)]">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
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
        <div className="mt-auto">
          <button className="w-full cb-btn_more3 group-hover:bg-[var(--cuberto-accent-blue)] group-hover:text-white transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}