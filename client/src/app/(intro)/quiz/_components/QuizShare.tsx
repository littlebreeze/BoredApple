'use client';
import Image from 'next/image';
import ShareKakao from '@/../public/quiz/share-kakao.svg';
import ShareLink from '@/../public/quiz/share-link.svg';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

export default function QuizShare() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js';
      script.integrity = 'sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC';
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }
      };
    }
  }, []);

  const shareLink = () => {
    const link = `${process.env.NEXT_PUBLIC_SERVICE_URL}/quiz`;
    navigator.clipboard.writeText(link);
    Swal.fire({
      title: '링크가 복사되었습니다.',
      text: '친구에게 문해력 자가진단 테스트를 공유해 보세요!',
      confirmButtonColor: '#0064FF',
    });
  };

  const shareKakao = () => {
    const link = `${process.env.NEXT_PUBLIC_SERVICE_URL}/quiz`;
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '문해력 자가진단',
        description: '#12문제 #10분 #문해력 #자가진단',
        imageUrl: 'https://i.ibb.co/MGXvfNQ/kakao-app-image.jpg',
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    });
  };

  return (
    <div className='flex items-center justify-center w-full gap-10 rounded-lg h-28 bg-ourGreen'>
      <div className='text-xl text-white'>
        진단이 필요한 <br />
        친구에게 공유하기
      </div>
      <div className='flex gap-2 '>
        <div className='w-16 h-16 rounded-full duration-[0.2s] hover:brightness-90'>
          <button onClick={shareKakao}>
            <Image src={ShareKakao} alt='카카오 공유' />
          </button>
        </div>
        <div className='flex bg-blue-200 w-16 h-16 rounded-full items-center justify-center duration-[0.2s] hover:brightness-90'>
          <button onClick={shareLink}>
            <Image className='w-12' src={ShareLink} alt='링크 공유' />
          </button>
        </div>
      </div>
    </div>
  );
}
