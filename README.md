# Tier-Based Event Showcase

A modern web application that provides tier-based access to exclusive events.

## 🚀 Live Demo

**[View Live Demo →](https://psypher-task-kappa.vercel.app/)**

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript

## ✨ Features

- 🔐 Secure authentication with tier management
- 🎨 Responsive design with modern UI
- 🏷️ Tier-based event filtering (Free → Silver → Gold → Platinum)
- 📱 Mobile-first responsive design

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd tier-events
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Clerk and Supabase keys

# Start development server
npm run dev
```

## 📝 Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## 🗄️ Database Setup

Run this SQL in your Supabase console:

```sql
CREATE TYPE tier_enum AS ENUM ('free', 'silver', 'gold', 'platinum');

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  tier tier_enum NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Seed sample data: Visit `/api/seed` after setup.

---

**Built with ❤️ by [Amit](https://amitkp.com)**