# Documentation

This folder contains all the documentation for the Next.js authentication app.

## 📚 Documentation Index

### 🎯 Core Features

- **[Password Reset System](./PASSWORD_RESET_SETUP.md)** - Quick setup guide for password reset
  - Email-based password recovery
  - Secure token verification
  - Supabase configuration
  - Setup instructions
  
- **[Password Reset Feature](./PASSWORD_RESET.md)** - Detailed password reset documentation
  - Complete feature documentation
  - API routes and components
  - Security features and troubleshooting
  - Customization options

- **[Profile System](./PROFILE_SYSTEM.md)** - Complete guide to the User Profile System
  - Profile page functionality
  - Avatar upload system with drag-and-drop
  - Profile information management
  - Database schema and setup
  - Enhanced dashboard with profile card

- **[TODO Lists](./TODO_LISTS.md)** - Complete TODO Lists feature documentation
  - Task and list management
  - Database schema and API routes
  - UI components and functionality
  - Security and permissions

- **[TODO Setup](./TODO_SETUP.md)** - TODO Lists setup and configuration guide
  - Database migrations
  - Environment configuration
  - Initial setup steps

### 🔧 Technical Guides

- **[Architecture Overview](./ARCHITECTURE.md)** - Visual application architecture guide
  - Route organization and structure
  - Authentication flow diagrams
  - Component relationships
  - Database schema visualization

- **[Storage Fix](./STORAGE_FIX.md)** - Guide to fixing storage upload issues
  - RLS policy configuration
  - Avatar upload troubleshooting
  - Storage bucket setup
  - Common error solutions

## 🏗️ Project Structure

```
next-auth-app/
├── docs/                          # 📚 Documentation
│   ├── README.md                  # This file
│   ├── ARCHITECTURE.md            # Visual application architecture guide
│   ├── PASSWORD_RESET_SETUP.md    # Password reset setup guide
│   ├── PASSWORD_RESET.md          # Password reset feature documentation
│   ├── PROFILE_SYSTEM.md          # User Profile System guide
│   ├── TODO_LISTS.md              # TODO Lists feature documentation
│   ├── TODO_SETUP.md              # TODO setup guide
│   └── STORAGE_FIX.md             # Storage troubleshooting guide
├── app/                           # Next.js app directory
│   ├── (auth)/                    # 🔒 Protected route group with shared layout
│   │   ├── layout.tsx            # Auth layout with navigation header
│   │   ├── dashboard/            # User dashboard
│   │   │   └── page.tsx          # Enhanced dashboard with profile card
│   │   ├── profile/              # Profile management
│   │   │   ├── page.tsx          # Profile settings page
│   │   │   ├── ProfileForm.tsx   # Profile information form
│   │   │   └── AvatarUpload.tsx  # Avatar upload with drag-and-drop
│   │   └── todos/                # TODO Lists system
│   │       ├── page.tsx          # All TODO lists overview
│   │       ├── new/              # Create new TODO list
│   │       │   └── page.tsx      # New list creation form
│   │       └── [slug]/           # Individual TODO list
│   │           └── page.tsx      # List view and task management
│   ├── components/                # Reusable UI components
│   │   ├── Button.tsx            # Custom button component with variants
│   │   ├── Input.tsx             # Form input component with validation
│   │   ├── Navigation.tsx        # Navigation component with active states
│   │   └── ConfirmModal.tsx      # Confirmation dialog component
│   ├── sign-in/                   # 🌐 Public authentication pages
│   │   └── page.tsx              # Sign in form
│   ├── sign-up/                   # User registration
│   │   └── page.tsx              # Sign up form
│   ├── forgot-password/           # Password reset request
│   │   └── page.tsx              # Forgot password form
│   ├── reset-password/            # Password reset completion
│   │   ├── page.tsx              # Reset password page
│   │   └── ResetPasswordForm.tsx # Reset form component
│   ├── api/                       # API routes
│   │   ├── auth/                 # Authentication API routes
│   │   │   ├── forgot-password/route.ts     # Send reset email
│   │   │   ├── reset-password/route.ts      # Process password reset
│   │   │   ├── callback/route.ts            # Auth callbacks
│   │   │   └── password-reset-callback/route.ts # Password reset callbacks
│   │   └── todos/                # TODO Lists API
│   │       ├── route.ts          # List operations (GET, POST)
│   │       └── [slug]/           # Individual list operations
│   │           ├── route.ts      # List CRUD (GET, PUT, DELETE)
│   │           └── items/        # TODO items operations
│   │               ├── route.ts  # Item operations (POST)
│   │               └── [itemId]/ # Individual item operations
│   │                   └── route.ts # Item CRUD (PUT, DELETE)
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/                           # Utility libraries
│   ├── supabase/                  # Supabase client configuration
│   │   ├── client.ts             # Client-side Supabase
│   │   ├── server.ts             # Server-side Supabase
│   │   └── middleware.ts         # Auth middleware
│   ├── types.ts                   # TypeScript type definitions
│   └── utils.ts                   # Utility functions
├── supabase/                      # Database migrations
│   └── migrations/                # SQL migration files
│       ├── 001_create_profiles_table.sql    # Profiles table and storage setup
│       ├── 002_fix_storage_policies.sql     # Storage policy fixes
│       ├── 003_create_todo_tables.sql       # TODO tables creation
│       └── 004_add_slug_to_todo_lists.sql   # Add slug column to lists
└── README.md                      # Main project README
```

