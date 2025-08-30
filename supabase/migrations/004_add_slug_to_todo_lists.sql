-- Add slug column to todo_lists table
ALTER TABLE public.todo_lists ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create unique index on user_id + slug combination (users can have unique slugs)
CREATE UNIQUE INDEX IF NOT EXISTS todo_lists_user_slug_unique ON public.todo_lists(user_id, slug);

-- Create index for fast slug lookups
CREATE INDEX IF NOT EXISTS todo_lists_slug_idx ON public.todo_lists(slug);

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to generate unique slug for a user
CREATE OR REPLACE FUNCTION generate_unique_slug(user_id UUID, title TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 1;
BEGIN
  base_slug := generate_slug(title);
  final_slug := base_slug;
  
  -- Check if slug already exists for this user
  WHILE EXISTS (
    SELECT 1 FROM public.todo_lists 
    WHERE todo_lists.user_id = generate_unique_slug.user_id 
    AND slug = final_slug
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter::TEXT;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Update existing records to have slugs
UPDATE public.todo_lists 
SET slug = generate_unique_slug(user_id, title) 
WHERE slug IS NULL;

-- Make slug NOT NULL after updating existing records
ALTER TABLE public.todo_lists ALTER COLUMN slug SET NOT NULL;
