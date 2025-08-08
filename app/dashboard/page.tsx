import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Button from '../components/Button';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const handleSignOut = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/sign-in');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <form action={handleSignOut}>
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
          
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}!</h2>
            <p className="text-muted-foreground">
              You have successfully signed in to your account. This is your protected dashboard page.
            </p>
            
            <div className="mt-6 p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">User Information:</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>User ID:</strong> {user.id}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Last Sign In:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
