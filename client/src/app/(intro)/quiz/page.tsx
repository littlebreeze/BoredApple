import type { Metadata } from 'next';
import Image from 'next/image';
import quiz from '../../../../public/quiz-main.svg';
import ShareKakao from '../../../../public/share-kakao.svg';
import ShareLink from '../../../../public/share-link.svg';

export const metadata: Metadata = {
  title: '문해력 테스트',
  description: '문해력 테스트',
};

export default function Page() {
  return (
    <div className=' mx-auto max-w-[1200px] flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <div className='font-Ansungtangmyun text-4xl my-12'>문해력 자가진단 테스트</div>
        <Image className='w-96 mb-12' src={quiz} alt='quiz' />
        <button className='mb-4 w-full h-14 rounded-lg text-lg bg-ourTheme text-white'>진단하러 가기</button>
        <div className='w-full h-28 flex justify-center items-center bg-ourGreen gap-10 rounded-lg'>
          <div className='text-xl font-semibold  text-white'>
            진단이 필요한 <br />
            친구에게 공유하기
          </div>
          <div className='flex gap-2'>
            <div className='bg-yellow-200 w-16 h-16 rounded-full'>
              <button>
                <Image src={ShareKakao} alt='카카오 공유' />
              </button>
            </div>
            <div className='flex bg-blue-200 w-16 h-16 rounded-full items-center justify-center'>
              <button>
                <Image className='w-12' src={ShareLink} alt='카카오 공유' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
