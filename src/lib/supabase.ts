import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Poll {
  id: string
  question_text: string
  options: string[]
  created_at: string
  is_active: boolean
}

export interface PollResponse {
  id: string
  poll_id: string
  presidential_candidate: string
  key_issues: string[]
  demographics: {
    age_group: string
    region: string
    gender: string
  }
  ip_hash: string
  created_at: string
}

export interface ResultsCache {
  id: string
  poll_id: string
  results: {
    presidential_candidates: Record<string, number>
    key_issues: Record<string, number>
    demographics: {
      age_groups: Record<string, number>
      regions: Record<string, number>
      genders: Record<string, number>
    }
    total_responses: number
  }
  updated_at: string
} 