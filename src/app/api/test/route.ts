import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    return NextResponse.json({
      success: true,
      env_check: {
        supabase_url_configured: !!supabaseUrl,
        supabase_key_configured: !!supabaseKey,
        supabase_url_preview: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'NOT SET',
        supabase_key_preview: supabaseKey ? supabaseKey.substring(0, 30) + '...' : 'NOT SET'
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Environment check failed'
    })
  }
} 