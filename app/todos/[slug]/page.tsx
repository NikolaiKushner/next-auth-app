'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TodoListWithItems, TodoItem, UpdateTodoItemData } from '@/lib/types';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Navigation from '@/app/components/Navigation';
import ConfirmModal from '@/app/components/ConfirmModal';
import { 
  ArrowLeft, 
  Plus, 
  Check, 
  X, 
  Edit3, 
  Trash2, 
  Circle,
  CheckCircle
} from 'lucide-react';



export default function TodoListPage() {
  const params = useParams();
  const router = useRouter();
  const [todoList, setTodoList] = useState<TodoListWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingList, setEditingList] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [savingItem, setSavingItem] = useState<string | null>(null);
  const [deletingItem, setDeletingItem] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: TodoItem | null;
  }>({ isOpen: false, item: null });

  // Form states
  const [listTitle, setListTitle] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editItem, setEditItem] = useState<UpdateTodoItemData>({});

  useEffect(() => {
    if (params.slug) {
      fetchTodoList(params.slug as string);
    }
  }, [params.slug]);

  const fetchTodoList = async (slug: string) => {
    try {
      const response = await fetch(`/api/todos/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch todo list');
      }

      setTodoList(data.todoList);
      setListTitle(data.todoList.title);
      setListDescription(data.todoList.description || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateList = async () => {
    if (!todoList || !listTitle.trim()) return;

    try {
      const response = await fetch(`/api/todos/${todoList.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: listTitle.trim(),
          description: listDescription.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update todo list');
      }

      const data = await response.json();
      setTodoList(prev => prev ? { ...prev, ...data.todoList } : null);
      setEditingList(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleAddItem = async () => {
    if (!todoList || !newTaskTitle.trim()) return;

    setSavingItem('new');
    try {
      const response = await fetch(`/api/todos/${todoList.slug}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTaskTitle.trim(),
          priority: 0,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create todo item');
      }

      const data = await response.json();
      setTodoList(prev => prev ? {
        ...prev,
        todo_items: [...(prev.todo_items || []), data.todoItem]
      } : null);
      
      setNewTaskTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSavingItem(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleUpdateItem = async (itemId: string) => {
    if (!todoList || !editItem.title?.trim()) return;

    setSavingItem(itemId);
    try {
      const response = await fetch(`/api/todos/${todoList.slug}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editItem),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update todo item');
      }

      const data = await response.json();
      setTodoList(prev => prev ? {
        ...prev,
        todo_items: prev.todo_items?.map(item => 
          item.id === itemId ? data.todoItem : item
        )
      } : null);
      
      setEditingItem(null);
      setEditItem({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSavingItem(null);
    }
  };

  const handleToggleComplete = async (item: TodoItem) => {
    setSavingItem(item.id);
    try {
      const response = await fetch(`/api/todos/${todoList?.slug}/items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !item.completed }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update todo item');
      }

      const data = await response.json();
      setTodoList(prev => prev ? {
        ...prev,
        todo_items: prev.todo_items?.map(i => 
          i.id === item.id ? data.todoItem : i
        )
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSavingItem(null);
    }
  };

  const handleDeleteClick = (item: TodoItem) => {
    setDeleteModal({ isOpen: true, item });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item || !todoList) return;

    const itemId = deleteModal.item.id;
    setDeletingItem(itemId);

    try {
      const response = await fetch(`/api/todos/${todoList.slug}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete todo item');
      }

      setTodoList(prev => prev ? {
        ...prev,
        todo_items: prev.todo_items?.filter(item => item.id !== itemId)
      } : null);
      
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeletingItem(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

  const startEditingItem = (item: TodoItem) => {
    setEditingItem(item.id);
    setEditItem({
      title: item.title,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navigation />
          <div className="mt-8 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!todoList) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navigation />
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">TODO list not found</h1>
            <Button onClick={() => router.push('/todos')}>
              Back to Lists
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const completedCount = todoList.todo_items?.filter(item => item.completed).length || 0;
  const totalCount = todoList.todo_items?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Navigation />
        
        <div className="mt-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/todos')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lists</span>
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* List Header */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            {editingList ? (
              <div className="space-y-4">
                <Input
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                  placeholder="List title"
                />
                <textarea
                  value={listDescription}
                  onChange={(e) => setListDescription(e.target.value)}
                  placeholder="Description"
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
                <div className="flex space-x-2">
                  <Button onClick={handleUpdateList} size="sm">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingList(false);
                      setListTitle(todoList.title);
                      setListDescription(todoList.description || '');
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{todoList.title}</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingList(true)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                {todoList.description && (
                  <p className="text-muted-foreground mb-4">{todoList.description}</p>
                )}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Created {formatDate(todoList.created_at)}</span>
                  <span>{completedCount} of {totalCount} completed</span>
                </div>
                {totalCount > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedCount / totalCount) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add Item */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Add a new task... (Press Enter to add)"
                  disabled={savingItem === 'new'}
                  className="border-none shadow-none focus:ring-0 text-base"
                />
              </div>
              <Button
                onClick={handleAddItem}
                disabled={!newTaskTitle.trim() || savingItem === 'new'}
                size="sm"
                variant="ghost"
                className="p-2 h-8 w-8"
              >
                {savingItem === 'new' ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {(todoList.todo_items?.length || 0) === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No tasks in this list yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground w-16">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                        Task
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground w-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList.todo_items?.map((item) => (
                      <tr
                        key={item.id}
                        className={`border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors ${
                          editingItem === item.id ? 'bg-muted/50' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleComplete(item)}
                            disabled={savingItem === item.id}
                            className="p-0 h-auto hover:bg-transparent"
                          >
                            {savingItem === item.id ? (
                              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            ) : item.completed ? (
                              <CheckCircle className="w-5 h-5 text-primary" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                            )}
                          </Button>
                        </td>
                        <td 
                          className="py-3 px-4 cursor-pointer"
                          onClick={() => editingItem !== item.id && startEditingItem(item)}
                        >
                          {editingItem === item.id ? (
                            <Input
                              value={editItem.title || ''}
                              onChange={(e) => setEditItem(prev => ({ ...prev, title: e.target.value }))}
                              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                  handleUpdateItem(item.id);
                                } else if (e.key === 'Escape') {
                                  setEditingItem(null);
                                  setEditItem({});
                                }
                              }}
                              onBlur={() => {
                                if (editItem.title?.trim() && editItem.title !== item.title) {
                                  handleUpdateItem(item.id);
                                } else {
                                  setEditingItem(null);
                                  setEditItem({});
                                }
                              }}
                              placeholder="Task title"
                              className="border-none shadow-none focus:ring-0 text-base p-0 h-auto bg-transparent"
                              autoFocus
                            />
                          ) : (
                            <span 
                              className={`text-base ${
                                item.completed 
                                  ? 'line-through text-muted-foreground' 
                                  : 'text-foreground'
                              } hover:text-primary transition-colors`}
                            >
                              {item.title}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            {editingItem !== item.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => startEditingItem(item)}
                                className="p-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(item)}
                              disabled={deletingItem === item.id}
                              className="p-1 h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              {deletingItem === item.id ? (
                                <div className="w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Task"
          message={`Are you sure you want to delete "${deleteModal.item?.title}"? This action cannot be undone.`}
          confirmText="Delete Task"
          cancelText="Cancel"
          confirmVariant="destructive"
          loading={deletingItem === deleteModal.item?.id}
        />
      </div>
    </div>
  );
}
