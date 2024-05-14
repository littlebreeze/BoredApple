// 기본문제 인터페이스(어휘, 정독훈련, 문장순서배열)
export interface IBasicProblem {
  content: string;
  option1: string;
  option2: string;
  option3: string;
  userAnswer?: number;
  answer?: number;
  category?: string;
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
  userAnswer?: number;
  answer?: number;
  category?: string;
  type: '어휘';
  problemId: number;
  correct: boolean;
}
export type InsertProblemResponse = IInsertProblem[];

// 지문요약 문제 인터페이스
export interface ISummaryProblem {
  content: string;
  userAnswer?: string;
  answer?: string;
  type: '어휘';
  problemId: number;
  similarity?: number;
}
export type SummaryProblemResponse = ISummaryProblem[];
