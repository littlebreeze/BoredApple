import Link from 'next/link';

export default function MakeRoomBtn() {
  return (
    <>
      <Link
        href={'/game/create'}
        className='flex items-center justify-center w-full text-sm text-white duration-100 rounded-md cursor-pointer bg-ourBlue md:text-lg lg:text-lg h-11 hover:bg-ourTheme'
      >
        방만들기
      </Link>
    </>
  );
}
