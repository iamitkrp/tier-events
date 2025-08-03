# Tier-Based Event Showcase - Technical Documentation

## 🚀 Project Overview

The Tier-Based Event Showcase is a full-stack web application that allows users to view events based on their subscription tier. Users can only access events at their tier level or below, creating a premium experience for higher-tier subscribers.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14+ (App Router)
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel

### Key Features
- Tier-based authentication (Free, Silver, Gold, Platinum)
- Event filtering based on user tier
- Responsive card-based event display
- Secure route protection
- Upgrade tier functionality

## 🗄️ Data Model

### Supabase Events Table
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  tier tier_enum NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE tier_enum AS ENUM ('free', 'silver', 'gold', 'platinum');
```

### User Data (Clerk Metadata)
```typescript
interface UserPublicMetadata {
  tier: 'free' | 'silver' | 'gold' | 'platinum';
}
```

## 🔐 Authentication Flow

### Clerk Integration
1. User visits protected route (`/dashboard`)
2. Redirected to Clerk login if not authenticated
3. After login, user tier retrieved from Clerk public metadata
4. Dashboard displays events based on tier level

### Tier Hierarchy
- **Free**: Can view Free events only
- **Silver**: Can view Free + Silver events
- **Gold**: Can view Free + Silver + Gold events  
- **Platinum**: Can view all events

## 🎯 Filtering Logic

### Tier Comparison Utility (`lib/tierUtils.ts`)
```typescript
const TIER_HIERARCHY = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3
} as const;

export function canAccessTier(userTier: TierType, eventTier: TierType): boolean {
  return TIER_HIERARCHY[userTier] >= TIER_HIERARCHY[eventTier];
}
```

## 🎨 UI/UX Design

### Design Philosophy
- Clean, modern interface inspired by Cuberto and Privault
- Bold typography hierarchy
- Subtle gradients and hover animations
- Mobile-first responsive design
- Color-coded tier badges

### Component Structure
```
/components
  ├── EventCard.tsx        # Event display card
  ├── TierBadge.tsx       # Color-coded tier indicator
  ├── UpgradeButton.tsx   # Tier upgrade CTA
  └── ui/
      ├── button.tsx      # Reusable button component
      └── card.tsx        # Base card component
```

## 🔒 Security

### Route Protection
- All protected routes wrapped with Clerk's auth middleware
- Server-side tier verification for sensitive operations
- Environment variables for sensitive API keys

### Row Level Security (RLS)
Future enhancement for Supabase policies:
```sql
CREATE POLICY "Users can only view events for their tier or below" ON events
FOR SELECT USING (
  tier_hierarchy(tier) <= tier_hierarchy(
    (auth.jwt() ->> 'user_metadata')::json ->> 'tier'
  )::tier_enum
);
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

### Key Responsive Features
- Flexible grid layout
- Touch-friendly interaction areas
- Optimized typography scaling
- Adaptive navigation

## 🚀 Performance Optimizations

### Client-Side
- Next.js Image optimization
- Component lazy loading
- Efficient state management
- Minimal bundle size

### Server-Side
- API route optimization
- Database query optimization
- Proper caching strategies
- CDN integration via Vercel

## 🌍 Deployment

### Environment Variables
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Vercel Configuration
- Automatic deployment from Git
- Environment variable management
- Edge function support
- Built-in analytics

## 🧪 Testing Strategy

### Unit Tests
- Component rendering tests
- Utility function tests
- Tier filtering logic tests

### Integration Tests
- Authentication flow tests
- Database interaction tests
- API endpoint tests

### E2E Tests
- User journey tests
- Cross-browser compatibility
- Mobile responsiveness tests

## 🔄 Future Enhancements

1. **Payment Integration**: Stripe for tier upgrades
2. **Real-time Updates**: WebSocket for live event updates
3. **Advanced Filtering**: Search, date range, categories
4. **Social Features**: Event favorites, sharing
5. **Analytics**: Event engagement tracking
6. **Notification System**: Email/push notifications
7. **Admin Panel**: Event management interface

## 📊 Monitoring & Analytics

### Error Tracking
- Sentry integration for error monitoring
- Custom error boundaries
- Logging strategy

### Performance Monitoring
- Core Web Vitals tracking
- Database query performance
- API response times

### User Analytics
- Event view tracking
- Tier upgrade conversion rates
- User engagement metrics