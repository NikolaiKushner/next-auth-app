# Documentation

This folder contains all the documentation for the Next.js authentication app.

## 📚 Documentation Index

### 🎯 Core Features

- **[Profile System](./PROFILE_SYSTEM.md)** - Complete guide to the User Profile System
  - Profile page functionality
  - Avatar upload system with drag-and-drop
  - Profile information management
  - Database schema and setup
  - Enhanced dashboard with profile card

### 🔧 Technical Guides

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
│   ├── PROFILE_SYSTEM.md          # User Profile System guide
│   └── STORAGE_FIX.md             # Storage troubleshooting guide
├── app/                           # Next.js app directory
│   ├── components/                # Reusable UI components
│   │   ├── Button.tsx            # Custom button component with variants
│   │   ├── Input.tsx             # Form input component with validation
│   │   └── Navigation.tsx        # Navigation component with active states
│   ├── dashboard/                 # Dashboard pages
│   │   └── page.tsx              # Enhanced dashboard with profile card
│   ├── profile/                   # Profile management
│   │   ├── page.tsx              # Profile settings page
│   │   ├── ProfileForm.tsx       # Profile information form
│   │   └── AvatarUpload.tsx      # Avatar upload with drag-and-drop
│   ├── sign-in/                   # Authentication pages
│   │   └── page.tsx              # Sign in form
│   ├── sign-up/                   # User registration
│   │   └── page.tsx              # Sign up form
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
│       └── 002_fix_storage_policies.sql     # Storage policy fixes
└── README.md                      # Main project README
```

## 🚀 Quick Start

1. **Setup Database** - Run the Supabase migrations
2. **Configure Environment** - Set up your `.env.local` file
3. **Start Development** - Run `npm run dev`

## 📖 Reading Order

For new developers or users:

1. **Start with** [Profile System](./PROFILE_SYSTEM.md) for feature overview
2. **Reference** [Storage Fix](./STORAGE_FIX.md) if you encounter upload issues
3. **Check** the main [README.md](../README.md) for project setup

## 🎯 Key Features Implemented

### ✅ User Profile System
- **Profile Management**: Complete profile information editing
- **Avatar Upload**: Drag-and-drop image upload with preview
- **Profile Display**: Enhanced dashboard with profile card
- **Data Validation**: Form validation and error handling
- **Responsive Design**: Works on all device sizes

### ✅ Enhanced Dashboard
- **Profile Card**: Quick access to profile information
- **Navigation**: Easy switching between dashboard and profile
- **User Information**: Display user details and session info
- **Protected Access**: Only accessible to authenticated users

### ✅ UI Components
- **Custom Button**: Reusable button component with variants
- **Form Input**: Accessible input component with error handling
- **Navigation**: Consistent navigation with active states
- **Avatar Upload**: Drag-and-drop file upload component

### ✅ Database & Storage
- **Profiles Table**: User profile data storage
- **Storage Bucket**: Avatar image storage
- **RLS Policies**: Secure data access
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
