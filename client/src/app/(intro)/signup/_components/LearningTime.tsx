'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function LearningTime() {
  const router = useRouter();
  const [valid, setValid] = useState(true);
  const [AM, setAM] = useState(true);

  const handleAMClick = () => {
    setAM(!AM);
  };

  const handleNextClick = () => {
    if (valid) {
      // 회원가입 처리한 뒤 완료되면 페이지 이동
      Swal.fire({
        title: '가입을 환영합니다.',
        text: '심심한 사과와 함께 문해력을 키워보세요!',
        confirmButtonColor: '#0064FF',
      });
      router.push('/home');
    }
  };

  return (
    <>
      {/* 오전/오후 선택 */}
      <div className='flex gap-4 mx-auto w-80'>
        <div
          className={`flex-1 p-3 text-center cursor-pointer ${AM ? 'bg-black text-white' : 'bg-white text-black border-2 border-gray-200'}  rounded-xl`}
          onClick={handleAMClick}
        >
          오전
        </div>
        <div
          className={`flex-1 p-3 text-center ${!AM ? 'bg-black text-white' : 'bg-white text-black border-2 border-gray-200'} cursor-pointer rounded-xl`}
          onClick={handleAMClick}
        >
          오후
        </div>
      </div>
      <div className='py-2'></div>

      {/* 시간 선택 */}
      <div className='flex items-center justify-center bg-red-200 w-80'>
        <div className='flex-1'>
          <div className='flex'>
            <div>1</div>
            <div>시</div>
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex'>
            <div>15</div>
            <div>분</div>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <button
        className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg  ${
          valid ? 'bg-ourBlue duration-[0.2s] hover:bg-ourTheme/80' : 'bg-gray-300 cursor-not-allowed'
        } text-white`}
        onClick={handleNextClick}
        disabled={!valid}
      >
        다음
      </button>
    </>
  );
}
