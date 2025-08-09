import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';
import AvatarUpload from './AvatarUpload';
import Navigation from '../components/Navigation';
import Button from '../components/Button';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const handleSignOut = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/sign-in');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account information and preferences
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Navigation />
              <form action={handleSignOut}>
                <Button variant="outline" type="submit">
                  Sign Out
                </Button>
              </form>
            </div>
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
      </div>
    </div>
  );
}
