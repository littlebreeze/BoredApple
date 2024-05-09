export interface IRoom {
  roomName: string;
  isSecret: boolean;
  roomPassword?: number;
  maxNum: number;
  quizCount: number;
}
