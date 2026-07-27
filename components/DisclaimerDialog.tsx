'use client';

import { useEffect, useState } from 'react';

export default function DisclaimerDialog({ onAccept }: { onAccept: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('disclaimerAccepted') === 'true') {
      setVisible(false);
      onAccept();
    }
  }, [onAccept]);

  if (!visible) return null;
  const accept = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setVisible(false);
    onAccept();
  };

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
    <section className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-xl">✦</div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-[.18em] text-indigo-600">Before we begin</p>
      <h2 id="privacy-title" className="text-2xl font-bold tracking-tight text-slate-900">A private space to reflect</h2>
      <p className="mt-3 leading-7 text-slate-600">This short quiz is for self-reflection, not a diagnosis. Answer in the way that feels true to you.</p>
      <ul className="my-6 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
        <li className="flex gap-3"><span className="text-indigo-600">✓</span>Use any name you feel comfortable sharing.</li>
        <li className="flex gap-3"><span className="text-indigo-600">✓</span>Your session is anonymous and designed for reflection.</li>
        <li className="flex gap-3"><span className="text-indigo-600">✓</span>There are no right or wrong answers.</li>
      </ul>
      <button onClick={accept} className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">Continue to the quiz</button>
    </section>
  </div>;
}
