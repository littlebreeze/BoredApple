export default function QuizWrapper() {
  return (
    <>
      <div className='flex flex-col w-full h-56 p-3 bg-white rounded-xl'>
        <div>4 / 20</div>
        <div className='flex items-center justify-center flex-1 px-5 text-lg font-semibold font-Batang'>
          세금을 가혹하게 거두어들이고, 무리하게 재물을 빼앗음. 세금을 가혹하게 거두어들이고, 무리하게 재물을 빼앗음.
        </div>
      </div>
      <div className='flex justify-center h-16 gap-3 mt-5'>
        <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄱ</div>
        <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄹ</div>
        <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㅈ</div>
        <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄱ</div>
        {/* <button className='w-1/2 text-3xl text-white rounded-3xl bg-ourRed'>게임시작</button> */}
      </div>
    </>
  );
}
