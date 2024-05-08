import Link from 'next/link';

export default function QuizButton() {
  return (
    <>
      <Link href={'/quiz'}>
        <div
          className='text-sm px-2 md:px-7 lg:px-7 py-2 cursor-pointer bg-ourBlue rounded-full text-white duration-[0.2s]
          hover:bg-ourBlue/60'
        >
          <button>간편 테스트</button>
        </div>
      </Link>
    </>
  );
}
