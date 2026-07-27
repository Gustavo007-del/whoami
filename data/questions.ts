export interface Question {
  id: number;
  text: string;
  type: 'scale' | 'choice' | 'text';
  options?: string[];
  category: string;
  dependsOn?: {
    questionId: number;
    answers: string[];
  };
}

export const questions: Question[] = [
  {
    id: 1,
    text: 'This game is for adults only. Are you 18 or older?',
    type: 'choice',
    options: ["Yes, I'm 18+", 'No, I am under 18'],
    category: 'age_gate',
  },
  {
    id: 2,
    text: 'Pick your after-dark energy.',
    type: 'choice',
    options: ['Confident and in charge', 'Playful and teasing', 'Quiet but intense', 'Sweet with a wild side'],
    category: 'vibe',
  },
  {
    id: 3,
    text: 'How often do you make time for solo pleasure?',
    type: 'scale',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'],
    category: 'confidence',
  },
  {
    id: 4,
    text: 'How open are you to talking about fantasies with a trusted, consenting partner?',
    type: 'scale',
    options: ['Not open to it', 'A little private', 'It depends', 'Quite open', 'Very open'],
    category: 'openness',
  },
  {
    id: 5,
    text: 'Would a consensual threesome ever interest you?',
    type: 'choice',
    options: ['Yes, definitely', 'Maybe, with the right people', 'Curious, but unsure', 'Not for me'],
    category: 'adventure',
  },
  {
    id: 6,
    text: 'If you explored that, what setup would you be most curious about?',
    type: 'choice',
    options: ['Me with two women', 'Me with two men', 'Any mix with mutual chemistry', 'I would need to talk it through first'],
    category: 'threesome_preference',
    dependsOn: { questionId: 5, answers: ['Yes, definitely', 'Maybe, with the right people'] },
  },
  {
    id: 7,
    text: 'What role feels closest to your natural style?',
    type: 'choice',
    options: ['I like leading', 'I like being pursued', 'I switch depending on the mood', 'I like equal give-and-take'],
    category: 'style',
  },
  {
    id: 8,
    text: 'Your boldest green flag is…',
    type: 'choice',
    options: ['Clear communication', 'Respecting boundaries', 'Making people feel wanted', 'Knowing exactly what I want'],
    category: 'green_flag',
  },
  {
    id: 9,
    text: 'How do you prefer to set boundaries?',
    type: 'choice',
    options: ['Directly, before anything starts', 'In the moment, with honest check-ins', 'Slowly, as trust builds', 'I am still learning how to say it'],
    category: 'boundaries',
  },
  {
    id: 10,
    text: 'What makes a date feel dangerously good?',
    type: 'choice',
    options: ['A sharp conversation', 'Unreal chemistry', 'A little mystery', 'Feeling completely safe to be myself'],
    category: 'date_vibe',
  },
  {
    id: 11,
    text: 'How do you feel about making the first move?',
    type: 'choice',
    options: ['I love it', 'I can if the vibe is right', 'I prefer clear signals first', 'I would rather be approached'],
    category: 'initiative',
  },
  {
    id: 12,
    text: 'When things get flirty, your strongest move is…',
    type: 'choice',
    options: ['Eye contact', 'Witty messages', 'Being unexpectedly honest', 'Keeping them guessing'],
    category: 'flirting',
  },
  {
    id: 13,
    text: 'Describe your ideal bold-but-respectful date night.',
    type: 'text',
    category: 'date_idea',
  },
];

export const personalityTypes = {
  the_baddie: {
    name: 'The Baddie',
    description: 'You own the room without needing to announce it. Your confidence, boundaries, and playful edge make your energy unforgettable.',
    icon: '🔥',
  },
  the_bad_boy: {
    name: 'The Bad Boy',
    description: 'You are bold, direct, and hard to ignore. Under the swagger, you know that respect and consent are what make confidence genuinely attractive.',
    icon: '⚡',
  },
  the_tease: {
    name: 'The Tease',
    description: 'You know anticipation is half the fun. You are charming, curious, and skilled at making a connection feel electric without rushing it.',
    icon: '✨',
  },
  the_soft_rebel: {
    name: 'The Soft Rebel',
    description: 'You are selective, self-aware, and quietly daring. You make your own rules while keeping trust, comfort, and real chemistry first.',
    icon: '🌙',
  },
};
