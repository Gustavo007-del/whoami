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
    text: 'This is AI evaluated test we do not know your personal details or you, even though do you agree to use your response for AI ehancement, Press No to Opt out so no response is saved or shared?',
    type: 'choice',
    options: ["Yes", 'No'],
    category: 'consent',
  },
  {
    id: 21,
    text: 'Are you 18 or older?',
    type: 'choice',
    options: ["Yes, I'm 18+", 'No'],
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
    text: 'Have you ever been attracted to anyone in your closed circle',
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
    text: 'What penis color do you like?',
    type: 'choice',
    options: ['Black', 'Pink', 'White'],
    category: 'flirting',
  },
  {                               
    id: 14,
    text: 'Do you enjoy dirty sex?',
    type: 'choice',
    options: ['Yes, I enjoy it a lot.', 'Yes, occasionally.', 'No', 'I havent explored it'],
    category: 'flirting',
  },
  {                               
    id: 15,
    text: 'How many people have you Kissed with?',
    type: 'text',
    category: 'flirting',
  },
  {
    id: 16,
    text: 'Do you feel the need to have sex regularly?',
    type: 'choice',
    options: ['Yes, I have a high sex drive.', 'Yes, occasionally.', 'No'],
    category: 'flirting',
  },
  {
    id: 17,
    text: 'How would you feel about your partner having sex with someone else? with your consent',
    type: 'choice',
    options: ['Id be completely comfortable with it.', 'Id be open to discussing or exploring it.', 'Im not sure', 'No'],
    category: 'flirting',
  },
  {
    id: 18,
    text: 'How would you describe the taste of Cum',
    type: 'text',
    category: 'date_idea',
    
  },
  {
    id: 19,
    text: 'Share your most Dirty Thought',
    type: 'text',
    category: 'date_idea',
    gender: 'girl',
  },
  {
    id: 20,
    text: 'Do you like yourself to be engaged in forcefull sex',
    type: 'text',
    category: 'date_idea',
    gender: 'girl',
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
  the_sex_monster: {
    name: 'The Sex Monster',
    description: 'Your drive is powerful and unapologetic. You crave intensity, adventure, and pushing boundaries with mutual enthusiasm.',
    icon: '🦁',
  },
  slutty: {
    name: 'Slutty',
    description: ' You crave sex more, Crave New experiences, ready for anything but is very shy to express.',
    icon: '🌸',
  },
  the_innocent_girl: {
    name: 'The Innocent Girl',
    description: 'You carry a sweet exterior with a hidden depth of passion. Curious, warm, and quietly discovering your desires.',
    icon: '🎀',
  },
  the_innocent_boy: {
    name: 'The Innocent Boy',
    description: 'Gentle and approachable on the surface, with a surprising streak of longing beneath. You are discovering what lights you up.',
    icon: '🐺',
  },
  the_explorer: {
    name: 'The Explorer',
    description: 'You are curious about it all. New experiences, different dynamics, and uncharted chemistry excite you more than routine ever could.',
    icon: '🧭',
  },
  the_dominant: {
    name: 'The Dominant',
    description: 'You take the lead naturally and confidently. Your strength lies in knowing what you want and creating space for others to surrender safely.',
    icon: '👑',
  },
  the_gentle_soul: {
    name: 'The Gentle Soul',
    description: 'You value tenderness, trust, and emotional safety above all else. Your softness is not weakness — it is your superpower.',
    icon: '🕊️',
  },
  the_romantic: {
    name: 'The Romantic',
    description: 'You believe the best connections blend heart and heat. Love, longing, and intimacy are inseparable for you.',
    icon: '💕',
  },
  the_wild_card: {
    name: 'The Wild Card',
    description: 'Unpredictable, bold, and impossible to pin down. You keep people guessing and the energy electric.',
    icon: '🎲',
  },
  the_siren: {
    name: 'The Siren',
    description: 'Magnetic, intuitive, and effortlessly alluring. You draw people in with your presence and leave a lasting impression.',
    icon: '🧜‍♀️',
  },
  the_submissive: {
    name: 'The Submissive',
    description: 'You find freedom in surrender. Trust, devotion, and being guided by someone you trust brings you deep satisfaction.',
    icon: '🌸',
  },
};
