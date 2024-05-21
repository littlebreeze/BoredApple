import { create } from 'zustand';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { useGameRoomStore } from './game-room-info';
import { useGameScoreStore } from './game-score';

type ResultResponseItem = {
  ranking: number;
  userNickname: string;
  rating: number;
  diff: number;
};

interface ChatMessageRequest {
  type: string;
  roomId: number;
  sender: string;
  senderId: number;
  message: string;
}

interface ChatMessageResponse {
  type: string;
  writer: string;
  content: string;
  target: number;
}

// base64 디코딩 함수
function decodeUnicode(str: string) {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

interface WebSocketState {
  stompClient: Client | null;
  messages: ChatMessageResponse[];
  timer: number;

  isGaming: boolean; // 게임이 진행중인가?
  isGameRoundInProgress: boolean; // 라운드가 진행중인가?
  roundCount: number; // 전체 몇라운드인지?
  currentRound: number; // 현재 몇라운드인지?
  isCorrectAnswer: boolean;

  quiz: string; // 문제
  answer: string; // 정답

  gameResult: ResultResponseItem[];

  // 구독 목록
  chatSubscription: StompSubscription | null;
  timerSubscription: StompSubscription | null;
  resultSubscription: StompSubscription | null;

  // 웹소켓 연결, 끊기
  connect: (roomId: string) => void;
  disconnect: (body: ChatMessageRequest) => void;

  startGame: (roodId: string) => void; // 게임 시작(START)
  startRound: (roomId: string) => void; // 라운드시작(ROUND)
  sendMessage: (body: ChatMessageRequest) => void; // 메세지 발행
  setIsGameRoundInProgress: () => void; // 라운드 on/off 조정
  clearMessage: () => void; // 페이지 나가면서 메세지 초기화
  setRoundCount: (round: number) => void; // 라운드 수 조정
  endGame: (roomId: string) => void;

  clearWebsocketStore: () => void;
}

export const useWebsocketStore = create<WebSocketState>((set, get) => ({
  stompClient: null,
  messages: [],
  timer: 44,
  isGaming: false,
  isGameRoundInProgress: false,
  roundCount: 5,
  currentRound: 1,
  isCorrectAnswer: false,
  quiz: '',
  answer: '',
  gameResult: [],

  chatSubscription: null,
  timerSubscription: null,
  resultSubscription: null,

  connect: (roomId: string) => {
    // console.log('웹소켓연결');
    const client = new Client({
      brokerURL: 'wss://k10a508.p.ssafy.io:8081/game-service/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        // 채팅 구독
        const chatSubscription = client.subscribe(`/topic/chat/rooms/${roomId}`, (message: IMessage) => {
          const res: ChatMessageResponse = JSON.parse(message.body);
          switch (res.type) {
            case 'CORRECT':
              set({ isCorrectAnswer: true });
            case 'TALK':
            case 'ENTER':
            case 'EXIT':
              set((prev) => ({ messages: [...prev.messages, res] }));
              break;
            case 'QUIZ':
              set({ quiz: res.content });
              break;
            case 'ANSWER':
              set({ answer: decodeUnicode(res.content) });
              break;
            case 'START':
              set({ isGaming: true, isGameRoundInProgress: true, currentRound: 1 });
              useGameRoomStore.getState().setResultModalIsShow(false);
              break;
            case 'MANAGER':
              useGameRoomStore.getState().setCreatorId(res.target);
              break;
            case 'END':
              set({ isGaming: false });
              // 게임 끝...일때 결과 요청
              useGameRoomStore.getState().setResultModalIsShow(true);
              break;
          }
        });
        // 시간 구독
        const timerSubscription = client.subscribe(`/topic/time/rooms/${roomId}`, (message: IMessage) => {
          set({ timer: parseInt(message.body) });
          if (parseInt(message.body) === 43)
            set({
              isGameRoundInProgress: true,
              currentRound: get().currentRound + 1,
              isCorrectAnswer: false,
              answer: '',
            });
        });

        // 결과 구독
        const resultSubscription = client.subscribe(`/topic/result/rooms/${roomId}`, (message: IMessage) => {
          const messageBody = JSON.parse(message.body);

          set({ gameResult: messageBody.resultResList });
        });

        set({ stompClient: client, chatSubscription, timerSubscription, resultSubscription });
      },
    });
    client.activate();
  },
  disconnect: (body: ChatMessageRequest) => {
    const client = get().stompClient;
    if (client) {
      get().sendMessage(body);
      // 구독 해제
      get().chatSubscription?.unsubscribe();
      get().timerSubscription?.unsubscribe();
      get().resultSubscription?.unsubscribe();
      client.deactivate();
      // 연결 끊기
      client.onDisconnect = () => {
        // 방 상태 초기화
        useGameRoomStore.getState().clearGameRoomInfo();
        // 웹소켓 스토어 초기화
        get().clearWebsocketStore();
      };
    }
  },

  sendMessage: (body: ChatMessageRequest) => {
    const client = get().stompClient;
    if (client?.active && client?.connected) {
      client?.publish({
        destination: `/pub/ws/rooms/${body.roomId}/send`,
        body: JSON.stringify(body),
      });
    }
  },

  startGame: (roomId: string) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/pub/ws/quiz/rooms/${roomId}/send`,
        body: JSON.stringify({ message: 'START' }),
      });
      client.publish({
        destination: `/pub/ws/quiz/rooms/${roomId}/send`,
        body: JSON.stringify({ message: 'ROUND' }),
      });
    }
  },

  startRound: (roomId: string) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/pub/ws/quiz/rooms/${roomId}/send`,
        body: JSON.stringify({ message: 'ROUND' }),
      });
    }
  },

  setIsGameRoundInProgress: () => {
    get().isGameRoundInProgress ? set({ isGameRoundInProgress: true }) : set({ isGameRoundInProgress: false });
  },

  setRoundCount: (round: number) => {
    set({ roundCount: round });
  },

  clearMessage: () => {
    set({ messages: [] });
  },

  endGame: (roomId: string) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/pub/ws/quiz/rooms/${roomId}/send`,
        body: JSON.stringify({ message: 'END' }),
      });
    }
  },

  clearWebsocketStore: () => {
    set({
      stompClient: null,
      messages: [],
      timer: 44,
      isGaming: false,
      isGameRoundInProgress: false,
      roundCount: 5,
      currentRound: 1,
      isCorrectAnswer: false,
      quiz: '',
      answer: '',
      chatSubscription: null,
      timerSubscription: null,
      resultSubscription: null,
    });
  },
}));
