import Link from 'next/link';
import QuizButton from './QuizButton';
import StartButton from './StartButton';

export default function Header() {
  return (
    <div className='h-20 py-2 bg-ourTheme'>
      <div className='flex justify-between mx-auto max-w-[1200px]'>
        <Link href='/home' className='flex items-center justify-start cursor-pointer w-36'>
          <div className='w-40 text-2xl text-white font-Ansungtangmyun md:text-3xl lg:text-3xl'>심심한 사과</div>
        </Link>
        <div className='flex'>
          <div className='mx-2'>
            <QuizButton />
          </div>
          <div className='mx-2'>
            <StartButton />
          </div>
        </div>
      </div>
    </div>
  );
}
