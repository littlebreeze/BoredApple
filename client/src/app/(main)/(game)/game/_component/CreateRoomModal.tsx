'use client';

import { useModalStore } from '@/stores/modal';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateRoomModal() {
  const [roomName, setRoomName] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [roomPassword, setRoomPassword] = useState('');
  const [maxNum, setMaxNum] = useState(1);
  const [quizCount, setQuizCount] = useState(0);
  const modalStore = useModalStore();
  const router = useRouter();

  const parent = modalStore.data;

  const mutation = useMutation({
    mutationFn: async (e) => {
      return axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/game-service/rooms`, {
        roomName: roomName,
        isSecret: isSecret,
        roomPassword: roomPassword,
        maxNum: maxNum,
        quizCount: quizCount,
      });
    },
    async onSuccess(response, variable) {
      const newRoomId = await response.data.data;
      router.replace(`/game/rooms/${newRoomId}`);
    },
    onError(error) {
      console.error(error);
      alert('방 생성 중 에러가 발생했습니다.');
    },
    onSettled() {
      modalStore.reset();
      router.back();
    },
  });

  const submitBtn = () => {
    console.log('방이름', roomName);
    console.log('비밀?', isSecret);
    console.log('비밀번호', roomPassword);
    console.log('정원', maxNum);
    console.log('문제수', quizCount);
    mutation.mutate();
  };
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center h-full bg-gray-600 w-lvw bg-opacity-60'>
      <div className='relative flex flex-col p-5 h-4/7 w-2/11 bg-ourLightGray rounded-2xl'>
        <div className='text-2xl font-semibold text-ourTheme'>방만들기</div>
        <div className='mt-3'>
          <input
            className='w-full p-2 text-lg rounded-lg'
            type='text'
            placeholder='방 제목을 입력해 주세요.'
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </div>
        <div className='flex flex-col gap-2 mt-5 mx-7'>
          <div className='flex'>
            <div className='flex items-center justify-center w-16 p-1 text-sm font-semibold text-center rounded-tl-lg rounded-bl-lg h-7 bg-ourGray'>
              문제 수
            </div>
            <div className='flex flex-1'>
              <ul className='flex items-center w-full h-full text-sm bg-white border rounded-tr-lg rounded-br-lg border-gary-200'>
                <li className='w-full border-b border-gray-200'>
                  <div className='flex items-center ps-3'>
                    <input
                      className='w-5 h-5'
                      type='radio'
                      id='5quiz'
                      value={5}
                      name='quizCountRadio'
                      defaultChecked
                      onChange={(e) => setQuizCount(Number(e.target.value))}
                    />
                    <label
                      htmlFor='5quiz'
                      className='w-full py-1 text-sm font-medium text-gray-900 ms-2'
                    >
                      5개
                    </label>
                  </div>
                </li>
                <li className='w-full border-b border-gray-200'>
                  <div className='flex items-center ps-3'>
                    <input
                      className='w-5 h-5'
                      type='radio'
                      id='10quiz'
                      value={10}
                      name='quizCountRadio'
                      onChange={(e) => setQuizCount(Number(e.target.value))}
                    />
                    <label
                      htmlFor='10quiz'
                      className='w-full py-1 text-sm font-medium text-gray-900 ms-2'
                    >
                      10개
                    </label>
                  </div>
                </li>
                <li className='w-full border-b border-gray-200'>
                  <div className='flex items-center ps-3'>
                    <input
                      className='w-5 h-5'
                      type='radio'
                      id='15quiz'
                      value={15}
                      name='quizCountRadio'
                      onChange={(e) => setQuizCount(Number(e.target.value))}
                    />
                    <label
                      htmlFor='15quiz'
                      className='w-full py-1 text-sm font-medium text-gray-900 ms-2'
                    >
                      15개
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex'>
            <div className='flex items-center justify-center w-16 p-1 text-sm font-semibold text-center rounded-tl-lg rounded-bl-lg h-7 bg-ourGray'>
              정원
            </div>
            <div className='flex items-center'>
              <input
                type='text'
                className='h-full px-2 text-center rounded-tr-lg rounded-br-lg w-14'
                value={maxNum}
                readOnly
              />
              <div>
                <div
                  className='flex items-center justify-center cursor-pointer'
                  onClick={() => {
                    setMaxNum(maxNum < 6 ? maxNum + 1 : maxNum);
                  }}
                >
                  <Image
                    className='h-full pl-2'
                    src='/up-fill.svg'
                    loading='eager'
                    width={20}
                    height={20}
                    alt='비밀방'
                  />
                </div>
                <div
                  className='flex items-center justify-center cursor-pointer'
                  onClick={() => {
                    setMaxNum(maxNum > 1 ? maxNum - 1 : maxNum);
                  }}
                >
                  <Image
                    className='h-full pl-2'
                    src='/down-fill.svg'
                    loading='eager'
                    width={20}
                    height={20}
                    alt='비밀방'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='flex items-center justify-center w-16 p-1 text-sm font-semibold text-center rounded-tl-lg rounded-bl-lg h-7 bg-ourGray'>
              비밀번호
            </div>
            <div className='flex flex-1'>
              <input
                type='text'
                className='w-2/3 h-full px-2 border-l border-white rounded-tr-lg rounded-br-lg'
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                readOnly={!isSecret}
                style={{
                  backgroundColor: isSecret ? 'white' : '#D9D9D9',
                }}
              />
              <div className='flex items-center justify-center gap-1'>
                <label
                  htmlFor='secret-chk'
                  className='flex items-center justify-center w-full gap-1 text-sm'
                >
                  <Image
                    className='h-full pl-2'
                    src='/rock.svg'
                    loading='eager'
                    width={20}
                    height={20}
                    alt='비밀방'
                  />
                  비밀방
                </label>
                <input
                  className='w-6 h-6'
                  type='checkbox'
                  id='secret-chk'
                  checked={isSecret}
                  onChange={() => {
                    setIsSecret(!isSecret);
                    if (isSecret) setRoomPassword('');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-around mt-4'>
          <button
            className='w-1/4 h-8 text-white rounded-lg bg-ourDarkGray'
            onClick={() => {
              setRoomName('');
              setQuizCount(0);
              setMaxNum(0);
              setRoomPassword('');
              setIsSecret(false);
              router.back();
            }}
          >
            취소
          </button>
          <button
            className='w-1/4 h-8 text-white rounded-lg bg-ourTheme'
            onClick={submitBtn}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
