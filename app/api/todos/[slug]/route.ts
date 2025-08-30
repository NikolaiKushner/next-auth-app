import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateTodoListData } from '@/lib/types';

export async function GET(
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

    // Get todo list with items
    const { data: todoList, error } = await supabase
      .from('todo_lists')
      .select(`
        *,
        todo_items (*)
      `)
      .eq('slug', resolvedParams.slug)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Todo list not found' }, { status: 404 });
      }
      console.error('Error fetching todo list:', error);
      return NextResponse.json({ error: 'Failed to fetch todo list' }, { status: 500 });
    }

    // Sort items by created_at
    if (todoList.todo_items) {
      todoList.todo_items.sort((a: { created_at: string }, b: { created_at: string }) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    return NextResponse.json({ todoList });
  } catch (error) {
    console.error('Error in GET /api/todos/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
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

    const body: UpdateTodoListData = await request.json();
    
    // Validate at least one field is provided
    if (!body.title && !body.description) {
      return NextResponse.json({ error: 'At least one field is required' }, { status: 400 });
    }

    // Build update object
    const updateData: Partial<UpdateTodoListData> = {};
    if (body.title !== undefined) {
      if (!body.title.trim()) {
        return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 });
      }
      updateData.title = body.title.trim();
    }
    if (body.description !== undefined) {
      updateData.description = body.description?.trim() || null;
    }

    const { data: todoList, error } = await supabase
      .from('todo_lists')
      .update(updateData)
      .eq('slug', resolvedParams.slug)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Todo list not found' }, { status: 404 });
      }
      console.error('Error updating todo list:', error);
      return NextResponse.json({ error: 'Failed to update todo list' }, { status: 500 });
    }

    return NextResponse.json({ todoList });
  } catch (error) {
    console.error('Error in PUT /api/todos/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
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

    const { error } = await supabase
      .from('todo_lists')
      .delete()
      .eq('slug', resolvedParams.slug)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting todo list:', error);
      return NextResponse.json({ error: 'Failed to delete todo list' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Todo list deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/todos/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
