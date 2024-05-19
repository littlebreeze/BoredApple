export interface IRankings {
  myRanking: number;
  myNickname: string;
  myRating: number;
  rankingList: IRankingList[];
}

export interface IRankingList {
  ranking: number;
  nickname: string;
  rating: number;
}
