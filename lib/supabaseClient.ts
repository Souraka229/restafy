import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Types pour TypeScript
export type User = {
  id: string
  email: string
  full_name?: string
  phone?: string
  role: 'client' | 'restaurant_owner' | 'admin'
  avatar_url?: string
  created_at: string
}

export type Restaurant = {
  id: string
  owner_id: string
  name: string
  slug: string
  description: string
  banner_url: string
  logo_url: string
  address: string
  latitude: number
  longitude: number
  phone: string
  email: string
  category: string
  price_range: '€' | '€€' | '€€€'
  is_certified: boolean
  quality_score: number
  delivery_time: string
  min_order_amount: number
  is_active: boolean
  created_at: string
  updated_at: string
}
