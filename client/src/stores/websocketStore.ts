import { create } from 'zustand';
import { Client, IMessage } from '@stomp/stompjs';

interface WebSocketState {
  stompClient: Client | null;
  messages: ChatMessageResponse[];
  timer: number;
  // 타이머 관련(임시)
  startTimer: (duration: number) => void;
  intervalId: number | null;

  isGaming: boolean; // 게임이 진행중인가?
  isGameRoundInProgress: boolean; // 라운드가 진행중인가?
  roundCount: number; // 전체 몇라운드인지?
  currentRound: number; // 현재 몇라운드인지?

  // 웹소켓 연결, 끊기
  connect: (roomId: string) => void;
  disconnect: () => void;

  startGame: (roodId: string) => void; // 게임 시작(START)
  sendMessage: (destination: string, body: any) => void; // 메세지 발행
  setIsGameRoundInProgress: () => void; // 라운드 on/off 조정
  setCurrentRound: (round: number) => void; // 라운드 수 조정
  clearMessage: () => void; // 페이지 나가면서 메세지 초기화
}

interface ChatMessageResponse {
  type: string;
  writer: string;
  content: string;
  target: string;
}

export const useWebsocketStore = create<WebSocketState>((set, get) => ({
  stompClient: null,
  messages: [],
  timer: 0,
  intervalId: null,
  isGaming: false,
  isGameRoundInProgress: false,
  roundCount: 5,
  currentRound: 1,

  connect: (roomId: string) => {
    const client = new Client({
      brokerURL: 'wss://k10a508.p.ssafy.io:8081/game-service/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        // 채팅 구독
        client.subscribe(`/topic/chat/rooms/${roomId}`, (message: IMessage) => {
          console.log(message);
          const msg: ChatMessageResponse = JSON.parse(message.body);
          console.log('메세지: ', msg);
          if (msg.type === 'ENTER')
            
          set((prev) => ({ messages: [...prev.messages, msg] }));
        });
        // 시간 구독
        client.subscribe(`topic/time/rooms/${roomId}`, (message: IMessage) => {
          console.log(message);
          set({ timer: parseInt(message.body) });
        });
      },
    });
    client.activate();
    set({ stompClient: client });
  },
  disconnect: () => {
    const client = get().stompClient;
    if (client) {
      client.deactivate();
      set({ stompClient: null });
    }
  },

  sendMessage: (destination: string, body: object) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: destination,
        body: JSON.stringify(body),
      });
    }
  },

  startGame: (roomId: string) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/app/rooms/${roomId}/startGame`,
        body: JSON.stringify({ type: 'START', message: 'START' }),
      });
    }
    if (get().currentRound == 1) set({ isGaming: true });
    set({ isGameRoundInProgress: true });
  },

  startTimer: (duration: number) => {
    const existingIntervalId = get().intervalId;

    if (existingIntervalId !== null) {
      clearInterval(existingIntervalId);
    }

    const intervalId = window.setInterval(() => {
      const { timer } = get();
      if (timer <= 0) {
        clearInterval(intervalId);
        set({ isGameRoundInProgress: false });
      } else {
        set((state) => ({ timer: state.timer - 1 }));
      }
    }, 1000);

    set({ timer: duration, intervalId });
  },

  setIsGameRoundInProgress: () => {
    get().isGameRoundInProgress ? set({ isGameRoundInProgress: true }) : set({ isGameRoundInProgress: false });
  },

  setCurrentRound: (round: number) => {
    set({ roundCount: round });
  },
  clearMessage:()=>{set({messages:[]})},
}));
