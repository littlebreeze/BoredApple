'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useGameScoreStore } from '@/stores/game-score';
import { useWebsocketStore } from '@/stores/websocketStore';
import { Client, IMessage } from '@stomp/stompjs';
import axios from 'axios';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function ChatWrapper({ roomId }: { roomId: number }) {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');

  const { myNickname, myUserId } = useGameRoomStore();
  const { addPlayers, exitPlayer, getScore } = useGameScoreStore();
  const { connect, disconnect, messages, sendMessage, clearMessage, answer, stompClient, isCorrectAnswer } =
    useWebsocketStore();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (stompClient)
      sendMessage({
        type: 'ENTER',
        roomId: roomId,
        sender: myNickname!,
        senderId: myUserId!,
        message: newMessage,
      });
    // // 메시지 비우기
    // return () => {
    //   clearMessage();
    // };
  }, [roomId, connect, disconnect]);

  useEffect(() => {
    // 마운트 될때 비우고
    clearMessage();
  }, []);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && Number(lastMsg.target) !== myUserId) {
      if (lastMsg.type === 'ENTER') {
        console.log('사용자를 추가하세요');
        addPlayers({
          score: 0,
          nickname: lastMsg.content,
          id: lastMsg.target,
        });
        // 퇴장 메세지가 나오면 삭제....
      } else if (lastMsg.type === 'EXIT') {
        exitPlayer(lastMsg.target);
      }
    } else if (lastMsg && lastMsg.type === 'CORRECT') {
      console.log(lastMsg.target, '의 점수를 올리세요');
      getScore(lastMsg.target);
    }
  }, [messages]);

  return (
    <div className='h-full px-3 pt-3 pb-1 bg-ourLightGray/50 rounded-xl flex flex-col justify-between'>
      <div className='h-44 flex flex-col overflow-y-scroll'>
        {messages.map((m, idx) => (
          <div
            key={idx}
            className='p-1 flex gap-3'
          >
            <div className={`text-center w-2/12 border-r-2 ${m.writer === '심심한 사과' && 'font-bold text-ourTheme'}`}>
              {m.writer}
            </div>
            <div
              className={`pl-2 w-10/12 
              ${Number(m.target) !== myUserId && m.type === 'ENTER' && 'text-ourTheme'} 
              ${m.type === 'EXIT' && ' text-rose-500 '}
              ${m.type === 'CORRECT' && ' text-ourTheme font-bold '}`}
            >
              {m.content}
              {m.type === 'ENTER' && '님이 입장하셨습니다.'}
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
              sendMessage({
                type: answer === newMessage && !isCorrectAnswer ? 'CORRECT' : 'TALK',
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
