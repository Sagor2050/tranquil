'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BreathingExercise from '@/components/BreathingExercise';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
}

export default function BreathingPage() {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Guided <span className="text-indigo-600">Breathing</span> Exercises
            </h1>
            <p className="text-gray-600 mt-2">Calm your mind and reduce stress with guided breathing techniques</p>
          </div>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-500 font-semibold underline"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Breathing Exercise Component */}
        <BreathingExercise />

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Breathing Exercises</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold text-gray-900 mb-2">Reduces Stress</h3>
              <p className="text-gray-600 text-sm">Lower cortisol levels and activate your parasympathetic nervous system</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-3">😴</div>
              <h3 className="font-semibold text-gray-900 mb-2">Better Sleep</h3>
              <p className="text-gray-600 text-sm">Prepare your body for restful sleep with calming breathing techniques</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Heart Health</h3>
              <p className="text-gray-600 text-sm">Improve heart rate variability and cardiovascular health</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Better Focus</h3>
              <p className="text-gray-600 text-sm">Increase oxygen flow and mental clarity throughout your day</p>
            </div>
          </div>
        </div>

        {/* Technique Guide */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Breathing Techniques Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📦 Box Breathing</h3>
              <p className="text-gray-600 mb-3">Equal counts for each phase: Inhale (4s) → Hold (4s) → Exhale (4s) → Hold (4s)</p>
              <p className="text-sm text-gray-500">Best for: Quick stress relief, focus and clarity</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🌬️ Deep Breathing</h3>
              <p className="text-gray-600 mb-3">Slow deep breaths: Inhale (4s) → Exhale (6s)</p>
              <p className="text-sm text-gray-500">Best for: Relaxation, anxiety relief</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎭 4-7-8 Breathing</h3>
              <p className="text-gray-600 mb-3">Calming technique: Inhale (4s) → Hold (7s) → Exhale (8s)</p>
              <p className="text-sm text-gray-500">Best for: Sleep preparation, deep relaxation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⚖️ Alternate Nostril</h3>
              <p className="text-gray-600 mb-3">Balancing technique: Inhale (4s) → Hold (4s) → Exhale (4s)</p>
              <p className="text-sm text-gray-500">Best for: Balance, energy, emotional stability</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
