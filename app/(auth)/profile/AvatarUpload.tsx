'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Button from '../../components/Button';
import { Upload, X, User as UserIcon } from 'lucide-react';

interface AvatarUploadProps {
  user: User;
  currentAvatar?: string | null;
}

export default function AvatarUpload({ user, currentAvatar }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file.' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 5MB.' });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    uploadAvatar(file);
  };

  const uploadAvatar = async (file: File) => {
    setIsUploading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(updateError.message);
      }

      setMessage({ type: 'success', text: 'Avatar updated successfully!' });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      let errorMessage = 'Failed to upload avatar. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('row-level security policy')) {
          errorMessage = 'Storage access denied. Please check your permissions.';
        } else if (error.message.includes('bucket')) {
          errorMessage = 'Storage bucket not found. Please contact support.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setMessage({ type: 'error', text: errorMessage });
      setPreviewUrl(currentAvatar || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeAvatar = async () => {
    setIsUploading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      
      // Remove avatar from profile
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: null,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      setPreviewUrl(null);
      setMessage({ type: 'success', text: 'Avatar removed successfully!' });
    } catch (error) {
      console.error('Error removing avatar:', error);
      setMessage({ type: 'error', text: 'Failed to remove avatar. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="relative w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Profile avatar"
            width={128}
            height={128}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <UserIcon className="w-12 h-12 text-gray-400" />
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, GIF up to 5MB
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Photo
        </Button>
        
        {previewUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={removeAvatar}
            disabled={isUploading}
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileSelect(file);
          }
        }}
        className="hidden"
      />

      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
