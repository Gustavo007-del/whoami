'use client';

import { useState } from 'react';

export default function DisclaimerDialog({ onAccept }: { onAccept: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);

  const accept = () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    onAccept();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
      <section className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {step === 1 ? (
          <>
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-xl">✦</div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[.18em] text-indigo-600">Before we begin</p>
            <h2 id="privacy-title" className="text-2xl font-bold tracking-tight text-slate-900">A private space to reflect</h2>
            <p className="mt-3 leading-7 text-slate-600">This short quiz is for self-reflection, not a diagnosis. Answer Sincerely for precise results.</p>
            <ul className="my-6 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <li className="flex gap-3"><span className="text-indigo-600">✓</span>Use any name you feel comfortable sharing.</li>
              <li className="flex gap-3"><span className="text-indigo-600">✓</span>Your session is anonymous and nothing is stored or shared.</li>
              <li className="flex gap-3"><span className="text-indigo-600">✓</span>There are no right or wrong answers.</li>
            </ul>
          </>
        ) : (
          <>
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-xl">ℹ</div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[.18em] text-indigo-600">One more thing..</p>
            <h2 id="privacy-title" className="text-2xl font-bold tracking-tight text-slate-900">Some questions are Direct and Dont see it as Disturbing, Have positive attitude and Answer Sincierly to Find Interesting Results</h2>
            <p className="mt-3 leading-7 text-slate-600">Dont take the test if you are panning to give false answers and also you are fooling yourself, this test only shows your inner true self,</p>
            <div className="my-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">We donot store or ask for your personal details. dont give any personal details like name number on the site.</div>
          </>
        )}
        <button onClick={accept} className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
          {step === 1 ? 'Continue' : 'Continue to the quiz'}
        </button>
      </section>
    </div>
  );
}
