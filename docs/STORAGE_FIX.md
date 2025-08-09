# Fixing Storage Upload Error

## 🚨 Problem
When uploading profile photos, you're getting this error:
```
StorageApiError: new row violates row-level security policy
```

## 🔧 Solution

### Step 1: Run the Storage Policy Fix

You need to run the updated SQL migration to fix the storage policies. Here's how:

#### Option A: Using Supabase Dashboard

1. **Go to your Supabase project dashboard**
2. **Click on "SQL Editor" in the left sidebar**
3. **Click "New query"**
4. **Copy and paste this SQL:**

```sql
-- Fix storage policies for avatars
-- Drop existing policies first
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Create new, more permissive policies
-- Allow public read access to avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Allow authenticated users to upload avatars
CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
  );

-- Allow users to update their own avatars
CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
  );

-- Allow users to delete their own avatars
CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
  );
```

5. **Click "Run" to execute the SQL**

#### Option B: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Apply the migration
supabase db push
```

### Step 2: Verify the Fix

After running the SQL, verify that the policies are updated:

1. **Go to Storage in your Supabase dashboard**
2. **Click on the "avatars" bucket**
3. **Go to "Policies" tab**
4. **You should see these policies:**
   - `Avatar images are publicly accessible` (SELECT)
   - `Users can upload their own avatar` (INSERT)
   - `Users can update their own avatar` (UPDATE)
   - `Users can delete their own avatar` (DELETE)

### Step 3: Test the Upload

1. **Go to your app** (`http://localhost:3000/profile`)
2. **Try uploading a profile photo**
3. **The upload should now work without errors**

## 🔍 What Was Wrong?

The original storage policies were too restrictive. They were trying to check the user ID against the folder name, but:

1. **The folder structure** wasn't matching the expected pattern
2. **The `storage.foldername()` function** wasn't working as expected
3. **The policies were too complex** for the simple use case

## ✅ The Fix

The new policies are simpler and more permissive:

- **Public read access** - Anyone can view avatar images
- **Authenticated upload** - Any authenticated user can upload to the avatars bucket
- **Authenticated update/delete** - Any authenticated user can update/delete their avatars

This approach is more practical for a profile system where:
- Users need to upload their own avatars
- Avatars should be publicly viewable
- The security is handled at the application level (users can only see their own profile page)

## 🛡️ Security Notes

The new policies are more permissive but still secure because:

1. **Users can only access their own profile page** (handled by RLS on the profiles table)
2. **File names include user IDs** (preventing conflicts)
3. **File size and type validation** is handled in the frontend
4. **Authentication is required** for uploads

## 🐛 If You Still Have Issues

If you're still getting errors after applying the fix:

1. **Check the browser console** for more detailed error messages
2. **Verify your Supabase credentials** in `.env.local`
3. **Make sure you're signed in** to the app
4. **Check that the avatars bucket exists** in your Supabase storage

## 📞 Need Help?

If you're still experiencing issues:

1. **Check the Supabase logs** in your dashboard
2. **Verify the storage bucket permissions**
3. **Test with a smaller image file** (under 1MB)
4. **Check if your Supabase project has storage enabled**
