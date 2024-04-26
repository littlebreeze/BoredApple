import Image from 'next/image';

export default function Card({ num }: { num: number }) {
  return (
    <Image
      src={`/about/card${num}.png`}
      loading='eager'
      width={500}
      height={500}
      data-w-id='82fb0c48-ee0d-a227-b693-79ad41998fe6'
      alt=''
      className='w-1/4'
    />
    // <div className='w-1/3 bg-black'>
    //   <div className='bg-green-500/50 w-[200px] h-[200px]'></div>
    // </div>
  );
}
