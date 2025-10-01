import { NextRequest, NextResponse } from 'next/server'
import { submitPollResponse, generateFingerprint } from '@/lib/database'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    // Get client IP address and user agent
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const realIP = headersList.get('x-real-ip')
    const ip = forwarded?.split(',')[0] || realIP || 'unknown'
    const userAgent = headersList.get('user-agent') || ''
    const acceptLanguage = headersList.get('accept-language') || 'en'
    
    // Generate browser fingerprint
    const fingerprint = generateFingerprint(userAgent, acceptLanguage)
    
    // Parse request body
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['presidential_candidate', 'key_issues', 'demographics', 'consent']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }
    
    // Validate consent
    if (!body.consent) {
      return NextResponse.json(
        { success: false, error: 'Consent is required to participate' },
        { status: 400 }
      )
    }
    
    // Validate demographics
    const { demographics } = body
    if (!demographics.age_group || !demographics.region || !demographics.gender) {
      return NextResponse.json(
        { success: false, error: 'All demographic fields are required' },
        { status: 400 }
      )
    }
    
    // Validate key issues (should be an array)
    if (!Array.isArray(body.key_issues) || body.key_issues.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one key issue must be selected' },
        { status: 400 }
      )
    }
    
    // Submit to database
    const result = await submitPollResponse({
      presidential_candidate: body.presidential_candidate,
      key_issues: body.key_issues,
      demographics: {
        age_group: demographics.age_group,
        region: demographics.region,
        gender: demographics.gender
      },
      ip_address: ip,
      fingerprint: fingerprint
    })
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.error?.includes('already participated') ? 409 : 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for participating! Your response has been recorded anonymously.'
    })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 