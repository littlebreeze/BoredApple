'use client';
import Image from 'next/image';
import ShareKakao from '@/../public/quiz/share-kakao.svg';
import ShareLink from '@/../public/quiz/share-link.svg';

export default function QuizShare() {
  const shareLink = () => {
    console.log('링크 공유');
  };

  const shareKakao = () => {
    console.log('카카오 공유');
  };

  return (
    <div className='w-full h-28 flex justify-center items-center bg-ourGreen gap-10 rounded-lg'>
      <div className='text-xl text-white'>
        진단이 필요한 <br />
        친구에게 공유하기
      </div>
      <div className='flex gap-2'>
        <div className='bg-yellow-200 w-16 h-16 rounded-full'>
          <button onClick={shareKakao}>
            <Image src={ShareKakao} alt='카카오 공유' />
          </button>
        </div>
        <div className='flex bg-blue-200 w-16 h-16 rounded-full items-center justify-center'>
          <button onClick={shareLink}>
            <Image className='w-12' src={ShareLink} alt='링크 공유' />
          </button>
        </div>
      </div>
    </div>
  );
}
