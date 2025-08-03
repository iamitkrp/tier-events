# Tier-Based Event Showcase

A modern, full-stack web application that provides tier-based access to exclusive events. Built with Next.js 15, Clerk authentication, and Supabase database.

## 🚀 Live Demo

- **Deployed Application**: [Coming Soon - Deploy to Vercel]
- **GitHub Repository**: [Current Repository]

## 🎯 Project Overview

This application demonstrates a premium membership system where users can view events based on their subscription tier:

- **Free Tier**: Community events and basic networking
- **Silver Tier**: Professional workshops and development events  
- **Gold Tier**: Exclusive conferences and VIP networking
- **Platinum Tier**: Private CEO roundtables and premium experiences

## ✨ Key Features

- 🔐 **Secure Authentication** - Clerk-powered login/signup with tier management
- 🎨 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🏷️ **Tier-Based Filtering** - Smart event filtering based on user membership
- 📱 **Modern UI/UX** - Clean, professional interface with smooth animations
- 🚀 **Performance Optimized** - Next.js 15 with App Router for optimal loading
- 🔒 **Route Protection** - Secure dashboard access for authenticated users only

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Authentication** | Clerk.dev |
| **Database** | Supabase (PostgreSQL) |
| **Styling** | Tailwind CSS 4 |
| **Language** | TypeScript |
| **Deployment** | Vercel |

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Clerk account
- Supabase account

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd tier-events
npm install
\`\`\`

### 2. Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
\`\`\`

### 3. Database Setup

#### Create Supabase Table

Run this SQL in your Supabase SQL editor:

\`\`\`sql
-- Create tier enum
CREATE TYPE tier_enum AS ENUM ('free', 'silver', 'gold', 'platinum');

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  tier tier_enum NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_tier ON events(tier);
CREATE INDEX idx_events_date ON events(event_date);
\`\`\`

### 4. Seed Sample Data

After starting the development server, visit:
\`\`\`
http://localhost:3000/api/seed
\`\`\`

Or run the seed endpoint manually to populate sample events.

### 5. Configure Clerk

1. Create a Clerk application
2. Set up the following public metadata schema for users:
\`\`\`json
{
  "tier": "free" | "silver" | "gold" | "platinum"
}
\`\`\`
3. Configure redirect URLs:
   - Sign-in redirect: \`/dashboard\`
   - Sign-up redirect: \`/dashboard\`

### 6. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:3000\` to see the application.

## 🎮 Demo User Accounts

For testing purposes, create users with different tiers by setting the \`tier\` field in Clerk's public metadata:

| Email | Tier | Access |
|-------|------|---------|
| free@example.com | free | 2 events |
| silver@example.com | silver | 4 events |
| gold@example.com | gold | 6 events |
| platinum@example.com | platinum | 8 events |

## 🏗️ Project Structure

\`\`\`
tier-events/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Protected dashboard page
│   │   ├── login/              # Clerk login page
│   │   ├── signup/             # Clerk signup page
│   │   ├── api/seed/           # Database seeding endpoint
│   │   ├── layout.tsx          # Root layout with Clerk provider
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   ├── EventCard.tsx       # Event display component
│   │   ├── TierBadge.tsx       # Tier indicator component
│   │   ├── UpgradeButton.tsx   # Tier upgrade component
│   │   └── LoadingSkeleton.tsx # Loading state components
│   └── lib/
│       ├── supabase.ts         # Supabase client & types
│       ├── tierUtils.ts        # Tier logic utilities
│       └── utils.ts            # General utilities
├── middleware.ts               # Clerk route protection
├── documentation.md            # Technical documentation
├── plan.md                     # Development plan
└── progress.md                 # Progress tracking
\`\`\`

## 🔐 Authentication Flow

1. User visits protected \`/dashboard\` route
2. Middleware redirects to \`/login\` if not authenticated
3. After successful login, user is redirected to dashboard
4. User tier is retrieved from Clerk public metadata
5. Events are filtered based on tier level

## 🎯 Tier System Logic

\`\`\`typescript
// Tier hierarchy (higher number = more access)
const TIER_HIERARCHY = {
  free: 0,     // Can access: free events only
  silver: 1,   // Can access: free + silver events  
  gold: 2,     // Can access: free + silver + gold events
  platinum: 3  // Can access: all events
}
\`\`\`

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

\`\`\`bash
npm run build
npm start
\`\`\`

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Authentication flow works (login/signup)
- [ ] Dashboard shows correct events for each tier
- [ ] Tier upgrade functionality works
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Loading states display properly
- [ ] Error handling works correctly

### Test Different Tiers

1. Sign up as new user (defaults to 'free' tier)
2. View available events
3. Use upgrade button to test tier progression
4. Verify new events appear after upgrade

## 📚 API Documentation

### GET /api/seed
Seeds the database with sample events
- **Response**: JSON with event count and details

### POST /api/seed  
Creates sample events in database
- **Response**: Success message with created events

## 🔧 Customization

### Adding New Tiers
1. Update \`TierType\` in \`tierUtils.ts\`
2. Add tier to \`TIER_HIERARCHY\` object
3. Update tier colors in \`getTierColor()\`
4. Add new tier to Supabase enum

### Modifying Event Schema
1. Update Supabase table schema
2. Update TypeScript types in \`supabase.ts\`
3. Update EventCard component if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues:
- Create an issue in this repository
- Check the documentation in \`documentation.md\`
- Review the development plan in \`plan.md\`

---

**Built with ❤️ using Next.js, Clerk, and Supabase**