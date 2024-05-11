'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useWebsocketStore } from '@/stores/websocketStore';
import { Client, IMessage } from '@stomp/stompjs';
import axios from 'axios';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function ChatWrapper({ roomId }: { roomId: string }) {
  const { myNickname, myUserId } = useGameRoomStore();
  // const [stompClient, setStompClient] = useState<Client | null>(null);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  // const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const { connect, disconnect, messages, stompClient, sendMessage } = useWebsocketStore();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    sendMessage(`/pub/ws/rooms/${roomId}/send`, {
      type: 'ENTER',
      roomId: roomId,
      sender: myNickname!,
      senderId: myUserId!,
      message: newMessage,
    });
  }, []);

  useEffect(() => {
    // 메시지 비우기
    return () => disconnect();
  }, [roomId, connect, disconnect]);

  return (
    <div className='h-full px-3 pt-3 pb-1 bg-ourLightGray/50 rounded-xl flex flex-col justify-between'>
      <div className='h-44 flex flex-col overflow-y-scroll'>
        {messages.map((m, idx) => (
          <div key={idx} className='p-1 flex gap-3'>
            <div className={`text-center w-2/12 border-r-2 ${m.writer === '심심한 사과' && 'font-bold text-ourTheme'}`}>
              {m.writer}
            </div>
            <div
              className={`pl-2 w-10/12 ${
                m.writer === '심심한 사과' && m.target === String(myUserId) && 'text-ourTheme font-bold '
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <div className='p-2 flex gap-3 border-t-2 bg-ourDarkGray/10 rounded-md'>
        <label className='text-center w-2/12'>{myNickname}</label>
        <input
          className='px-2 w-10/12 appearance-none rounded leading-tight focus:outline-none'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setNewMessage('');
              sendMessage(`/pub/ws/rooms/${roomId}/send`, {
                type: 'TALK',
                roomId: roomId,
                sender: myNickname!,
                senderId: myUserId!,
                message: newMessage,
              });
            }
          }}
        />
      </div>
    </div>
  );
}
