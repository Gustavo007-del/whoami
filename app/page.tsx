'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DisclaimerDialog from '@/components/DisclaimerDialog';
import { generateSessionId } from '@/lib/utils';

export default function Home() {
  const router = useRouter();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [error, setError] = useState('');
  const [basicInfo, setBasicInfo] = useState({ nickname: '', gender: '', hasBoyfriend: null as boolean | null });
  const start = (event: React.FormEvent) => {
    event.preventDefault();
    if (!basicInfo.nickname.trim() || !basicInfo.gender || basicInfo.hasBoyfriend === null) { setError('Please complete each field before continuing.'); return; }
    const sessionId = generateSessionId();
    localStorage.setItem('quizSessionId', sessionId);
    localStorage.setItem('basicInfo', JSON.stringify({ ...basicInfo, nickname: basicInfo.nickname.trim() }));
    router.push(`/quiz?session=${sessionId}`);
  };
  const choice = (active: boolean, selected: string) => `rounded-xl border px-4 py-3 text-left font-medium transition ${active ? 'border-indigo-600 bg-indigo-50 text-indigo-800 ring-1 ring-indigo-600' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`;
  return <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#e0e7ff,_transparent_34%),linear-gradient(135deg,#f8fafc,#eff6ff)] px-4 py-7 sm:py-12">
    {showDisclaimer && <DisclaimerDialog onAccept={() => setShowDisclaimer(false)} />}
    <div className="mx-auto max-w-5xl">
      <header className="mb-10 flex items-center justify-between"><a className="text-lg font-bold tracking-tight text-slate-900">whoami<span className="text-indigo-600">.</span></a><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">Private reflection</span></header>
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <section><p className="mb-3 text-sm font-semibold uppercase tracking-[.18em] text-indigo-600">A few minutes for you</p><h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">Understand what makes you, you.</h1><p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">Answer 20 thoughtful questions and receive a gentle snapshot of your personality style.</p><div className="mt-7 flex gap-5 text-sm text-slate-600"><span>◷ About 6 minutes</span><span>◌ No account needed</span></div></section>
        <section className="rounded-3xl border border-white/80 bg-white/95 p-6 shadow-xl shadow-slate-200/60 sm:p-8"><div className="mb-6 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 font-bold text-white">1</span><div><h2 className="font-bold text-slate-900">Tell us the basics</h2><p className="text-sm text-slate-500">This helps personalize your experience.</p></div></div>
          <form onSubmit={start} className="space-y-6"><div><label htmlFor="nickname" className="mb-2 block text-sm font-semibold text-slate-700">What should we call you?</label><input id="nickname" value={basicInfo.nickname} onChange={e => setBasicInfo({ ...basicInfo, nickname: e.target.value })} placeholder="Your chosen name" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400" /></div>
          <fieldset><legend className="mb-2 text-sm font-semibold text-slate-700">How do you identify?</legend><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => setBasicInfo({ ...basicInfo, gender: 'boy' })} className={choice(basicInfo.gender === 'boy', 'boy')}>Boy</button><button type="button" onClick={() => setBasicInfo({ ...basicInfo, gender: 'girl' })} className={choice(basicInfo.gender === 'girl', 'girl')}>Girl</button></div></fieldset>
          <fieldset><legend className="mb-2 text-sm font-semibold text-slate-700">Did you like Sex</legend><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => setBasicInfo({ ...basicInfo, hasBoyfriend: true })} className={choice(basicInfo.hasBoyfriend === true, 'yes')}>Yes</button><button type="button" onClick={() => setBasicInfo({ ...basicInfo, hasBoyfriend: false })} className={choice(basicInfo.hasBoyfriend === false, 'no')}>No</button></div></fieldset>
          {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}<button className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">Begin reflection <span aria-hidden>→</span></button></form>
        </section>
      </div>
    </div>
  </main>;
}
