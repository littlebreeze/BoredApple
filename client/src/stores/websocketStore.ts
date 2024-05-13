import { create } from 'zustand';
import { Client, IMessage } from '@stomp/stompjs';

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
}

export const useWebsocketStore = create<WebSocketState>((set, get) => ({
  stompClient: null,
  messages: [],
  timer: 33,
  isGaming: false,
  isGameRoundInProgress: false,
  roundCount: 5,
  currentRound: 1,
  isCorrectAnswer: false,
  quiz: '',
  answer: '',

  connect: (roomId: string) => {
    const client = new Client({
      brokerURL: 'wss://k10a508.p.ssafy.io:8081/game-service/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        // 채팅 구독
        client.subscribe(`/topic/chat/rooms/${roomId}`, (message: IMessage) => {
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
              set({ answer: res.content });
              break;
            case 'START':
              set({ isGaming: true, isGameRoundInProgress: true, currentRound: 1 });
              break;
            case 'END':
              set({ isGaming: false });
          }
          console.log('메세지: ', res);
        });
        // 시간 구독
        client.subscribe(`/topic/time/rooms/${roomId}`, (message: IMessage) => {
          set({ timer: parseInt(message.body) });
          if (parseInt(message.body) === 33)
            set({ isGameRoundInProgress: true, currentRound: get().currentRound + 1, isCorrectAnswer: false });
        });
      },
    });
    client.activate();
    set({ stompClient: client });
  },
  disconnect: (body: ChatMessageRequest) => {
    const client = get().stompClient;
    if (client) {
      get().sendMessage(body);
      client.deactivate();
      // 연결해제할때도비우고
      set({ stompClient: null, messages: [] });
    }
  },

  sendMessage: (body: ChatMessageRequest) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
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
}));
