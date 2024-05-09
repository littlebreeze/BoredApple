'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import closeButton from '@/../public/learn/close-button.svg';

export default function CloseButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/home');
  };
  return (
    <div>
      <div className='w-6 cursor-pointer text-xl font-semibold' onClick={handleClick}>
        <Image src={closeButton} alt='닫기 버튼' />
      </div>
    </div>
  );
}
