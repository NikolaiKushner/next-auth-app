# Next.js Authentication App

A modern, full-stack web application built with Next.js 15, featuring user authentication, protected routes, user profile management, and a clean dashboard interface. This project demonstrates best practices for building secure web applications with Supabase authentication and modern React patterns.

## 🚀 Features

- **🔐 User Authentication**: Complete sign-in and sign-up functionality
- **🔑 Password Reset**: Secure email-based password recovery system
- **🛡️ Protected Routes**: Secure dashboard with authentication middleware
- **👤 User Profile System**: Complete profile management with avatar upload
- **🖼️ Avatar Upload**: Drag-and-drop image upload with preview
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🎨 Modern UI**: Clean, accessible interface with shadcn/ui components
- **🧭 Navigation System**: Consistent navigation between dashboard and profile
- **⚡ Fast Performance**: Built with Next.js 15 and Turbopack
- **🔒 Secure**: Server-side authentication with Supabase
- **🌙 Dark Mode Ready**: Built-in theme support
- **📝 TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [tailwindcss-animate](https://github.com/jaredh159/tailwindcss-animate)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Authentication**: [Supabase](https://supabase.com/) Auth
- **Icons**: [Lucide React](https://lucide.dev/)
- **Development**: [Turbopack](https://turbo.build/pack) for faster builds

## 📁 Project Structure

```
next-auth-app/
├── docs/                          # 📚 Documentation
│   ├── README.md                  # Documentation index
│   ├── PASSWORD_RESET_SETUP.md    # Password reset setup guide
│   ├── PASSWORD_RESET.md          # Password reset feature documentation
│   ├── PROFILE_SYSTEM.md          # User Profile System guide
│   └── STORAGE_FIX.md             # Storage troubleshooting guide
├── app/
│   ├── components/                # Reusable UI components
│   │   ├── Button.tsx            # Custom button component with variants
│   │   ├── Input.tsx             # Form input component with validation
│   │   └── Navigation.tsx        # Navigation component with active states
│   ├── dashboard/                # Protected dashboard page
│   │   └── page.tsx              # Enhanced dashboard with profile card
│   ├── profile/                  # Profile management
│   │   ├── page.tsx              # Profile settings page
│   │   ├── ProfileForm.tsx       # Profile information form
│   │   └── AvatarUpload.tsx      # Avatar upload with drag-and-drop
│   ├── sign-in/                  # Authentication pages
│   │   └── page.tsx              # Sign in form
│   ├── sign-up/                  # User registration
│   │   └── page.tsx              # Sign up form
│   ├── forgot-password/          # Password reset request
│   │   └── page.tsx              # Forgot password form
│   ├── reset-password/           # Password reset completion
│   │   ├── page.tsx              # Reset password page
│   │   └── ResetPasswordForm.tsx # Reset form component
│   ├── api/auth/                 # Authentication API routes
│   │   ├── forgot-password/route.ts    # Send reset email
│   │   ├── reset-password/route.ts     # Process password reset
│   │   ├── callback/route.ts           # Auth callbacks
│   │   └── password-reset-callback/route.ts # Password reset callbacks
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/
│   ├── supabase/                 # Supabase client configuration
│   │   ├── client.ts             # Client-side Supabase
│   │   ├── server.ts             # Server-side Supabase
│   │   └── middleware.ts         # Auth middleware
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
├── supabase/                     # Database migrations
│   └── migrations/               # SQL migration files
│       ├── 001_create_profiles_table.sql    # Profiles table and storage setup
│       └── 002_fix_storage_policies.sql     # Storage policy fixes
├── middleware.ts                 # Next.js middleware
└── public/                       # Static assets
```

## 📚 Documentation

For detailed documentation, visit the [`docs/`](./docs/) folder:

- **[📖 Documentation Index](./docs/README.md)** - Overview of all documentation
- **[🔑 Password Reset Setup](./docs/PASSWORD_RESET_SETUP.md)** - Quick setup guide for password reset
- **[📋 Password Reset Feature](./docs/PASSWORD_RESET.md)** - Detailed password reset documentation
- **[👤 Profile System](./docs/PROFILE_SYSTEM.md)** - Complete guide to the User Profile System
- **[🔧 Storage Fix](./docs/STORAGE_FIX.md)** - Guide to fixing storage upload issues

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NikolaiKushner/next-auth-app.git
   cd next-auth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000  # For development
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up the database**
   
   Run the Supabase migrations to create the necessary tables and policies:
   - Follow the [Profile System guide](./docs/PROFILE_SYSTEM.md) for database setup
   - Check the [Storage Fix guide](./docs/STORAGE_FIX.md) if you encounter upload issues

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and keys
3. Add the keys to your `.env.local` file
4. Enable Email authentication in Authentication → Settings
5. Run the SQL migrations in the SQL Editor:
   - `001_create_profiles_table.sql` - Creates profiles table and storage bucket
   - `002_fix_storage_policies.sql` - Fixes storage upload permissions

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL for email links | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Yes |

## 📱 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Features in Detail

### Authentication System
- **Sign Up**: New user registration with email validation
- **Sign In**: Secure login with password authentication
- **Password Reset**: Email-based password recovery with secure tokens
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Session Management**: Persistent authentication state
- **Sign Out**: Secure logout functionality

### User Profile System
- **Profile Management**: Complete profile information editing
- **Avatar Upload**: Drag-and-drop image upload with preview
- **Profile Display**: Enhanced dashboard with profile card
- **Data Validation**: Form validation and error handling
- **Responsive Design**: Works on all device sizes

### Dashboard
- **User Information**: Display user details and session info
- **Profile Card**: Quick access to profile information
- **Navigation**: Easy switching between dashboard and profile
- **Protected Access**: Only accessible to authenticated users
- **Responsive Design**: Works on all device sizes

### UI Components
- **Custom Button**: Reusable button component with variants
- **Form Input**: Accessible input component with error handling
- **Navigation**: Consistent navigation with active states
- **Avatar Upload**: Drag-and-drop file upload component
- **Modern Design**: Clean, professional interface

## 🗄️ Database Schema

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Bucket
- **Bucket Name**: `avatars`
- **Public Access**: Enabled
- **File Structure**: `avatars/{user-id}-{timestamp}.{extension}`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
- **Netlify**: Connect your GitHub repository
- **Railway**: Deploy with Railway CLI
- **DigitalOcean App Platform**: One-click deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for authentication and storage
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact [NikolaiKushner](https://github.com/NikolaiKushner).

---

**Built with ❤️ by [NikolaiKushner](https://github.com/NikolaiKushner)**
