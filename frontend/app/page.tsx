import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">

        {/* Logo / Title */}
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          Todo App
        </h1>

        <p className="text-gray-600 mb-8">
          Organize your tasks, track your progress, and stay productive every day.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">

          <Link
            href="/login"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Create Account
          </Link>

        </div>

      </div>
    </main>
  );
}