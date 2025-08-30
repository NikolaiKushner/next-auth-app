# TODO Feature Setup

## Database Migration Application

To enable TODO functionality, you need to apply database migrations in Supabase.

### Method 1: Through Supabase Dashboard

1. Open your project in [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to "SQL Editor" section
3. Copy the contents of `supabase/migrations/003_create_todo_tables.sql` and `supabase/migrations/004_add_slug_to_todo_lists.sql`
4. Paste into SQL Editor
5. Click "Run" to execute

### Method 2: Through Supabase CLI

If you have Supabase CLI configured:

```bash
# Make sure you're in the project root directory
cd /path/to/your/project

# Apply migrations
supabase db push

# Or apply specific migration
supabase db reset
```

### Method 3: Manually via SQL

Execute the following SQL commands in your Supabase database:

```sql
-- Create tables and configure RLS (contents of 003_create_todo_tables.sql)
-- Add slug column to todo_lists (contents of 004_add_slug_to_todo_lists.sql)
```

## Installation Verification

After applying the migration, verify:

1. **Tables created:**
   - `public.todo_lists`
   - `public.todo_items`

2. **RLS enabled:**
   - Both tables should have Row Level Security enabled

3. **Policies created:**
   - Each table should have policies for SELECT, INSERT, UPDATE, DELETE

4. **Indexes created:**
   - Check for indexes to optimize performance

5. **Slug column added:**
   - `todo_lists` table should have a `slug` column

## Testing

1. Sign in to the application with an authenticated user
2. Navigate to "TODO Lists" tab in the navigation
3. Create a new list
4. Add several tasks
5. Try marking tasks as completed
6. Test editing and deletion
7. Verify slug-based URLs work correctly

## Troubleshooting

### "relation does not exist" error
- Ensure the migration was applied correctly
- Check table presence in Supabase Dashboard

### "permission denied" error
- Check RLS settings
- Ensure policies are created correctly
- Verify user authentication

### API endpoint errors
- Ensure Supabase environment variables are configured
- Check server logs for error details

### Slug-related errors
- Ensure the slug migration (004) was applied
- Check that existing lists have generated slugs

## Environment Variables

Make sure you have configured:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Migration Files

Apply these migrations in order:
1. `supabase/migrations/003_create_todo_tables.sql` - Creates basic TODO tables
2. `supabase/migrations/004_add_slug_to_todo_lists.sql` - Adds slug support for readable URLs
