export interface Profile {
  id: string;
  full_name?: string;
  bio?: string;
  website?: string;
  location?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileFormData {
  full_name: string;
  bio: string;
  website: string;
  location: string;
}

export interface UserProfile extends Profile {
  email?: string;
  last_sign_in_at?: string;
}

// Todo List types
export interface TodoList {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface TodoItem {
  id: string;
  list_id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 0 | 1 | 2; // 0: low, 1: medium, 2: high
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TodoListWithItems extends TodoList {
  todo_items?: TodoItem[];
  items?: TodoItem[];
  items_count?: number;
  completed_count?: number;
}

export interface CreateTodoListData {
  title: string;
  description?: string;
}

export interface UpdateTodoListData {
  title?: string;
  description?: string | null;
}

export interface CreateTodoItemData {
  title: string;
  description?: string;
  priority?: 0 | 1 | 2;
  due_date?: string;
}

export interface UpdateTodoItemData {
  title?: string;
  description?: string | null;
  completed?: boolean;
  priority?: 0 | 1 | 2;
  due_date?: string | null;
}
