import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Check for various token parameter names that Supabase might use
  const token = searchParams.get('token') || 
               searchParams.get('token_hash') || 
               searchParams.get('access_token');
  
  const type = searchParams.get('type');
  
  // If this is a password recovery request, redirect to reset password page with token
  if (type === 'recovery' && token) {
    const resetUrl = new URL('/reset-password', request.url);
    resetUrl.searchParams.set('token_hash', token);
    
    return NextResponse.redirect(resetUrl);
  }
  
  // For other auth flows or missing parameters, redirect to appropriate page
  if (token && type === 'signup') {
    // Email confirmation
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'signup'
    });
    
    if (!error) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Default fallback - redirect to sign in
  return NextResponse.redirect(new URL('/sign-in', request.url));
}
