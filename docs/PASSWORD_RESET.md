# Password Reset Feature

This document outlines the password reset functionality implemented in the Next.js app with Supabase authentication.

## Overview

The password reset feature allows users to securely reset their passwords by receiving a reset link via email. The implementation follows Supabase best practices and provides a smooth user experience.

## Components

### 1. API Routes

#### `/api/auth/forgot-password` (POST)
- Sends password reset email to user
- Uses Supabase's `resetPasswordForEmail` method
- Redirects to `/reset-password` after email verification

#### `/api/auth/reset-password` (POST)
- Verifies OTP token and updates user password
- Validates password requirements (minimum 6 characters)
- Returns success/error responses

#### `/api/auth/callback` (GET)
- Handles general Supabase authentication callbacks
- Processes authorization codes and exchanges for sessions
- Redirects to appropriate pages after authentication

#### `/api/auth/password-reset-callback` (GET)
- Specialized callback for password reset flows
- Handles different token parameter formats
- Redirects to reset-password page with proper token formatting

### 2. Pages

#### `/forgot-password`
- Form to request password reset
- Email validation and submission
- Success state showing confirmation message
- Links back to sign-in page

#### `/reset-password`
- Form to set new password
- Token verification from URL parameters
- Password confirmation matching
- Success state with auto-redirect to sign-in

### 3. Components

#### `ResetPasswordForm.tsx`
- Handles the password reset form logic
- Manages token verification and password update
- Provides user feedback and error handling
- Supports multiple token parameter formats (query params and URL fragments)
- Includes debug information for development troubleshooting

## User Flow

1. **Request Reset**: User clicks "Forgot your password?" on sign-in page
2. **Email Submission**: User enters email on `/forgot-password` page
3. **Email Sent**: System sends reset email via Supabase
4. **Email Click**: User clicks reset link in email
5. **Password Reset**: User is redirected to `/reset-password` with token
6. **New Password**: User enters and confirms new password
7. **Completion**: Password updated, user redirected to sign-in

## Configuration Requirements

### Environment Variables

Make sure these environment variables are set:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=your_site_url  # e.g., http://localhost:3000
```

### Supabase Configuration

1. **Email Templates**: Configure email templates in Supabase Dashboard
   - Go to Authentication > Email Templates
   - Customize "Reset Password" template
   - Set redirect URL to: `{{ .SiteURL }}/reset-password`

2. **Site URL**: Set your site URL in Supabase Dashboard
   - Go to Authentication > Settings
   - Set Site URL to your production domain
   - Add these redirect URLs for password reset:
     - `your_domain/reset-password`
     - `your_domain/api/auth/callback`
     - `your_domain/api/auth/password-reset-callback`

## Security Features

- **Token Expiration**: Reset tokens expire automatically
- **One-time Use**: Reset tokens can only be used once
- **Email Verification**: Only sent to registered email addresses
- **Password Requirements**: Minimum 6 characters (configurable)
- **CSRF Protection**: API routes use Next.js built-in protection

## Error Handling

- Invalid email addresses
- Expired or invalid reset tokens
- Password confirmation mismatches
- Network errors and API failures
- Missing environment variables

## Testing

To test the password reset flow:

1. Ensure Supabase is configured with valid email settings
2. Create a test user account
3. Navigate to `/sign-in` and click "Forgot your password?"
4. Enter the test user's email
5. Check email inbox for reset link
6. Click the link and set a new password
7. Verify you can sign in with the new password

## Customization

### Email Templates
- Customize email content in Supabase Dashboard
- Add your branding and styling
- Modify the redirect URL if needed

### UI/UX
- Modify component styling in respective files
- Adjust validation rules in form components
- Customize success/error messages

### Security Settings
- Adjust password requirements in validation functions
- Modify token expiration settings in Supabase
- Add rate limiting for reset requests

## Troubleshooting

### Common Issues

1. **Email not received**
   - Check spam folder
   - Verify email configuration in Supabase
   - Check SMTP settings

2. **Invalid token error**
   - Token may have expired
   - Token may have been used already
   - URL may be malformed

3. **Redirect issues**
   - Verify NEXT_PUBLIC_SITE_URL is set correctly
   - Check redirect URLs in Supabase settings
   - Ensure URL formatting is correct

### Development Tips

- Test with real email addresses during development
- Use ngrok or similar for testing email links locally
- Check browser network tab for API errors
- Review Supabase logs for authentication issues
