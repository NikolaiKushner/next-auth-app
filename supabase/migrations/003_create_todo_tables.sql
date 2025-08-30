-- Create todo_lists table
CREATE TABLE IF NOT EXISTS public.todo_lists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create todo_items table
CREATE TABLE IF NOT EXISTS public.todo_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    list_id UUID REFERENCES public.todo_lists(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false NOT NULL,
    priority INTEGER DEFAULT 0 NOT NULL, -- 0: low, 1: medium, 2: high
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS todo_lists_user_id_idx ON public.todo_lists(user_id);
CREATE INDEX IF NOT EXISTS todo_lists_created_at_idx ON public.todo_lists(created_at DESC);
CREATE INDEX IF NOT EXISTS todo_items_list_id_idx ON public.todo_items(list_id);
CREATE INDEX IF NOT EXISTS todo_items_completed_idx ON public.todo_items(completed);
CREATE INDEX IF NOT EXISTS todo_items_due_date_idx ON public.todo_items(due_date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.todo_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todo_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for todo_lists
CREATE POLICY "Users can view their own todo lists" ON public.todo_lists
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own todo lists" ON public.todo_lists
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todo lists" ON public.todo_lists
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todo lists" ON public.todo_lists
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for todo_items
CREATE POLICY "Users can view items from their own todo lists" ON public.todo_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.todo_lists
            WHERE id = todo_items.list_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert items to their own todo lists" ON public.todo_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.todo_lists
            WHERE id = todo_items.list_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update items in their own todo lists" ON public.todo_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.todo_lists
            WHERE id = todo_items.list_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete items from their own todo lists" ON public.todo_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.todo_lists
            WHERE id = todo_items.list_id AND user_id = auth.uid()
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER handle_updated_at_todo_lists
    BEFORE UPDATE ON public.todo_lists
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_todo_items
    BEFORE UPDATE ON public.todo_items
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
