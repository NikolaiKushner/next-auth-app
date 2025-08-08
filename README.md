# Next.js Authentication App

A modern, full-stack web application built with Next.js 15, featuring user authentication, protected routes, and a clean dashboard interface. This project demonstrates best practices for building secure web applications with Supabase authentication and modern React patterns.

## 🚀 Features

- **🔐 User Authentication**: Complete sign-in and sign-up functionality
- **🛡️ Protected Routes**: Secure dashboard with authentication middleware
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🎨 Modern UI**: Clean, accessible interface with shadcn/ui components
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
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx      # Custom button component
│   │   └── Input.tsx       # Form input component
│   ├── dashboard/          # Protected dashboard page
│   │   └── page.tsx        # User dashboard
│   ├── sign-in/           # Authentication pages
│   │   └── page.tsx        # Sign in form
│   ├── sign-up/           # User registration
│   │   └── page.tsx        # Sign up form
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/
│   └── supabase/          # Supabase client configuration
│       ├── client.ts      # Client-side Supabase
│       ├── server.ts      # Server-side Supabase
│       └── middleware.ts  # Auth middleware
├── middleware.ts          # Next.js middleware
└── public/               # Static assets
```

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
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and keys
3. Add the keys to your `.env.local` file
4. Enable Email authentication in Authentication → Settings

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
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
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Session Management**: Persistent authentication state
- **Sign Out**: Secure logout functionality

### Dashboard
- **User Information**: Display user details and session info
- **Protected Access**: Only accessible to authenticated users
- **Responsive Design**: Works on all device sizes

### UI Components
- **Custom Button**: Reusable button component with variants
- **Form Input**: Accessible input component with error handling
- **Modern Design**: Clean, professional interface

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
- [Supabase](https://supabase.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact [NikolaiKushner](https://github.com/NikolaiKushner).

---

**Built with ❤️ by [NikolaiKushner](https://github.com/NikolaiKushner)**