## 🚀 Quick Start

1. **Setup Database** - Run the Supabase migrations
2. **Configure Environment** - Set up your `.env.local` file
3. **Start Development** - Run `npm run dev`

## 📖 Reading Order

For new developers or users:

1. **Start with** the main [README.md](../README.md) for project overview and setup
2. **Understand** [Architecture Overview](./ARCHITECTURE.md) for visual application structure
3. **Setup** [TODO Lists](./TODO_SETUP.md) for database migrations and initial configuration
4. **Configure** [Password Reset Setup](./PASSWORD_RESET_SETUP.md) for password reset functionality
5. **Read** [Profile System](./PROFILE_SYSTEM.md) for user profile features
6. **Explore** [TODO Lists](./TODO_LISTS.md) for detailed feature documentation
7. **Reference** [Storage Fix](./STORAGE_FIX.md) if you encounter upload issues
8. **Deep dive** [Password Reset Feature](./PASSWORD_RESET.md) for implementation details

## 🎯 Key Features Implemented

### ✅ Architecture & Layout
- **Route Groups**: Organized structure with `(auth)` route group for protected pages
- **Shared Auth Layout**: Unified navigation header for all authenticated pages
- **Automatic Authentication**: Auth checks handled at layout level
- **Clean Separation**: Public vs protected pages clearly separated

### ✅ Password Reset System
- **Email-based Recovery**: Secure password reset via email links
- **Token Verification**: One-time use tokens with expiration
- **Multiple URL Format Support**: Works with query params and URL fragments
- **Robust Callback Handling**: Multiple callback routes for reliability
- **Debug Information**: Development debugging for troubleshooting

### ✅ User Profile System
- **Profile Management**: Complete profile information editing
- **Avatar Upload**: Drag-and-drop image upload with preview
- **Profile Display**: Enhanced dashboard with profile card
- **Data Validation**: Form validation and error handling
- **Responsive Design**: Works on all device sizes

### ✅ TODO Lists System
- **List Management**: Create, edit, and delete TODO lists
- **Task Management**: Add, edit, complete, and delete tasks
- **Progress Tracking**: Visual progress bars for each list
- **Inline Editing**: Edit tasks directly in the list view
- **Slug-based URLs**: SEO-friendly URLs for each list
- **Real-time Updates**: Optimistic UI updates with error handling

### ✅ Enhanced Dashboard
- **Profile Card**: Quick access to profile information
- **Unified Navigation**: Consistent header across all protected pages
- **User Information**: Display user details and session info
- **Protected Access**: Automatic authentication and redirection

### ✅ UI Components
- **Custom Button**: Reusable button component with variants
- **Form Input**: Accessible input component with error handling
- **Navigation**: Consistent navigation with active states
- **Confirm Modal**: User-friendly confirmation dialogs
- **Avatar Upload**: Drag-and-drop file upload component

### ✅ Database & Storage
- **Profiles Table**: User profile data storage
- **TODO Tables**: Lists and items with relationships
- **Storage Bucket**: Avatar image storage
- **RLS Policies**: Secure data access for all tables
- **Migrations**: Automated database setup

## 🔄 Contributing

When adding new documentation:

1. **Create** new `.md` files in this `docs/` folder
2. **Update** this `README.md` with links to new documentation
3. **Follow** the existing documentation structure and style
4. **Include** code examples and troubleshooting sections

## 📝 Documentation Standards

- **Use clear headings** with emojis for visual organization
- **Include code examples** with proper syntax highlighting
- **Add troubleshooting sections** for common issues
- **Keep documentation up-to-date** with code changes
- **Use relative links** for internal documentation references
- **Include screenshots** for UI features when helpful
- **Provide step-by-step instructions** for complex processes
