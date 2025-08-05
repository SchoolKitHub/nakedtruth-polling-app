import { supabase, PollResponse } from './supabase'
import crypto from 'crypto'

// Hash IP address for anonymous duplicate prevention
export function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + 'nakedtruth-salt').digest('hex')
}

// Submit a poll response
export async function submitPollResponse(data: {
  presidential_candidate: string
  key_issues: string[]
  demographics: {
    age_group: string
    region: string
    gender: string
  }
  ip_address: string
}) {
  try {
    // Hash the IP address for privacy
    const ip_hash = hashIP(data.ip_address)
    
    // Check if this IP has already responded (prevent duplicates)
    const { data: existingResponse, error: checkError } = await supabase
      .from('responses')
      .select('id')
      .eq('ip_hash', ip_hash)
      .single()
    
    if (existingResponse) {
      return { 
        success: false, 
        error: 'You have already participated in this poll. Thank you for your contribution!' 
      }
    }
    
    // Insert the new response
    const { data: response, error } = await supabase
      .from('responses')
      .insert({
        presidential_candidate: data.presidential_candidate,
        key_issues: data.key_issues,
        demographics: data.demographics,
        ip_hash: ip_hash
      })
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Failed to submit response' }
    }
    
    return { success: true, data: response }
  } catch (error) {
    console.error('Submission error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Get aggregated poll results
export async function getPollResults() {
  try {
    const { data: responses, error } = await supabase
      .from('responses')
      .select('*')
    
    if (error) {
      console.error('Error fetching results:', error)
      return { success: false, error: 'Failed to fetch results' }
    }
    
    // Aggregate the results
    const results = {
      presidential_candidates: {} as Record<string, number>,
      key_issues: {} as Record<string, number>,
      demographics: {
        age_groups: {} as Record<string, number>,
        regions: {} as Record<string, number>,
        genders: {} as Record<string, number>
      },
      total_responses: responses?.length || 0
    }
    
    responses?.forEach((response) => {
      // Count presidential candidates
      const candidate = response.presidential_candidate
      results.presidential_candidates[candidate] = (results.presidential_candidates[candidate] || 0) + 1
      
      // Count key issues
      response.key_issues?.forEach((issue: string) => {
        results.key_issues[issue] = (results.key_issues[issue] || 0) + 1
      })
      
      // Count demographics
      if (response.demographics) {
        const { age_group, region, gender } = response.demographics
        results.demographics.age_groups[age_group] = (results.demographics.age_groups[age_group] || 0) + 1
        results.demographics.regions[region] = (results.demographics.regions[region] || 0) + 1
        results.demographics.genders[gender] = (results.demographics.genders[gender] || 0) + 1
      }
    })
    
    return { success: true, data: results }
  } catch (error) {
    console.error('Results error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Check if IP has already voted (for client-side checks)
export async function checkIfAlreadyVoted(ip_address: string) {
  try {
    const ip_hash = hashIP(ip_address)
    
    const { data, error } = await supabase
      .from('responses')
      .select('id')
      .eq('ip_hash', ip_hash)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Check vote error:', error)
      return { success: false, error: 'Failed to check vote status' }
    }
    
    return { success: true, hasVoted: !!data }
  } catch (error) {
    console.error('Check vote error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
} 