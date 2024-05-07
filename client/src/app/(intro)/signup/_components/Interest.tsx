'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import checked from '@/../public/signup/checked.svg';
import unchecked from '@/../public/signup/unchecked.svg';

export default function Interest() {
  const router = useRouter();
  const [valid, setValid] = useState(false);

  const handleClick = () => {
    if (valid) {
      // 회원가입 처리한 뒤 완료되면 페이지 이동
      router.push('/signup/interest');
    }
  };

  return (
    <>
      <div className='flex flex-col gap-1 overflow-y-scroll h-72'>
        {/* 인문 */}
        <div className='flex flex-col p-4 bg-black rounded-lg w-80'>
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourBlue w-fit'>인문</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={checked} alt='체크' />
            </div>
            <div className='text-sm text-white'>인문 텍스트 설명</div>
          </div>
        </div>
        {/* 사회 */}
        <div className='flex flex-col p-4 bg-black rounded-lg w-80'>
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourPurple w-fit'>사회</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={checked} alt='체크' />
            </div>
            <div className='text-sm text-white'>사회 텍스트 설명</div>
          </div>
        </div>
        {/* 과학 */}
        <div className='flex flex-col p-4 bg-black rounded-lg w-80'>
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourGreen w-fit'>과학</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={checked} alt='체크' />
            </div>
            <div className='text-sm text-white'>과학 텍스트 설명</div>
          </div>
        </div>
        {/* 기술 */}
        <div className='flex flex-col p-4 bg-black rounded-lg w-80'>
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourYellow w-fit'>기술</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={checked} alt='체크' />
            </div>
            <div className='text-sm text-white'>기술 텍스트 설명</div>
          </div>
        </div>
        {/* 예술 */}
        <div className='flex flex-col p-4 bg-black rounded-lg w-80'>
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourPink w-fit'>예술</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={checked} alt='체크' />
            </div>
            <div className='text-sm text-white'>예술 텍스트 설명</div>
          </div>
        </div>
      </div>
      <button
        className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg  ${
          valid ? 'bg-ourBlue duration-[0.2s] hover:bg-ourTheme/80' : 'bg-gray-300 cursor-not-allowed'
        } text-white`}
        onClick={handleClick}
        disabled={!valid}
      >
        다음
      </button>
    </>
  );
}
