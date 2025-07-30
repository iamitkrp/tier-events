# 🎉 Tier-Based Event Showcase

A modern web application that demonstrates a membership-tiered event system where users can view different events based on their subscription tier. Built with Next.js 14, Clerk authentication, and Supabase database.

## ✨ Features

- **🔐 Secure Authentication**: User authentication powered by Clerk.dev
- **🏆 Tier-Based Access Control**: Events filtered based on user membership tier
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🎨 Modern UI**: Built with Tailwind CSS and modern design principles
- **⚡ Real-time Updates**: Instant tier upgrades and event filtering
- **🔄 Tier Simulation**: Demo tier upgrade functionality

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Clerk.dev account
- Supabase account

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd tier-events
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Database Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings > API

#### Create Events Table
Run this SQL in your Supabase SQL editor:

```sql
-- Create tier enum
CREATE TYPE tier_type AS ENUM ('free', 'silver', 'gold', 'platinum');

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT NOT NULL,
  tier tier_type NOT NULL DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
('Free Webinar: Introduction to Web Development', 'Learn the basics of HTML, CSS, and JavaScript in this comprehensive beginner-friendly webinar.', '2024-02-15T14:00:00Z', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop', 'free'),
('Silver: Advanced JavaScript Workshop', 'Deep dive into modern JavaScript features, async programming, and best practices.', '2024-02-20T15:00:00Z', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'silver'),
('Gold: React Masterclass', 'Build a complete React application with hooks, context, and advanced patterns.', '2024-02-25T16:00:00Z', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop', 'gold'),
('Platinum: Full-Stack Development Summit', 'Exclusive summit covering frontend, backend, and DevOps best practices.', '2024-03-01T10:00:00Z', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop', 'platinum'),
('Free: UI/UX Design Basics', 'Introduction to user interface and user experience design principles.', '2024-02-18T13:00:00Z', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop', 'free'),
('Silver: Database Design Workshop', 'Learn database modeling, SQL optimization, and data architecture.', '2024-02-22T14:30:00Z', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop', 'silver');
```

### 5. Clerk Setup

1. Go to [clerk.dev](https://clerk.dev) and create a new application
2. Configure your authentication settings
3. Get your publishable and secret keys
4. Update your `.env.local` file with the keys

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 How It Works

### Tier System
- **Free Tier**: Access to free events only
- **Silver Tier**: Access to free + silver events  
- **Gold Tier**: Access to free + silver + gold events
- **Platinum Tier**: Access to all events

### User Flow
1. User signs in via Clerk authentication
2. System checks user's tier from metadata (defaults to 'free')
3. Events are filtered based on allowed tiers
4. User can simulate tier upgrades to see more events
5. Responsive grid displays events with tier badges

## 📱 Pages

- **`/`** - Landing page with authentication and tier information
- **`/events`** - Protected events page with tier-based filtering
- **Tier Upgrade** - Simulation component for testing tier changes

## 🎨 Components

- **EventCard** - Displays individual events with tier badges
- **TierUpgrade** - Allows users to simulate tier upgrades
- **Layout** - Main application layout with authentication

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key  
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Database Schema
```sql
events table:
- id (UUID, Primary Key)
- title (Text)
- description (Text) 
- event_date (Timestamp)
- image_url (Text)
- tier (Enum: free, silver, gold, platinum)
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Make sure to add all environment variables in your Vercel project settings.

## 🧪 Testing

### Authentication Flow
1. Visit the landing page
2. Click "Sign In" to authenticate
3. Verify you can access the events page
4. Test sign out functionality

### Tier Filtering
1. Sign in as a free user
2. Verify only free events are visible
3. Use tier upgrade simulation
4. Verify new events appear after upgrade

### Responsive Design
1. Test on desktop, tablet, and mobile
2. Verify grid layout adapts properly
3. Check navigation and buttons work on all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the environment variables are set correctly
2. Verify database schema is created properly
3. Ensure Clerk and Supabase are configured
4. Check the browser console for errors

## 🎉 Demo

Visit the live demo: [Your Demo URL]

**Demo Credentials:**
- Email: demo@example.com
- Password: demo123

---

Built with ❤️ using Next.js, Clerk, and Supabase
