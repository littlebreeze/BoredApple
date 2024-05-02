'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import './ChatRoomPage.css';
import Link from 'next/link';

interface ChatRoom {
  roomId: number;
}
function ChatRoomPage() {
  const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const loadChatRoomHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8788/api/v1/rooms');
        console.log(response.data.data);
        const chatRoomList: ChatRoom[] = response.data.data.messageList.map((item: any) => {
          return { roomId: item.roomId } as ChatRoom;
        });
        setChatRoomList(chatRoomList);
      } catch (error) {
        console.error('채팅 내역 로드 실패', error);
      }
    };
    loadChatRoomHistory();
  }, []);
  return (
    <>
      <div className='ChatRoomPage'>
        <ul className='chatRoomList'>
          {chatRoomList.map((chatRoom, idx) => (
            <div key={idx}>
              <li>
                <Link href={`/game/rooms/${chatRoom.roomId}`}>{chatRoom.roomId} 번 채팅방</Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ChatRoomPage;
