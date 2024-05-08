import Link from 'next/link';
import QuizButton from './QuizButton';
import StartButton from './StartButton';

export default function Header() {
  return (
    <div className='h-20 bg-ourTheme py-2'>
      <div className='flex justify-between mx-auto max-w-[1200px]'>
        <Link href='/home' className='flex justify-start w-36 items-center  cursor-pointer'>
          <div className='font-Ansungtangmyun w-40 text-2xl md:text-3xl lg:text-3xl text-white'>심심한 사과</div>
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
