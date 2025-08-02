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

--insert seed data
-- Insert sample events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
('Free Webinar: Introduction to Web Development', 'Learn the basics of HTML, CSS, and JavaScript in this comprehensive beginner-friendly webinar.', '2024-02-15T14:00:00Z', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop', 'free'),
('Silver: Advanced JavaScript Workshop', 'Deep dive into modern JavaScript features, async programming, and best practices.', '2024-02-20T15:00:00Z', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'silver'),
('Gold: React Masterclass', 'Build a complete React application with hooks, context, and advanced patterns.', '2024-02-25T16:00:00Z', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop', 'gold'),
('Platinum: Full-Stack Development Summit', 'Exclusive summit covering frontend, backend, and DevOps best practices.', '2024-03-01T10:00:00Z', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop', 'platinum'),
('Free: UI/UX Design Basics', 'Introduction to user interface and user experience design principles.', '2024-02-18T13:00:00Z', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop', 'free'),
('Silver: Database Design Workshop', 'Learn database modeling, SQL optimization, and data architecture.', '2024-02-22T14:30:00Z', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop', 'silver');