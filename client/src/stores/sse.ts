import { EventSourcePolyfill } from 'event-source-polyfill';
import { create } from 'zustand';

interface SSE {
  eventSource: EventSource | null;
  setEventSource: (eventSource: EventSource) => void;
  clearEventSource: () => void;
  accessToken: string | undefined;
  setAccessToken: (accessToken: string) => void;
}

export const useSSEStore = create<SSE>((set) => ({
  eventSource: new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_API_SERVER}/study-service/notifications`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjpbIlJPTEVfVVNFUiJdLCJhdWQiOiJodHRwczovL2sxMGE1MDgucC5zc2FmeS5pby8iLCJzdWIiOiIxMDc5NDgwNTgzMzU3MDg2NjUyNjAiLCJpc3MiOiJodHRwczovL2sxMGE1MDgucC5zc2FmeS5pby8iLCJpYXQiOjE3MTUxNDEwNzgsImV4cCI6MTcxNjk0MTA3OH0.jiZ8RXL-5PlCfT-mhpR1WyF4o6twJs3mQQwkXr2ZyUT8Hp6rtuPfjw7e32WvFVPHd7N5-FhVjjzGQkaTIOKhuA`,
      Connection: 'keep-alive',
    },
    withCredentials: true,
    heartbeatTimeout: 86400000,
  }),
  // eventSource: null,
  setEventSource: (eventSource: EventSource) => {
    // // 객체 만들어서 연결만!
    // const newEventSource = new EventSourcePolyfill(
    //   `${process.env.NEXT_PUBLIC_API_SERVER}/study-service/notifications`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       Connection: 'keep-alive',
    //     },
    //     withCredentials: true,
    //     heartbeatTimeout: 86400000,
    //   }
    // );

    set({ eventSource });
  },
  clearEventSource: () => set({ eventSource: null }),
  accessToken: undefined,
  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  },
}));
