import { createClient, SupabaseClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Avoid creating a Supabase client with placeholder or missing env vars at module load time
// which causes `Invalid URL` errors during Next build. If the env vars are not provided
// (for local builds using the example .env), export a small stub that returns errors.
let _supabase: SupabaseClient | null = null

const looksLikePlaceholder = (v: string) => v.includes('your_supabase') || v.trim() === ''

if (!looksLikePlaceholder(rawUrl) && !looksLikePlaceholder(rawKey)) {
  _supabase = createClient(rawUrl, rawKey)
} else {
  // Lightweight stub: chainable `from()` returning methods that resolve to an error-like shape.
  _supabase = {
    from: () => ({
      select: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      insert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      maybeSingle: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      single: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      eq: () => ({ select: async () => ({ data: null, error: { message: 'Supabase not configured' } }) }),
      gte: () => ({ select: async () => ({ data: null, error: { message: 'Supabase not configured' } }) }),
    }),
  } as unknown as SupabaseClient
}

export const supabase = _supabase as SupabaseClient

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