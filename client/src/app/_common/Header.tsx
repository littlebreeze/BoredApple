import QuizButton from './QuizButton';
import StartButton from './StartButton';

export default function Header() {
  return (
    <div className='h-20 bg-red-400'>
      <div className='flex justify-between mx-auto max-w-[1200px]'>
        <div>로고</div>
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
