import Link from "next/link";
import { 
  ClipboardList, 
  ListChecks, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  BarChart3,
  Zap,
  Shield
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      
      {/* Top bar - Enhanced with glass effect */}
      <header className="px-6 sm:px-10 py-5 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Todo<span className="text-indigo-600">App</span>
            </span>
            <span className="hidden sm:inline ml-2 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              Beta
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section - Enhanced with gradient and animations */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/20 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-4xl relative z-10">
          {/* Main Content - Enhanced card design */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-200/50 p-12 text-center relative overflow-hidden">
            
            {/* Premium badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 rounded-full px-3 py-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700">Premium</span>
            </div>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-3xl mb-8 shadow-lg shadow-indigo-600/10">
              <ListChecks className="w-10 h-10 text-indigo-600" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Stay on top of your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                tasks &amp; goals
              </span>
            </h1>

            <p className="text-slate-500 mt-4 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
              Organize your work, track progress, and get things done — 
              <span className="text-indigo-600 font-medium"> one task at a time.</span>
            </p>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 max-w-md mx-auto">
              <Link
                href="/register"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                className="flex-1 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:border-indigo-300 hover:shadow-md flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">U{i}</span>
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-600">1.2k+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-600">4.9/5</span>
              </div>
            </div>

          </div>

          {/* Enhanced Feature Strip - 4 column grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: ClipboardList, label: "Create Tasks", desc: "Add & organize" },
              { icon: Search, label: "Smart Search", desc: "Find anything" },
              { icon: CheckCircle2, label: "Track Progress", desc: "Monitor status" },
              { icon: Zap, label: "Quick Actions", desc: "Boost efficiency" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-5 text-center hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:scale-105 cursor-default group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{feature.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional Features Section */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Team Collaboration", desc: "Work together seamlessly" },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Track your productivity" },
              { icon: Shield, title: "Secure & Private", desc: "Your data is protected" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-5 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="px-6 py-8 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-slate-900">TodoApp</span>
            </div>
           
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">© 2026 TodoApp. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs text-slate-400">All systems online</span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}