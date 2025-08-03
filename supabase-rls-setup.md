# Supabase Row Level Security (RLS) Setup

This document provides a comprehensive guide for implementing Row Level Security (RLS) policies for the Tier-Based Event Showcase application.

## 🔒 Overview

Row Level Security (RLS) allows you to control access to individual rows in your database tables based on user context. For our tier-based event system, we can implement RLS to ensure users can only query events they have access to based on their tier level.

## 🛠️ Implementation Steps

### 1. Enable RLS on Events Table

```sql
-- Enable RLS on the events table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

### 2. Create Tier Hierarchy Function

First, create a function to handle tier hierarchy comparison:

```sql
-- Create a function to get tier level
CREATE OR REPLACE FUNCTION get_tier_level(tier_name text)
RETURNS integer AS $$
BEGIN
  CASE tier_name
    WHEN 'free' THEN RETURN 0;
    WHEN 'silver' THEN RETURN 1;
    WHEN 'gold' THEN RETURN 2;
    WHEN 'platinum' THEN RETURN 3;
    ELSE RETURN -1;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

### 3. Create RLS Policies

#### Option A: JWT-Based Policy (Recommended)

If you're storing user tier in JWT tokens:

```sql
-- Policy for SELECT operations based on user tier from JWT
CREATE POLICY "Users can view events for their tier or below" ON events
FOR SELECT using (
  get_tier_level(tier::text) <= get_tier_level(
    COALESCE(
      (auth.jwt() ->> 'user_metadata')::json ->> 'tier',
      (auth.jwt() ->> 'app_metadata')::json ->> 'tier',
      'free'
    )
  )
);
```

#### Option B: User Table Join Policy

If you have a separate users table with tier information:

```sql
-- Create users table to store tier information
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL, -- Clerk user ID
  tier tier_enum NOT NULL DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy for user profiles (users can only see their own profile)
CREATE POLICY "Users can view own profile" ON user_profiles
FOR SELECT using (user_id = auth.jwt() ->> 'sub');

-- Policy for events using user profile join
CREATE POLICY "Users can view events for their tier or below" ON events
FOR SELECT using (
  EXISTS (
    SELECT 1 FROM user_profiles up
    WHERE up.user_id = auth.jwt() ->> 'sub'
    AND get_tier_level(events.tier::text) <= get_tier_level(up.tier::text)
  )
);
```

### 4. Create Additional Policies for Admin Access

```sql
-- Allow service role to bypass RLS (for seeding, admin operations)
CREATE POLICY "Service role can access all events" ON events
FOR ALL using (auth.role() = 'service_role');

-- Allow authenticated users to view all event metadata for locked previews
-- (but implement tier filtering in application logic)
CREATE POLICY "Authenticated users can preview events" ON events
FOR SELECT using (auth.role() = 'authenticated');
```

### 5. Test the Policies

```sql
-- Test queries with different user contexts
-- This would be done through your application with proper JWT tokens

-- Example: Test as free tier user
SELECT * FROM events; -- Should only return free tier events

-- Example: Test as gold tier user  
SELECT * FROM events; -- Should return free, silver, and gold tier events
```

## 🔧 Integration with Application

### Update Supabase Client Configuration

For RLS to work properly with user context, you need to pass the user's JWT token:

```typescript
// lib/supabase-server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createServerSupabaseClient = () => {
  return createServerComponentClient({ cookies })
}

// lib/supabase-client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClientSupabaseClient = () => {
  return createClientComponentClient()
}
```

### Update Database Queries

With RLS enabled, your existing queries will automatically respect the policies:

```typescript
// This query will now automatically filter based on user tier
const { data: events } = await supabase
  .from('events')
  .select('*')
  .order('event_date', { ascending: true })
```

## 🔄 Hybrid Approach (Recommended)

For the best user experience, use a hybrid approach:

1. **Client-side filtering** for immediate UI feedback
2. **RLS policies** for security enforcement
3. **Application logic** for locked event previews

```typescript
// In your dashboard component
const fetchEvents = async () => {
  // Fetch all events (RLS will filter based on user tier)
  const { data: accessibleEvents } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })

  // Fetch locked events for preview (requires separate query or policy)
  const { data: allEvents } = await supabaseAdmin // Service role client
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })

  const lockedEvents = allEvents?.filter(event => 
    !canAccessTier(userTier, event.tier)
  ) || []

  return { accessibleEvents, lockedEvents }
}
```

## 🛡️ Security Considerations

### Advantages of RLS
- **Database-level security** - Even if application logic fails, database enforces rules
- **Consistent enforcement** - All queries automatically respect policies
- **Audit trail** - Database logs show policy enforcement
- **Performance** - Database can optimize queries based on policies

### Implementation Notes
- **JWT token management** - Ensure user context is properly passed to Supabase
- **Policy testing** - Thoroughly test policies with different user scenarios
- **Performance impact** - RLS adds overhead to queries, monitor performance
- **Debugging** - Use `EXPLAIN` to understand query execution with RLS

### Best Practices
1. **Start simple** - Begin with basic policies and add complexity gradually
2. **Test thoroughly** - Verify policies work correctly for all user types
3. **Monitor performance** - RLS can impact query performance
4. **Use service role wisely** - Only bypass RLS when absolutely necessary
5. **Keep policies maintainable** - Document complex policy logic clearly

## 🧪 Testing RLS Policies

### Manual Testing Script

```sql
-- Create test function to simulate different user contexts
CREATE OR REPLACE FUNCTION test_rls_policy(test_user_tier text)
RETURNS TABLE(event_id uuid, event_title text, event_tier tier_enum) AS $$
BEGIN
  -- This would need to be adapted based on your JWT structure
  RETURN QUERY
  SELECT e.id, e.title, e.tier
  FROM events e
  WHERE get_tier_level(e.tier::text) <= get_tier_level(test_user_tier);
END;
$$ LANGUAGE plpgsql;

-- Test different scenarios
SELECT * FROM test_rls_policy('free');    -- Should return 2 events
SELECT * FROM test_rls_policy('silver');  -- Should return 4 events
SELECT * FROM test_rls_policy('gold');    -- Should return 6 events
SELECT * FROM test_rls_policy('platinum'); -- Should return 8 events
```

## 📚 Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [JWT Token Structure in Supabase](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)

## 🚀 Production Deployment

When deploying to production:

1. **Enable RLS** on all tables containing sensitive data
2. **Create comprehensive policies** covering all use cases
3. **Test policies** with real user scenarios
4. **Monitor performance** and optimize queries if needed
5. **Set up logging** to track policy enforcement

---

*This RLS setup provides enterprise-grade security for your tier-based event system while maintaining excellent performance and user experience.*