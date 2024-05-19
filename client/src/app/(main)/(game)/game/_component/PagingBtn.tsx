'use client';

import { useGameWaitStore } from '@/stores/game-wait';

export default function PagingBtn({ title, activate }: { title: string; activate: boolean }) {
  const { pageNum, setPageNum } = useGameWaitStore();
  const onClickBtn = () => {
    if (activate) {
      if (title === '이전') {
        if (pageNum > 1) setPageNum(pageNum - 1);
      } else if (title === '다음') {
        setPageNum(pageNum + 1); // 다음 페이지가 없으면 못누름
      }
    }
  };

  return (
    <>
      <div
        onClick={onClickBtn}
        className={`flex justify-center items-center rounded-xl w-full h-11 duration-100 ${
          activate
            ? 'bg-ourDarkGray/80 text-white cursor-pointer hover:bg-ourDarkGray/90'
            : 'bg-ourGray/80 text-ourDarkGray cursor-not-allowed'
        }`}
      >
        {title}
      </div>
    </>
  );
}
