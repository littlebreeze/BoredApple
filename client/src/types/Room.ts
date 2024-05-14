export interface IRoom {
  roomName: string;
  isSecret: boolean;
  roomPassword?: string;
  maxNum: number;
  quizCount: number;
}

export interface IRoomInfo {
  myNickname: string;
  myUserId: number;
  roomId: number;
  maxNum: number;
  quizCount: number;
  creatorId: number;
  roomPlayerRes?: { userId: number; nickname: string }[];
}
