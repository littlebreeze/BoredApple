export default function GameScoreBoard() {
  return (
    <div className='flex flex-col gap-1 p-3 bg-white rounded-xl'>
      <div className='text-center'>점수</div>
      <div className='flex justify-between'>
        <div>문해문어</div>
        <div>1</div>
      </div>
      <div className='flex justify-between'>
        <div>문해너구리</div>
        <div>3</div>
      </div>
    </div>
  );
}
