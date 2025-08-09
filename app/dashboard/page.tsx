import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Button from '../components/Button';
import Navigation from '../components/Navigation';
import { User } from 'lucide-react';

export default async function Dashboard() {
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

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Get display name
  const getDisplayName = () => {
    if (profile?.full_name) {
      return profile.full_name;
    }
    // Truncate email if no name is set
    return truncateText(user.email || '', 25);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Navigation />
              <form action={handleSignOut}>
                <Button variant="outline" type="submit">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold truncate" title={profile?.full_name || user.email}>
                      {getDisplayName()}
                    </h2>
                    <p className="text-muted-foreground text-sm truncate" title={profile?.location || 'No location set'}>
                      {profile?.location || 'No location set'}
                    </p>
                  </div>
                </div>
                
                {profile?.bio && (
                  <p className="text-sm text-muted-foreground mb-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {profile.bio}
                  </p>
                )}
                
                <Link href="/profile">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
                <p className="text-muted-foreground mb-6">
                  You have successfully signed in to your account. This is your protected dashboard page.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-md">
                    <h3 className="font-medium mb-2">Account Information</h3>
                    <p className="text-sm text-muted-foreground break-all">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-sm text-muted-foreground break-all">
                      <strong>User ID:</strong> {user.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Last Sign In:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-md">
                    <h3 className="font-medium mb-2">Profile Status</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>Name:</strong> {profile?.full_name || 'Not set'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Location:</strong> {profile?.location || 'Not set'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Website:</strong> {profile?.website || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
