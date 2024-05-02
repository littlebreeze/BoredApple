'use client';
import { useEffect, useState } from 'react';
// stomp에서
import { Client, IMessage } from '@stomp/stompjs';
import axios from 'axios';
// import './ChatPage.css';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface ChatMessageRequest {
  from: string;
  text: string;
  roomId: number;
}
interface ChatMessageResponse {
  id: number;
  content: string;
  writer: string;
}

function ChatPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [writer, setWriter] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8788/api/v1/rooms/${roomId}/messages`);
        const messages = response.data.data as ChatMessageResponse[];
        console.log(response.data.data);
        setMessages(messages);
      } catch (error) {
        console.error('채팅 내역 로드 실패', error);
      }
    };

    loadChatHistory();
    const client = new Client({
      brokerURL: 'ws://localhost:8788/chat', // 서버 WebSocket URL
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/public/rooms/${roomId}`, (message: IMessage) => {
          const msg: ChatMessageResponse = JSON.parse(message.body);
          setMessages((prevMessages) => [msg, ...prevMessages]);
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
        from: writer,
        text: newMessage,
        roomId: parseInt(roomId || ''),
      };
      stompClient.publish({
        destination: `/app/chat/rooms/${roomId}/send`,
        body: JSON.stringify(chatMessage),
      });
      console.log(messages);
      setNewMessage('');
    }
  };

  return (
    <div className='chat-container'>
      <div>
        <Link href={'/game'} className='back-link'>
          뒤로 가기
        </Link>
      </div>
      <div className='chat-messages'>
        {messages &&
          messages.map((msg, idx) => (
            <div key={idx}>
              {msg.writer}: {msg.content}
            </div>
          ))}
      </div>
      <div className='input-group'>
        <label>작성자</label>
        <input type='text' value={writer} onChange={(e) => setWriter(e.target.value)} />
      </div>
      <div className='input-group'>
        <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button className='send-button' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
