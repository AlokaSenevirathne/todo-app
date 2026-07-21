import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Zap,
  Lock,
  CheckSquare,
  Sparkles,
  ChevronRight,
  Clock,
  Target,
  TrendingUp,
  Users,
  Award,
  BarChart3,
  Calendar,
  MessageSquare,
  Smartphone,
  Cloud,
  Share2,
  Bell
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 lg:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-sm">
            <CheckSquare className="w-4 h-4" />
          </div>
          <span className="text-base font-semibold text-slate-900 tracking-tight">
            TaskFlow
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Create Account</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 lg:px-8 pt-16 pb-20">
        
        {/* Top Tagline Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Simple, Fast & Secure</span>
            <span className="text-slate-300">|</span>
            <span className="text-indigo-600 font-semibold flex items-center gap-1">
              Organize Your Day <Sparkles className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
            Streamlined task management for everyday goals.
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            A beautiful, easy-to-use task manager to organize your daily schedule, track completed goals, and focus on what matters most.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Link
            href="/register"
            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>Sign In to Workspace</span>
          </Link>
        </div>

        {/* Trust Metrics */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-slate-900">
              50K+
            </div>
            <p className="text-sm text-slate-500 mt-1">Active Users</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-slate-900">
              4.9
            </div>
            <p className="text-sm text-slate-500 mt-1">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-slate-900">
              98%
            </div>
            <p className="text-sm text-slate-500 mt-1">Satisfaction Rate</p>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Designed for your daily workflow</h2>
            <p className="text-slate-500 text-sm mt-1">Everything you need to keep your personal and professional tasks in order.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 border border-indigo-100">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Private & Secure</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Your personal account is fully protected with password encryption so your tasks remain private to you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 border border-indigo-100">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Easy Filters & Search</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Instantly search for any task by keyword or filter between pending and completed goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 border border-indigo-100">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Lightning Fast</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Enjoy instant updates when adding, editing, or completing tasks without delay or clutter.
              </p>
            </div>

          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Get started in 3 simple steps</h2>
            <p className="text-slate-500 text-sm mt-1">Join thousands of users who have transformed their productivity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">1. Create Account</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Sign up for free and set up your personal workspace in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">2. Add Your Tasks</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Create tasks with titles, descriptions, and priorities to organize your day.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">3. Track Progress</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Mark tasks as complete and watch your productivity soar.
              </p>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-slate-50 p-8 rounded-2xl border border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Goal Tracking</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Set daily, weekly, and monthly goals. Track your progress with visual indicators and stay motivated.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-8 rounded-2xl border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Analytics Dashboard</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Gain insights into your productivity patterns with detailed analytics and completion reports.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-slate-50 p-8 rounded-2xl border border-amber-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Smart Reminders</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Never miss a deadline with intelligent reminders and notifications for upcoming tasks.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-slate-50 p-8 rounded-2xl border border-violet-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-violet-600 shadow-sm">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Collaboration Ready</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Share tasks and projects with team members. Perfect for both personal and professional use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial / Social Proof */}
        <div className="mt-20 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
          </div>
          <blockquote className="text-center">
            <p className="text-lg text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
              "TaskFlow has completely transformed how I manage my daily tasks. The clean interface and powerful features make productivity feel effortless."
            </p>
            <footer className="mt-4">
              <cite className="text-sm text-slate-600 not-italic">— Sarah Johnson, Product Manager</cite>
            </footer>
          </blockquote>
        </div>

        {/* Final CTA Section */}
        <div className="mt-20 text-center bg-slate-900 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold">Ready to boost your productivity?</h2>
          <p className="text-slate-300 mt-3 max-w-lg mx-auto">
            Join thousands of users who have already transformed their workflow with TaskFlow.
          </p>
          <Link
            href="/register"
            className="inline-block mt-6 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl"
          >
            Start Free Trial
          </Link>
          <p className="text-xs text-slate-400 mt-4">No credit card required • Free forever for personal use</p>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 lg:px-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <CheckSquare className="w-4 h-4 text-slate-900" />
            <span>TaskFlow Application</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-700 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-700 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-slate-700 transition-colors">Support</Link>
          </div>
          <p>© 2026 TaskFlow. All rights reserved. Built for seamless productivity.</p>
        </div>
      </footer>

    </div>
  );
}