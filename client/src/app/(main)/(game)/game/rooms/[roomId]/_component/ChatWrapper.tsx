'use client';

import { Client, IMessage } from '@stomp/stompjs';
import axios from 'axios';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface ChatMessageRequest {
  type: string;
  roomId: string;
  sender: string;
  message: string;
}
interface ChatMessageResponse {
  type: string;
  writer: string;
  content: string;
  target: string;
}
// id: number;
// content: string;
// writer: string;

type Chat = {
  nickname: string;
  content: string;
};

export default function ChatWrapper({ roomId }: { roomId: string }) {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const client = new Client({
      // env 파일에 추가할 것 : ws://localhost:8085
      brokerURL: `wss://k10a508.p.ssafy.io:8085/ws`, // 서버 WebSocket URL
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/chat/rooms/${roomId}`, (message: IMessage) => {
          const msg: ChatMessageResponse = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
      },
    });
    client.activate();
    setStompClient(client);
    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (stompClient && newMessage) {
      const chatMessage: ChatMessageRequest = {
        type: 'TYPE',
        roomId: roomId,
        sender: '보냅니다',
        message: newMessage,
      };
      stompClient.publish({
        destination: `/pub/chat/rooms/${roomId}/send`,
        body: JSON.stringify(chatMessage),
      });
      console.log(messages);
      setNewMessage('');
    }
  };

  return (
    <div className='h-full px-3 pt-3 pb-1 bg-ourLightGray/50 rounded-xl flex flex-col justify-between'>
      <div className='h-44 flex flex-col overflow-y-scroll'>
        {messages.map((m, idx) => (
          <div key={idx} className='p-1 flex gap-3'>
            <div className='text-center w-2/12 border-r-2'>{m.writer}</div>
            <div className='pl-2 w-10/12'>{m.content}</div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <div className='p-2 flex gap-3 border-t-2 bg-ourDarkGray/10 rounded-md'>
        <label className='text-center w-2/12'>닉네임닉</label>
        <input
          className='px-2 w-10/12 appearance-none rounded leading-tight focus:outline-none'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setNewMessage('');
              sendMessage();
            }
          }}
        />
      </div>
    </div>
  );
}
