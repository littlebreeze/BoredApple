import { create } from 'zustand';
import { Client, IMessage } from '@stomp/stompjs';

interface WebSocketState {
  stompClient: Client | null;
  messages: ChatMessageResponse[];
  timer: number;
  isTimerRunning: boolean;
  startTimer: (duration: number) => void;
  intervalId: number | null;
  connect: (roomId: string) => void;
  disconnect: () => void;
  startGame: (roodId: string) => void;
  sendMessage: (destination: string, body: any) => void;
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
  isTimerRunning: false,
  intervalId: null,

  startGame: (roomId: string) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/app/rooms/${roomId}/startGame`,
        body: JSON.stringify({ message: 'Start the game!' }),
      });
      client.publish({
        destination: `/app/rooms/${roomId}/startTimer`,
        body: JSON.stringify({ messages: 'Start timer!' }),
      });
    }
  },

  startTimer: (duration: number) => {
    const existingIntervalId = get().intervalId;

    if (existingIntervalId !== null) {
      clearInterval(existingIntervalId);
    }

    const intervalId = window.setInterval(() => {
      const { timer, isTimerRunning } = get();
      if (timer <= 0 || !isTimerRunning) {
        clearInterval(intervalId);
        set({ isTimerRunning: false });
      } else {
        set((state) => ({ timer: state.timer - 1 }));
      }
    }, 1000);

    set({ timer: duration, isTimerRunning: true, intervalId });
  },

  connect: (roomId: string) => {
    const client = new Client({
      brokerURL: `wss://k10a508.p.ssafy.io:8081/game-service/ws`,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/chat/rooms/${roomId}`, (message: IMessage) => {
          console.log(message);
          const msg: ChatMessageResponse = JSON.parse(message.body);
          set((prev) => ({ messages: [...prev.messages, msg] }));
        });
        client.subscribe(`/topic/rooms/${roomId}/timer`, (message: IMessage) => {
          console.log(message);
          if (message.body === "Time's up!") {
            set({ timer: 0 });
            console.log(message.body);
          }
        });
        client.subscribe(`/topic/rooms/${roomId}/start`, (message: IMessage) => {
          console.log(message);
          if (message.body === 'Game Start!') {
            const { startTimer } = get();
            startTimer(30);
            console.log(message.body);
          }
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

  sendMessage: (destination: string, body: any) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: destination,
        body: JSON.stringify(body),
      });
    }
  },
}));
