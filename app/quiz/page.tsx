'use client';

import { use, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { personalityTypes, questions, type Question } from '../../data/questions';

interface SearchParams {
  session: string;
}

interface BasicInfo {
  nickname?: string;
  gender?: string;
  hasBoyfriend?: boolean;
}

type Answer = string | number;
type Answers = Record<number, Answer>;

function getActiveQuestions(answers: Answers, gender?: string) {
  return questions.filter(
    (question) =>
      (!question.gender || question.gender === gender) &&
      (!question.dependsOn ||
        question.dependsOn.answers.includes(String(answers[question.dependsOn.questionId]))),
  );
}

export default function QuizPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { session } = use(searchParams);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingAnswer, setIsSavingAnswer] = useState(false);
  const [error, setError] = useState('');
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const [ageRestricted, setAgeRestricted] = useState(false);
  const activeQuestions = getActiveQuestions(answers, basicInfo?.gender);
  const question = activeQuestions[currentQuestion];

  useEffect(() => {
    const stored = localStorage.getItem('basicInfo');
    if (!stored) return;

    try {
      setBasicInfo(JSON.parse(stored));
    } catch {
      localStorage.removeItem('basicInfo');
      localStorage.removeItem('quizSessionId');
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    if (!question) return;
    let cancelled = false;

    fetch(`/api/quiz-background?question=${question.id - 1}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { imageUrl?: string } | null) => {
        if (!cancelled && data?.imageUrl) setBackgroundImage(data.imageUrl);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [question]);

  const saveAnswer = async (selectedQuestion: Question, answer: Answer) => {
    const { error: saveError } = await supabase.from('responses').insert({
      session_id: session,
      nickname: basicInfo?.nickname,
      gender: basicInfo?.gender,
      has_boyfriend: basicInfo?.hasBoyfriend,
      question_number: selectedQuestion.id,
      question_text: selectedQuestion.text,
      answer_text: String(answer),
      answer_value: typeof answer === 'number' ? answer : null,
      created_at: new Date().toISOString(),
    });

    if (saveError) throw saveError;
  };

  const calculatePersonality = (submittedAnswers: Answers, gender?: string) => {
    const matchesSluttyPattern =
      ['Occasionally', 'Multiple times a day'].includes(String(submittedAnswers[2] ?? '')) &&
      String(submittedAnswers[5] ?? '') !== 'Not for me' &&
      String(submittedAnswers[8] ?? '') !== 'No, never.' &&
      String(submittedAnswers[10] ?? '') !== 'No, I prefer not to.' &&
      String(submittedAnswers[14] ?? '') !== 'No';

    // --- Dimension scoring maps ---
    const q2Map: Record<string, number> = { 'Multiple times a day': 4, 'A few times a week': 3, 'Occasionally': 2, 'Rarely or never': 1 };
    const q5Map: Record<string, number> = { 'Yes, definitely': 4, 'Maybe, with the right people': 3, 'Curious, but unsure': 2, 'Not for me': 1 };
    const q14Map: Record<string, number> = { 'Yes, I enjoy it a lot.': 4, 'Yes, occasionally.': 3, 'No': 1, 'I havent explored it': 2 };
    const q16Map: Record<string, number> = { 'Yes, I have a high sex drive.': 4, 'Yes, occasionally.': 3, 'No': 1 };
    const q17Map: Record<string, number> = { 'Id be completely comfortable with it.': 4, 'Id be open to discussing or exploring it.': 3, 'Im not sure': 2, 'No': 1 };
    const q11Map: Record<string, number> = { 'More than three': 4, 'Two or three': 3, 'One': 2, 'None': 1 };

    // sexDrive (0-10): Q2 masturbation, Q14 dirty sex, Q16 need regular sex
    const driveQ2 = q2Map[String(submittedAnswers[2] ?? '')] ?? 2;
    const driveQ14 = q14Map[String(submittedAnswers[14] ?? '')] ?? 2;
    const driveQ16 = q16Map[String(submittedAnswers[16] ?? '')] ?? 2;
    const sexDrive = Math.round((driveQ2 + driveQ14 + driveQ16) / 12 * 10);

    // adventurous (0-10): Q5 threesome, Q17 partner sharing
    const advQ5 = q5Map[String(submittedAnswers[5] ?? '')] ?? 2;
    const advQ17 = q17Map[String(submittedAnswers[17] ?? '')] ?? 2;
    const adventurous = Math.round((advQ5 + advQ17) / 8 * 10);

    // innocence (0-10): inverse of sexDrive indicators, Q4 privacy
    const innocenceQ2 = 5 - driveQ2;
    const q4Score = Number(submittedAnswers[4] ?? 3);
    const innocence = Math.round((innocenceQ2 + (6 - q4Score)) / 8 * 10);

    // dominance (0-10): Q4 openness, Q5 adventurous initiatiation, Q2 drive
    const dominance = Math.round((Number(submittedAnswers[4] ?? 3) + advQ5 + driveQ2) / 12 * 10);

    // romance (0-10): Q4 openness, Q11 crushes
    const romanceQ4 = Number(submittedAnswers[4] ?? 3);
    const romanceQ11 = q11Map[String(submittedAnswers[11] ?? '')] ?? 2;
    const romance = Math.round((romanceQ4 + romanceQ11) / 8 * 10);

    // --- Determine personality type ---
    let type: string;

    if (matchesSluttyPattern) {
      type = 'slutty';
    } else if (sexDrive >= 8 && adventurous >= 5) {
      type = 'the_sex_monster';
    } else if (gender === 'girl' && sexDrive >= 5 && innocence >= 3) {
      type = 'the_innocent_girl';
    } else if (gender === 'boy' && sexDrive >= 5 && innocence >= 3) {
      type = 'the_innocent_boy';
    } else if (adventurous >= 7) {
      type = 'the_explorer';
    } else if (dominance >= 7 && sexDrive >= 4) {
      type = 'the_dominant';
    } else if (innocence >= 6 && romance >= 4) {
      type = 'the_gentle_soul';
    } else if (romance >= 6 && sexDrive >= 2) {
      type = 'the_romantic';
    } else if (adventurous >= 4 && dominance >= 4) {
      type = 'the_wild_card';
    } else if (gender === 'girl' && dominance >= 4) {
      type = 'the_siren';
    } else if (innocence >= 5) {
      type = 'the_submissive';
    } else if (dominance >= 5 && sexDrive >= 4) {
      type = 'the_baddie';
    } else if (adventurous >= 4 && dominance >= 3) {
      type = 'the_bad_boy';
    } else if (sexDrive >= 4 && adventurous >= 3) {
      type = 'the_tease';
    } else {
      type = 'the_soft_rebel';
    }

    const sexScore = Math.min(100, Math.round(sexDrive * 6 + adventurous * 4 + (dominance >= 5 ? 15 : 5)));

    return {
      type,
      scores: { sexDrive, adventurous, innocence, dominance, romance },
      sexScore,
      description: personalityTypes[type as keyof typeof personalityTypes]?.description ?? '',
    };
  };

  const handleSubmit = async (submittedAnswers: Answers) => {
    setIsSubmitting(true);
    const result = calculatePersonality(submittedAnswers, basicInfo?.gender);
    const { error: saveError } = await supabase.from('results').insert({
      session_id: session,
      nickname: basicInfo?.nickname,
      gender: basicInfo?.gender,
      has_boyfriend: basicInfo?.hasBoyfriend,
      personality_type: result.type,
      personality_description: result.description,
      scores: result.scores,
      created_at: new Date().toISOString(),
    });

    if (saveError) console.error('Error saving result:', saveError);
    router.push(`/result?session=${session}&type=${result.type}&score=${result.sexScore}`);
  };

  const advanceWithAnswer = async (answer: Answer) => {
    if (!question || isSavingAnswer || isSubmitting) return;

    if (question.category === 'age_gate' && answer !== "Yes, I'm 18+") {
      setAgeRestricted(true);
      return;
    }

    const updatedAnswers = { ...answers, [question.id]: answer };
    setAnswers(updatedAnswers);
    setError('');
    setIsSavingAnswer(true);

    try {
      await saveAnswer(question, answer);
    } catch (saveError) {
      console.error('Error saving answer:', saveError);
      setError('We could not save that answer. Please check your connection and try again.');
      setIsSavingAnswer(false);
      return;
    }

    const nextQuestions = getActiveQuestions(updatedAnswers, basicInfo?.gender);
    const nextQuestionIndex = nextQuestions.findIndex((item) => item.id === question.id) + 1;
    setIsSavingAnswer(false);

    if (nextQuestionIndex < nextQuestions.length) {
      setCurrentQuestion(nextQuestionIndex);
    } else {
      await handleSubmit(updatedAnswers);
    }
  };

  const handleTextChange = (answer: string) => {
    if (!question) return;
    setAnswers((currentAnswers) => ({ ...currentAnswers, [question.id]: answer }));
    setError('');
  };

  if (!basicInfo) {
    return <div className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">Preparing your game…</div>;
  }

  if (ageRestricted) {
    return (
      <main className="quiz-shell grid min-h-[100dvh] place-items-center p-5">
        <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 text-center shadow-2xl backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[.16em] text-indigo-600">Adults only</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">This game is for players 18+.</h1>
          <button onClick={() => router.replace('/')} className="mt-7 w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white">Go back</button>
        </div>
      </main>
    );
  }

  if (!question) return null;

  return (
    <main
      className="quiz-shell min-h-[100dvh] px-4 py-5 sm:px-6 sm:py-12"
      style={backgroundImage ? ({ '--quiz-background-image': `url("${backgroundImage}")` } as CSSProperties) : undefined}
    >
      <div className="quiz-content mx-auto flex min-h-[calc(100dvh-2.5rem)] w-full max-w-2xl items-center sm:min-h-[calc(100dvh-6rem)]">
        <div className="w-full rounded-3xl border border-white/70 bg-white/94 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-9">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[.16em] text-indigo-600">18+ • consent-first • just for fun</p>
          <h1 className="mb-7 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{question.text}</h1>

          {question.type === 'scale' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button key={option} onClick={() => void advanceWithAnswer(index + 1)} disabled={isSavingAnswer || isSubmitting} className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-4 text-left font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-slate-50 disabled:opacity-50">
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <button key={option} onClick={() => void advanceWithAnswer(option)} disabled={isSavingAnswer || isSubmitting} className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-4 text-left font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-slate-50 disabled:opacity-50">
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <>
              <textarea value={(answers[question.id] as string) || ''} onChange={(event) => handleTextChange(event.target.value)} placeholder="Tell us your vibe…" rows={4} className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-slate-900 focus:border-indigo-500" />
              <button onClick={() => void advanceWithAnswer(answers[question.id])} disabled={!answers[question.id] || isSavingAnswer || isSubmitting} className="mt-6 w-full rounded-xl bg-indigo-600 py-4 text-lg font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">
                {isSavingAnswer || isSubmitting ? 'Saving…' : 'Next'}
              </button>
            </>
          )}

          {error && <p role="alert" className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
        </div>
      </div>
    </main>
  );
}
