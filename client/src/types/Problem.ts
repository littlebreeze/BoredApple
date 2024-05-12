// 기본문제 인터페이스(어휘, 정독훈련)
export interface IBasicProblem {
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
export type BasicProblemResponse = IBasicProblem[];

// 문장넣기 문제 인터페이스
export interface IInsertProblem {
  content1: string;
  content2: string;
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
export type InsertProblemResponse = IInsertProblem[];
