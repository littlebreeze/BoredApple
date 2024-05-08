export interface Room {
  roomName: string;
  isSecret: boolean;
  roomPassword?: number;
  maxNum: number;
  quizCount: number;
}
