'use client';
const InsertProblem: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      <div className='py-4'></div>
      <div className='flex'>
        <div className='mr-2'>문장 넣기</div>
        <div>
          <span className='text-ourBlue'>{progress}</span>
          <span className='text-ourBlack'> / 3</span>
        </div>
      </div>
      <div className='py-1'></div>
      <div>다음 글을 읽고 문맥상 빈칸에 들어가기에 알맞은 내용을 골라주세요</div>
      <div className='py-2'></div>
    </>
  );
};

export default InsertProblem;
