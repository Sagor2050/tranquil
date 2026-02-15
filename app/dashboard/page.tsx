'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, <span className="text-indigo-600">{user?.name}</span>!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wellness Goals Card */}
          <div className="rounded-lg bg-white p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Wellness Goals</h3>
            <p className="text-gray-600 mb-4">Set and track your health goals</p>
            <Link
              href="/dashboard/goals"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              View Goals →
            </Link>
          </div>

          {/* Mood Tracking Card */}
          <div className="rounded-lg bg-white p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">😊 Mood Tracking</h3>
            <p className="text-gray-600 mb-4">Monitor your emotional well-being</p>
            <Link
              href="/dashboard/mood"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Track Mood →
            </Link>
          </div>

          {/* Sleep Records Card */}
          <div className="rounded-lg bg-white p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">😴 Sleep Tracking</h3>
            <p className="text-gray-600 mb-4">Record and improve your sleep habits</p>
            <Link
              href="/dashboard/sleep"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              View Sleep →
            </Link>
          </div>

          {/* Stress Management Card */}
          <div className="rounded-lg bg-white p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">😤 Stress Management</h3>
            <p className="text-gray-600 mb-4">Manage and reduce stress levels</p>
            <Link
              href="/dashboard/stress"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Manage Stress →
            </Link>
          </div>

          {/* Profile Card */}
          <div className="rounded-lg bg-white p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">👤 Profile</h3>
            <p className="text-gray-600 mb-4">View and edit your profile information</p>
            <Link
              href="/dashboard/profile"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Edit Profile →
            </Link>
          </div>

          {/* AI Chat Card */}
          <div className="rounded-lg bg-white p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🤖 AI Assistant</h3>
            <p className="text-gray-600 mb-4">Chat with our wellness AI assistant</p>
            <Link
              href="/dashboard/ai-chat"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Start Chat →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
