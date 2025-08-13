# Password Reset Setup Guide

## Quick Start

The password reset feature is now fully implemented! Here's what you need to do to get it working:

## 1. Environment Configuration

Add this environment variable to your `.env.local` file:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # For development
# or your production URL: https://yourapp.com
```

## 2. Supabase Configuration

### Email Settings
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Email Templates**
3. Select **Reset Password** template
4. Update the template with your branding
5. Ensure the redirect URL includes: `{{ .SiteURL }}/reset-password`

### Site URL Settings
1. In Supabase Dashboard, go to **Authentication** > **Settings**
2. Set **Site URL** to your domain (e.g., `http://localhost:3000` for dev)
3. Add these redirect URLs for password reset:
   - `http://localhost:3000/reset-password`
   - `http://localhost:3000/api/auth/callback`
   - `http://localhost:3000/api/auth/password-reset-callback`

### SMTP Configuration
1. Configure SMTP settings in **Authentication** > **Settings**
2. Use your preferred email service (SendGrid, Mailgun, etc.)
3. Test email delivery with a sample reset request

## 3. Test the Feature

1. Start your development server: `npm run dev`
2. Navigate to `/sign-in`
3. Click "Forgot your password?"
4. Enter a valid email address
5. Check your email for the reset link
6. Click the link to reset your password

## 4. Files Created

### API Routes
- `/app/api/auth/forgot-password/route.ts` - Sends reset email
- `/app/api/auth/reset-password/route.ts` - Verifies and resets password
- `/app/api/auth/callback/route.ts` - Handles Supabase auth callbacks
- `/app/api/auth/password-reset-callback/route.ts` - Specialized password reset callback

### Pages
- `/app/forgot-password/page.tsx` - Password reset request form
- `/app/reset-password/page.tsx` - Password reset form (from email link)
- `/app/reset-password/ResetPasswordForm.tsx` - Reset form component

### Updated Files
- `/app/sign-in/page.tsx` - Added working "Forgot password?" link

## 5. Features Included

✅ **Email-based password reset**
✅ **Secure token verification**
✅ **Password strength validation**
✅ **User-friendly error handling**
✅ **Responsive design**
✅ **Success/failure feedback**
✅ **Auto-redirect after success**
✅ **Production-ready security**
✅ **Multiple URL format support** - Works with query params and URL fragments
✅ **Robust callback handling** - Multiple callback routes for reliability
✅ **Debug information** - Development debugging for troubleshooting

## 6. Security Features

- Tokens expire automatically (configurable in Supabase)
- One-time use tokens
- CSRF protection via Next.js
- Email verification required
- Strong password requirements
- Rate limiting (via Supabase)

## 7. Customization Options

### Styling
- Modify Tailwind classes in components
- Update color scheme and branding
- Customize form layouts

### Validation
- Adjust password requirements in form validation
- Modify email validation rules
- Add additional security checks

### Email Templates
- Customize email content in Supabase
- Add your logo and branding
- Modify email styling

## 8. Troubleshooting

### Common Issues

**"Email not received"**
- Check spam folder
- Verify SMTP settings in Supabase
- Check email provider settings

**"Invalid or expired reset code"**
- Link may have expired (check Supabase token expiry settings)
- Link may have been used already
- User may have requested multiple resets

**"Site URL mismatch"**
- Verify `NEXT_PUBLIC_SITE_URL` matches your domain
- Check Supabase site URL settings
- Ensure redirect URLs are whitelisted

### Development Tips

- Use real email addresses for testing
- Check browser network tab for API errors
- Review Supabase authentication logs
- Test with different email providers

## 9. Production Deployment

1. Set production `NEXT_PUBLIC_SITE_URL`
2. Configure production SMTP settings
3. Update Supabase site URL to production domain
4. Test email delivery in production
5. Monitor error logs and email delivery rates

The password reset feature is now ready for production use! 🎉
