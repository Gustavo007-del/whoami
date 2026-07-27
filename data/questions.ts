export interface Question {
  id: number;
  text: string;
  type: 'scale' | 'choice' | 'text';
  options?: string[];
  category: string;
  gender?: 'boy' | 'girl';
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
    text: 'How often do you masturbate?',
    type: 'choice',
    options: ['Multiple times a day', 'A few times a week', 'Occasionally', 'Rarely or never'],
    category: 'vibe',
  },
  {
    id: 3,
    text: 'Which age group are you generally most attracted to?',
    type: 'scale',
    options: ['10-15', '15-18', '18-28', '30-60'],
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
    dependsOn: { questionId: 5, answers: ['Yes, definitely', 'Maybe, with the right people', "Curious, but unsure"] },
  },
  {
    id: 7,
    text: 'Have you ever been attracted to an very older adult',
    type: 'choice',
    options: ['Yes, frequently.', 'Yes, a few times.', 'No, never.', 'One time'],
    category: 'style',
  },
  {
    id: 8,
    text: 'Have you ever been attracted to an very younger adult',
    type: 'choice',
    options: ['Yes, frequently.', 'Yes, a few times.', 'No, never.', 'One time'],
    category: 'green_flag',
  },
  {
    id: 9,
    text: 'Have you ever been attracted to anyone in your family',
    type: 'choice',
    options: ['No, never', 'Yes','Yes, more than one'],
    category: 'boundaries',
  },
  {
    id: 10,
    text: 'Do you enjoy swallowing during oral sex?',
    type: 'choice',
    options: ['Yes, I enjoy it.', 'Sometimes, depending on the situation.', 'No, I prefer not to.', 'I havent tried it / Id rather not answer.'],
    category: 'date_vibe',
    gender: 'girl',

  },
  {
    id: 11,
    text: 'How many crushes have you had in the past three months?',
    type: 'choice',
    options: ['More than three', 'Two or three', 'One', 'None'],
    category: 'initiative',
  },
  {
    id: 12,
    text: 'What penis size do you personally prefer?',
    type: 'choice',
    options: ['Over 7 inches', '3 to 5 inches', '5 to 7 inches', 'Under 3 inches'],
    category: 'flirting',
    gender: 'girl',
  },
  {
    id: 13,
    text: 'Do you enjoy dirty sex?',
    type: 'choice',
    options: ['Yes, I enjoy it a lot.', 'Yes, occasionally.', 'No', 'I havent explored it'],
    category: 'flirting',
  },
  {
    id: 15,
    text: 'Do you feel the need to have sex regularly?',
    type: 'choice',
    options: ['Yes, I have a high sex drive.', 'Yes, occasionally.', 'No'],
    category: 'flirting',
  },
  {
    id: 15,
    text: 'How would you feel about your partner having sex with someone else? with your consent',
    type: 'choice',
    options: ['Id be completely comfortable with it.', 'Id be open to discussing or exploring it.', 'Im not sure', 'No'],
    category: 'flirting',
  },
  {
    id: 14,
    text: 'Who are your three most recent crushes? (Porn stars and tv stars are not allowed.)',
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
