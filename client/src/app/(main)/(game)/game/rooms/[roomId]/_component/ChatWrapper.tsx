'use client';

import { useEffect, useRef, useState } from 'react';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useGameScoreStore } from '@/stores/game-score';
import { useWebsocketStore } from '@/stores/websocketStore';

export default function ChatWrapper({ roomId }: { roomId: number }) {
  const chatRef = useRef<HTMLInputElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const [focused, setFocused] = useState(false);
  const [newMessage, setNewMessage] = useState<string>('');

  const { myNickname, myUserId } = useGameRoomStore();
  const { addPlayers, exitPlayer, getScore } = useGameScoreStore();
  const { messages, sendMessage, answer, stompClient, isCorrectAnswer, isGameRoundInProgress, timer } =
    useWebsocketStore();

  // 게임화면에서 엔터로 인풋창 포커스
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        chatRef.current?.focus();
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  // 마지막 채팅으로 스크롤 이동
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 방 입장했을 때 메세지 전송 (stompClient active, connected)
  useEffect(() => {
    if (stompClient?.active || stompClient?.connected)
      sendMessage({
        type: 'ENTER',
        roomId: roomId,
        sender: myNickname!,
        senderId: myUserId!,
        message: newMessage,
      });
  }, [stompClient?.active, stompClient?.connected]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && Number(lastMsg.target) !== myUserId) {
      if (lastMsg.type === 'ENTER') {
        addPlayers({
          score: 0,
          nickname: lastMsg.content,
          id: lastMsg.target,
        });
        // 퇴장 메세지가 나오면 삭제
      } else if (lastMsg.type === 'EXIT') {
        exitPlayer(lastMsg.target);
      }
    }
    if (lastMsg && lastMsg.type === 'CORRECT') {
      getScore(lastMsg.target);
    }
  }, [messages]);

  return (
    <div className='h-full px-3 pt-3 pb-1 bg-ourLightGray/50 rounded-xl flex flex-col justify-between'>
      <div className='h-44 flex flex-col overflow-y-scroll'>
        {messages.map((m, idx) => (
          <div key={idx} className='p-1 flex gap-3'>
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
          ref={chatRef}
          placeholder={focused ? '' : '엔터키를 눌러 채팅을 시작하세요'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setNewMessage('');
              // 조건문 수정... 정답일때 TALK도 보내야 할듯!
              if (newMessage.trim() !== '') {
                sendMessage({
                  type:
                    !isGameRoundInProgress || timer === 0
                      ? 'TALK'
                      : answer === newMessage && !isCorrectAnswer
                      ? 'CORRECT'
                      : 'TALK',
                  roomId: roomId,
                  sender: myNickname!,
                  senderId: myUserId!,
                  message: newMessage,
                });
              }
            }
          }}
        />
      </div>
    </div>
  );
}
