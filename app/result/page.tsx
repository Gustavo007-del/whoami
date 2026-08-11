'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { personalityTypes } from '../../data/questions';
import { supabase } from '../../lib/supabase';

interface SearchParams {
  session: string;
  type: string;
  score?: string;
}

export default function ResultPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { type, score } = use(searchParams);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('basicInfo');
    if (stored) {
      try {
        setBasicInfo(JSON.parse(stored));
      } catch {
        localStorage.removeItem('basicInfo');
        localStorage.removeItem('quizSessionId');
        router.replace('/');
      }
    }
    setLoading(false);
  }, [router]);

  const handleRetake = () => {
    localStorage.removeItem('quizSessionId');
    localStorage.removeItem('basicInfo');
    router.push('/');
  };

  if (loading || !type) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading your results...</div>
      </div>
    );
  }

  const result = personalityTypes[type as keyof typeof personalityTypes];
  const sexScore = Math.min(100, Math.max(0, Number(score) || 0));

  if (!result) {
    return <div>Result not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce">{result.icon}</div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[.16em] text-indigo-600">Your reflection</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
            You are: {result.name}
          </h1>
          <p className="text-lg text-slate-600">
            Hello, {basicInfo?.nickname || 'friend'}!
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 p-6 sm:p-9 mb-6">
          <div className="text-center">
            <div className="text-8xl mb-6">{result.icon}</div>
            <h2 className="text-3xl font-bold mb-5 text-slate-900">
              {result.name}
            </h2>
            <p className="text-lg text-slate-600 leading-8">
              {result.description}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-fuchsia-200 bg-fuchsia-50 p-6 text-center shadow-lg shadow-fuchsia-100/70 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[.16em] text-fuchsia-700">Just-for-fun sex score</p>
          <p className="mt-2 text-6xl font-black tracking-tight text-fuchsia-700">{sexScore}%</p>
          <p className="mt-3 text-sm leading-6 text-fuchsia-900">A playful reflection of your confidence, openness, and adventurous energy—not a real-world rating.</p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-6 mb-8 border-l-4 border-purple-600">
          <h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">
            🔒 Your Privacy Matters
          </h3>
          <p className="text-purple-700 dark:text-purple-400">
            Your responses have been stored anonymously. We don't know who you are, 
            and this session cannot be traced back to you. Your honesty helped you 
            discover something about yourself - that's what matters.
          </p>
        </div>

        {/* Actions */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={handleRetake}
            className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                     font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 
                     transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🔄 Retake Quiz
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-4 bg-gray-800 dark:bg-gray-700 text-white 
                     font-bold text-lg rounded-xl hover:bg-gray-900 dark:hover:bg-gray-600 
                     transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            📄 Save as PDF
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm">
          Remember: This is just for fun and self-reflection. You are complex and beautiful! 💜
        </p>
      </div>
    </div>
  );
}
