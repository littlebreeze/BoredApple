import { create } from 'zustand';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface recordState {
  // Value 형식의 today를 Date로 변경
  parseValueIntoDate: (date: Value) => Date;
  today: Value;
  onChange: (date: Value) => void;
  registerDate: string;
  setRegisterDate: (date: string) => void;
  solvedCnt: number[];
  setSolvedCnt: (counts: number[]) => void;
  // records: QuizType[] | null;
  // setRecords: (record: QuizType[] | null) => void;
  yearMonth: Date | null;
  onChangeYearMonth: (date: Date | null) => void;
}

export const useRecordStore = create<recordState>((set) => ({
  parseValueIntoDate: (date: Value) => {
    return new Date(Number(date?.valueOf().toString()));
  },
  today: new Date(),
  onChange: (date: Value) =>
    set({
      today: date,
    }),
  registerDate: '2024-01-01',
  setRegisterDate: (date: string) => set({ registerDate: date }),
  solvedCnt: [], //[3, 2, 1, 0, 0, 1, 0, 0, 1, 0, 2, 0, 3, 0, 3, 1, 3, 2, 1, 2, 3, 3, 3, 3, 2, 0, 0, 1, 1, 1, 0],
  setSolvedCnt: (counts: number[]) => set({ solvedCnt: counts }),
  // records: [
  //   { title: '정독 훈련', content: '비문학 지문을 읽고 문제를 풀어요.', correct: false },
  //   { title: '문장 넣기', content: '빈칸에 알맞은 문장을 넣어요.', correct: true },
  //   { title: '지문 요약', content: '비문학 지문을 읽고 요약해요.', correct: false },
  // ],
  // setRecords: (record: QuizType[] | null) => set({ records: record }),
  yearMonth: new Date(),
  onChangeYearMonth: (date: Date | null) =>
    set({
      yearMonth: date,
    }),
}));
