import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Types pour TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'client' | 'restaurant_owner' | 'admin'
          created_at: string
          updated_at: string
        }
      }
      restaurants: {
        Row: {
          id: string
          owner_id: string
          name: string
          slug: string
          description: string
          banner_url: string
          latitude: number
          longitude: number
          is_certified: boolean
          is_active: boolean
          quality_score: number
          created_at: string
          updated_at: string
        }
      }
      // ... autres tables
    }
  }
}
