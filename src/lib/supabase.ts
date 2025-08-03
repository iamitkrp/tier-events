import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          image_url: string | null
          location: string | null
          tier: 'free' | 'silver' | 'gold' | 'platinum'
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          event_date: string
          image_url?: string | null
          location?: string | null
          tier: 'free' | 'silver' | 'gold' | 'platinum'
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_date?: string
          image_url?: string | null
          location?: string | null
          tier?: 'free' | 'silver' | 'gold' | 'platinum'
          created_at?: string
        }
      }
    }
  }
}

export type Event = Database['public']['Tables']['events']['Row']