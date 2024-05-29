import Image from 'next/image';

export default function Card({ num }: { num: number }) {
  return (
    <Image
      src={`/about/card${num}.png`}
      loading='eager'
      width={500}
      height={500}
      alt=''
      className='w-1/3 md:w-full lg:w-full drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]'
    />
  );
}
