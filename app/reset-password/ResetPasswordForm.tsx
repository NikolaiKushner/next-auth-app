'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenHash, setTokenHash] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Get the token hash from URL parameters - check multiple possible parameter names
    const hash = searchParams.get('token_hash') || 
                 searchParams.get('token') || 
                 searchParams.get('access_token');
    
    if (hash) {
      setTokenHash(hash);
      if (isDevelopment) {
        setDebugInfo(`Token found in query params: ${hash.substring(0, 20)}...`);
      }
    } else {
      // Check if we're coming from the URL fragment (common with Supabase redirects)
      const urlFragment = window.location.hash;
      if (urlFragment) {
        const params = new URLSearchParams(urlFragment.substring(1));
        const fragmentToken = params.get('access_token') || 
                             params.get('token_hash') || 
                             params.get('token');
        if (fragmentToken) {
          setTokenHash(fragmentToken);
          if (isDevelopment) {
            setDebugInfo(`Token found in URL fragment: ${fragmentToken.substring(0, 20)}...`);
          }
        } else {
          if (isDevelopment) {
            setDebugInfo(`No token found. URL: ${window.location.href}`);
          }
          // If no token found anywhere, redirect to forgot password
          setTimeout(() => router.replace('/forgot-password'), 3000);
        }
      } else {
        if (isDevelopment) {
          setDebugInfo(`No token found. URL: ${window.location.href}`);
        }
        // If no token, redirect to forgot password
        setTimeout(() => router.replace('/forgot-password'), 3000);
      }
    }
  }, [searchParams, router, isDevelopment]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !tokenHash) return;

    setIsLoading(true);
    
    try {
      const supabase = createClient();
      
      // Verify the OTP and update password
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: 'recovery',
      });

      if (error) {
        setErrors({ general: 'Invalid or expired reset link. Please request a new one.' });
        return;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (updateError) {
        setErrors({ general: updateError.message });
      } else {
        setIsSuccess(true);
        // Auto redirect to sign in after 3 seconds
        setTimeout(() => {
          router.push('/sign-in');
        }, 3000);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Password updated successfully!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your password has been changed. You&apos;ll be redirected to sign in shortly.
            </p>
          </div>
          
          <div className="mt-8">
            <Link
              href="/sign-in"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Continue to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set new password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="password"
              name="password"
              placeholder="New password"
              value={formData.password}
              onChange={handleInputChange}
              required
              error={errors.password}
              disabled={isLoading}
            />
            
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              error={errors.confirmPassword}
              disabled={isLoading}
            />
          </div>

          {errors.general && (
            <p className="text-sm text-destructive text-center">{errors.general}</p>
          )}
          
          {isDevelopment && debugInfo && (
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              Debug: {debugInfo}
            </div>
          )}
          
          <Button
            type="submit"
            fullWidth
            disabled={isLoading || !tokenHash}
            className="mt-6"
          >
            {isLoading ? 'Updating password...' : 'Update password'}
          </Button>

          <div className="text-center">
            <Link
              href="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Need a new reset link?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
