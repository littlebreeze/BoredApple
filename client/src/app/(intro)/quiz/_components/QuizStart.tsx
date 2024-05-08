'use client';
import { useRouter } from 'next/navigation';

export default function QuizStart() {
  const router = useRouter();
  const onClick = () => {
    router.push(`/quiz/solve`);
  };

  return (
    <button
      className='mb-4 w-full h-12 rounded-lg text-lg bg-ourTheme text-white duration-[0.2s] hover:bg-ourTheme/80'
      onClick={onClick}
    >
      진단하러 가기
    </button>
  );
}
