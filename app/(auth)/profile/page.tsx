import { createClient } from '@/lib/supabase/server';
import ProfileForm from './ProfileForm';
import AvatarUpload from './AvatarUpload';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // This should not happen due to layout auth check
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Avatar Section */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
          <AvatarUpload user={user} currentAvatar={profile?.avatar_url} />
        </div>

        {/* Profile Information Section */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <ProfileForm user={user} profile={profile} />
        </div>
      </div>
    </div>
  );
}
