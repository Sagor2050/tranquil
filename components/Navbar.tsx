'use client';

import Link from 'next/link';
import { useAuth } from '../lib/authContext';

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-700">
              Tranquil
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </Link>
            {user ? (
              <>
                <span className="text-gray-700 text-sm">Welcome, {user.email}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
