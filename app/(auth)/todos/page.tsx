'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TodoListWithItems } from '@/lib/types';
import Button from '@/app/components/Button';
import ConfirmModal from '@/app/components/ConfirmModal';
import { Plus, CheckSquare, Clock, Trash2 } from 'lucide-react';

export default function TodoListsPage() {
  const [todoLists, setTodoLists] = useState<TodoListWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    list: TodoListWithItems | null;
  }>({ isOpen: false, list: null });
  const router = useRouter();

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch todo lists');
      }

      setTodoLists(data.todoLists || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (list: TodoListWithItems) => {
    setDeleteModal({ isOpen: true, list });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.list) return;

    const { slug, id } = deleteModal.list;
    setDeletingId(id);

    try {
      const response = await fetch(`/api/todos/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete todo list');
      }

      setTodoLists(prev => prev.filter(list => list.id !== id));
      setDeleteModal({ isOpen: false, list: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, list: null });
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
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">TODO Lists</h1>
          <p className="text-muted-foreground mt-2">Organize your tasks and stay productive</p>
        </div>
        <Button
          onClick={() => router.push('/todos/new')}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create List</span>
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {todoLists.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            You do not have any TODO lists yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Create your first task list to start organizing your tasks
          </p>
          <Button
            onClick={() => router.push('/todos/new')}
            className="flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create First List</span>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {todoLists.map((list) => (
            <Link 
              key={list.id} 
              href={`/todos/${list.slug}`}
              className="block"
            >
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {list.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteClick(list);
                    }}
                    disabled={deletingId === list.id}
                    className="text-muted-foreground hover:text-destructive shrink-0 ml-2"
                  >
                    {deletingId === list.id ? (
                      <div className="w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                {list.description && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {list.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <CheckSquare className="w-4 h-4" />
                      <span>{list.completed_count || 0}/{list.items_count || 0} completed</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(list.created_at)}</span>
                  </div>
                </div>

                {(list.items_count || 0) > 0 && (
                  <div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((list.completed_count || 0) / (list.items_count || 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete TODO List"
        message={`Are you sure you want to delete "${deleteModal.list?.title}"? All tasks in this list will be permanently deleted. This action cannot be undone.`}
        confirmText="Delete List"
        cancelText="Cancel"
        confirmVariant="destructive"
        loading={deletingId === deleteModal.list?.id}
      />
    </div>
  );
}
