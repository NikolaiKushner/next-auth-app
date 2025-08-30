# TODO Lists Feature

This document describes the TODO lists functionality added to the application.

## Feature Structure

### Database

Two tables created in Supabase:

1. **`todo_lists`** - stores TODO list information
   - `id` - unique identifier (UUID)
   - `user_id` - reference to user
   - `title` - list title
   - `description` - list description (optional)
   - `slug` - URL-friendly identifier
   - `created_at`, `updated_at` - timestamps

2. **`todo_items`** - stores tasks in lists
   - `id` - unique identifier (UUID)
   - `list_id` - reference to list
   - `title` - task title
   - `description` - task description (optional)
   - `completed` - completion status
   - `priority` - priority (0: low, 1: medium, 2: high)
   - `due_date` - due date (optional)
   - `created_at`, `updated_at` - timestamps

### API Endpoints

#### List operations:
- `GET /api/todos` - get all user lists
- `POST /api/todos` - create new list
- `GET /api/todos/[slug]` - get list with tasks
- `PUT /api/todos/[slug]` - update list
- `DELETE /api/todos/[slug]` - delete list

#### Task operations:
- `POST /api/todos/[slug]/items` - create task in list
- `PUT /api/todos/[slug]/items/[itemId]` - update task
- `DELETE /api/todos/[slug]/items/[itemId]` - delete task

### Pages (Located in `(auth)` route group)

All TODO pages are now protected and include unified navigation:

1. **`(auth)/todos/page.tsx`** - main page with all TODO lists
   - Displays list cards with completion progress
   - Create new list button
   - List deletion capability
   - Consistent navigation header

2. **`(auth)/todos/new/page.tsx`** - new TODO list creation page
   - Form with title and description fields
   - Data validation
   - Integrated with auth layout

3. **`(auth)/todos/[slug]/page.tsx`** - view and edit specific list page
   - View and edit list information
   - Add new tasks
   - Edit existing tasks
   - Mark tasks as completed
   - Delete tasks
   - Set priorities

### Functionality

#### Core features:
- ✅ Create, edit and delete TODO lists
- ✅ Add, edit and delete tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Set task priorities
- ✅ Progress bar for each list
- ✅ Count completed/total tasks
- ✅ Navigation between lists
- ✅ Slug-based URLs for better readability
- ✅ Inline editing with table display
- ✅ Custom confirmation modals

#### Security:
- Row Level Security (RLS) configured for all tables
- Users can only see their own lists and tasks
- All operations require authentication

#### UI/UX:
- Responsive design
- Intuitive interface
- Inline editing
- Visual status indicators (loading, errors)
- Custom deletion confirmation
- Clickable cards for navigation

## Usage

1. **Creating a list:**
   - Go to `/todos` page
   - Click "Create List"
   - Fill in title and description
   - Click "Create List"

2. **Adding tasks:**
   - Open the desired list
   - Type in the input field at the top
   - Press Enter or click the plus icon to add

3. **Managing tasks:**
   - Click the circle on the left to mark as completed
   - Click on task text to edit inline
   - Click the trash icon to delete

## Technical Details

### TypeScript Types
All necessary types defined in `lib/types.ts`:
- `TodoList` - list structure
- `TodoItem` - task structure
- `TodoListWithItems` - list with tasks
- `CreateTodoListData`, `UpdateTodoListData` - creation/update data
- `CreateTodoItemData`, `UpdateTodoItemData` - task data

### Components
Uses existing components within the `(auth)` layout structure:
- `Button` - for all buttons
- `Input` - for input fields
- `Navigation` - integrated into auth layout header with TODO tab
- `ConfirmModal` - custom confirmation dialogs
- Auth layout automatically handles navigation and authentication

### Icons
Uses icons from Lucide React:
- `CheckSquare` - for TODO lists
- `Plus` - addition
- `Edit3` - editing
- `Trash2` - deletion
- `Circle/Check` - task status
- `AlertTriangle` - warnings
- `Clock` - timestamps

## Requirements

1. Configured Supabase with applied migrations
2. User authentication
3. Environment variables for Supabase

## Future Improvements

Possible development directions:
- Task sorting and filtering
- Drag & drop for reordering
- Tags and categories
- Reminders and notifications
- Collaborative lists
- Import/export data
- Task search
- Archive completed lists
