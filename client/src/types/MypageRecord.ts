// 출석 요청 데이터
export interface ARequest {
  year: number;
  month: number;
}

// 출석 응답 데이터 : AttendanceRecord
export interface AResponse {
  days: number;
  ratio: number;
  registerDate: string;
}

// 게임 응답 데이터 : GameRecord
export interface GResponse {
  numberOfWin: number;
  numberOfGame: number;
  rating: number;
  rank: number;
  odd: number;
}

// RecordList
export interface Study {
  problemType: string;
  correct: boolean;
}

// RecordList
export interface RResponse {
  dailyStudyList: Study[];
}

// StudyRecord
export interface SResponse {
  totalCnt: number;
  completePercent: number;
  type: string;
  category: string;
}

// 일자별 기록 요청 데이터
export interface RLRequest {
  year: number;
  month: number;
  day: number;
}

// 일자별 기록 응답 데이터
export interface RLResponse {
  dailyStudyList: {
    problemType: string;
    isCorrect: boolean;
  }[];
}

// 월별 학습 응답 데이터
export interface SRResponse {
  daysCompleteLearning: number;
  mostLearnedStudy: string;
  mostReadCategory: string;
}

export function toServer(type: string): string {
  switch (type) {
    case '정독훈련':
      return 'intensive';
    case '문장삽입':
      return 'sentence';
    case '주제맞추기':
      return 'topic';
    case '순서맞추기':
      return 'order';
    case '어휘':
      return 'voca';

    default:
      return 'chkplz';
  }
}

export function toClient(type: string): string {
  switch (type) {
    case '정독훈련':
      return 'read';
    case '문장삽입':
      return 'insert';
    case '주제맞추기':
      return 'summary';
    case '순서맞추기':
      return 'order';
    case '어휘':
      return 'word';

    default:
      return 'chkplz';
  }
}

export function toExplain(type: string): string {
  switch (type) {
    case '정독훈련':
      return '비문학 지문을 읽고 문제를 풀어요';
    case '문장삽입':
      return '빈칸에 알맞은 문장을 넣어요';
    case '주제맞추기':
      return '비문학 지문을 읽고 요약해요';
    case '순서맞추기':
      return '문장 순서를 올바르게 배열해요';
    case '어휘':
      return '어휘력을 높여요';

    default:
      return 'chkplz';
  }
}
