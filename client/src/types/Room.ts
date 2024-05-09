export interface IRoom {
  roomName: string;
  isSecret: boolean;
  roomPassword?: string;
  maxNum: number;
  quizCount: number;
}
