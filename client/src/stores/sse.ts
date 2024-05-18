import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { create } from 'zustand';

interface SSE {
  eventSource: EventSource | null;
  setEventSource: (accessToken: string) => void;
  clearEventSource: () => void;
}

export const useSSEStore = create<SSE>((set) => ({
  eventSource: null,
  setEventSource: (accessToken: string) => {
    // 객체 만들어서 연결만!
    const newEventSource = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_API_SERVER}/path-to-sse-endpoint`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true, // 이건 뺴야할 수도?
    });

    set({ eventSource: newEventSource });
  },
  clearEventSource: () => set({ eventSource: null }),
}));
