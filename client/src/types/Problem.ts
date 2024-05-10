export interface IWordProblem {
  content: string;
  option1: string;
  option2: string;
  option3: string;
  userAnswer: number | null;
  answer: number | null;
  category: string | null;
  type: '어휘';
  problemId: number;
  correct: boolean;
}

export type WordProblemResponse = IWordProblem[];
