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
}

// RecordList
export interface Study {
  problemType: string;
  isCorrect: boolean;
}

// RecordList
export interface RResponse {
  dailyStudyList: Study[];
}

// StudyRecord
export interface SResponse {
  daysCompleteLearning: number;
  mostLearnedStudy: string;
  mostReadCategory: string;
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
