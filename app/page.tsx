import Link from "next/link";
import { Shield, Users, Lock, Zap, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">AuthApp</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="/sign-in"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure Authentication
            <span className="text-blue-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            A modern, full-stack authentication system built with Next.js 15 and Supabase. 
            Experience secure user management with profile system, password recovery, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/sign-in"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Authentication</h3>
            <p className="text-gray-600 leading-relaxed">
              Industry-standard security with email verification, password reset, and protected routes powered by Supabase.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">User Profiles</h3>
            <p className="text-gray-600 leading-relaxed">
              Complete profile management with avatar uploads, personal information, and customizable user dashboard.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Modern Stack</h3>
            <p className="text-gray-600 leading-relaxed">
              Built with Next.js 15, TypeScript, Tailwind CSS, and modern React patterns for optimal performance.
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email Authentication</h4>
                  <p className="text-gray-600">Secure sign-up and sign-in with email verification</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Password Recovery</h4>
                  <p className="text-gray-600">Secure password reset via email with token verification</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Protected Routes</h4>
                  <p className="text-gray-600">Automatic authentication middleware and route protection</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">User Dashboard</h4>
                  <p className="text-gray-600">Personalized dashboard with user information and navigation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Avatar Upload</h4>
                  <p className="text-gray-600">Drag-and-drop image upload with preview and storage</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Responsive Design</h4>
                  <p className="text-gray-600">Mobile-first design that works on all devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our secure authentication system.
            Set up your account in minutes.
          </p>
          <Link
            href="/sign-up"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg inline-flex items-center gap-2"
          >
            Create Account
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-900">AuthApp</span>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                GitHub
              </a>
              <a href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
                Documentation
              </a>
              <a href="/api" className="text-gray-600 hover:text-gray-900 transition-colors">
                API
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; 2024 AuthApp. Built with Next.js 15 and Supabase.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}