import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateTodoListData } from '@/lib/types';
import { generateSlug } from '@/lib/utils';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get todo lists with item counts
    const { data: todoLists, error } = await supabase
      .from('todo_lists')
      .select(`
        *,
        todo_items!inner (
          id,
          completed
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todo lists:', error);
      return NextResponse.json({ error: 'Failed to fetch todo lists' }, { status: 500 });
    }

    // Transform data to include counts
    const listsWithCounts = todoLists?.map(list => {
      const items = list.todo_items || [];
      return {
        ...list,
        todo_items: undefined, // Remove the items array from response
        items_count: items.length,
        completed_count: items.filter((item: { completed: boolean }) => item.completed).length,
      };
    }) || [];

    return NextResponse.json({ todoLists: listsWithCounts });
  } catch (error) {
    console.error('Error in GET /api/todos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateTodoListData = await request.json();
    
    if (!body.title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const baseSlug = generateSlug(body.title.trim());
    
    // Check if slug already exists for this user and generate unique one
    let slug = baseSlug;
    let counter = 1;
    
    while (true) {
      const { data: existingList } = await supabase
        .from('todo_lists')
        .select('id')
        .eq('user_id', user.id)
        .eq('slug', slug)
        .single();
      
      if (!existingList) break;
      
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    const { data: todoList, error } = await supabase
      .from('todo_lists')
      .insert({
        user_id: user.id,
        title: body.title.trim(),
        slug: slug,
        description: body.description?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating todo list:', error);
      return NextResponse.json({ error: 'Failed to create todo list' }, { status: 500 });
    }

    return NextResponse.json({ todoList }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/todos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
