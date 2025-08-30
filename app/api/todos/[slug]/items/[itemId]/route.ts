import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateTodoItemData } from '@/lib/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; itemId: string }> }
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

    // Verify todo item belongs to user's list
    const { data: todoItem, error: itemError } = await supabase
      .from('todo_items')
      .select(`
        *,
        todo_lists!inner (user_id, slug)
      `)
      .eq('id', resolvedParams.itemId)
      .eq('todo_lists.slug', resolvedParams.slug)
      .eq('todo_lists.user_id', user.id)
      .single();

    if (itemError || !todoItem) {
      return NextResponse.json({ error: 'Todo item not found' }, { status: 404 });
    }

    const body: UpdateTodoItemData = await request.json();
    
    // Build update object
    const updateData: Partial<UpdateTodoItemData> = {};
    if (body.title !== undefined) {
      if (!body.title.trim()) {
        return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 });
      }
      updateData.title = body.title.trim();
    }
    if (body.description !== undefined) {
      updateData.description = body.description?.trim() || null;
    }
    if (body.completed !== undefined) {
      updateData.completed = body.completed;
    }
    if (body.priority !== undefined) {
      updateData.priority = body.priority;
    }
    if (body.due_date !== undefined) {
      updateData.due_date = body.due_date || null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'At least one field is required' }, { status: 400 });
    }

    const { data: updatedItem, error } = await supabase
      .from('todo_items')
      .update(updateData)
      .eq('id', resolvedParams.itemId)
      .select()
      .single();

    if (error) {
      console.error('Error updating todo item:', error);
      return NextResponse.json({ error: 'Failed to update todo item' }, { status: 500 });
    }

    return NextResponse.json({ todoItem: updatedItem });
  } catch (error) {
    console.error('Error in PUT /api/todos/[id]/items/[itemId]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; itemId: string }> }
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

    // First get the list ID from slug, then verify and delete the item
    const { data: todoList } = await supabase
      .from('todo_lists')
      .select('id')
      .eq('slug', resolvedParams.slug)
      .eq('user_id', user.id)
      .single();

    if (!todoList) {
      return NextResponse.json({ error: 'Todo list not found' }, { status: 404 });
    }

    // Verify todo item belongs to user's list and delete it
    const { error } = await supabase
      .from('todo_items')
      .delete()
      .eq('id', resolvedParams.itemId)
      .eq('list_id', todoList.id);

    if (error) {
      console.error('Error deleting todo item:', error);
      return NextResponse.json({ error: 'Failed to delete todo item' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Todo item deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/todos/[id]/items/[itemId]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
