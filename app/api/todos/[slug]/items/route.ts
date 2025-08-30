import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateTodoItemData } from '@/lib/types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const supabase = await createClient();
    
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify todo list belongs to user
    const { data: todoList, error: listError } = await supabase
      .from('todo_lists')
      .select('id')
      .eq('slug', resolvedParams.slug)
      .eq('user_id', user.id)
      .single();

    if (listError || !todoList) {
      return NextResponse.json({ error: 'Todo list not found' }, { status: 404 });
    }

    const body: CreateTodoItemData = await request.json();
    
    if (!body.title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { data: todoItem, error } = await supabase
      .from('todo_items')
      .insert({
        list_id: todoList.id,
        title: body.title.trim(),
        description: body.description?.trim() || null,
        priority: body.priority || 0,
        due_date: body.due_date || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating todo item:', error);
      return NextResponse.json({ error: 'Failed to create todo item' }, { status: 500 });
    }

    return NextResponse.json({ todoItem }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/todos/[id]/items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
