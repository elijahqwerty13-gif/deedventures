import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  category: string
  price: number
  image_url: string
  created_at: string
}

export type Settings = {
  id: string
  phone: string
  location: string
  updated_at: string
}

export const CATEGORIES = [
  'Leather Case Series',
  'Multi-Port Hubs',
  'Fast Cables',
  'Magnetic Car Mounts',
] as const

export function formatGHS(price: number): string {
  return `GH₵${price.toFixed(2)}`
}
