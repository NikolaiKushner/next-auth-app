export interface Profile {
  id: string;
  full_name?: string;
  bio?: string;
  website?: string;
  location?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileFormData {
  full_name: string;
  bio: string;
  website: string;
  location: string;
}

export interface UserProfile extends Profile {
  email?: string;
  last_sign_in_at?: string;
}
