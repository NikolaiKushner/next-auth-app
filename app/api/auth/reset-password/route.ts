import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password, code } = await request.json();

    if (!password || !code) {
      return NextResponse.json(
        { error: 'Password and verification code are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash: code,
      type: 'recovery',
    });

    if (error) {
      console.error('OTP verification error:', error);
      return NextResponse.json(
        { error: 'Invalid or expired reset code' },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.error('Password update error:', updateError);
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Reset password API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
