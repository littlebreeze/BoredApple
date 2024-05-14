'use client';

import Image from 'next/image';
import { IRankingList } from '@/types/Ranking';
import { useGetRanking } from '@/queries/get-ranking';

import trophy from '@/../public/game/trophy.svg';
import first from '@/../public/game/1st.svg';
import second from '@/../public/game/2nd.svg';
import third from '@/../public/game/3rd.svg';

export default function GameLeftSection() {
  const { data: rankings } = useGetRanking();

  const rankingList: IRankingList[] = rankings?.rankingList ?? [];

  return (
    <div className='flex flex-col items-center w-full h-full p-5'>
      <div className='flex flex-col items-center'>
        <div className='flex items-center justify-center w-1/3'>
          <Image
            className='w-full h-full'
            src={trophy}
            width={400}
            height={400}
            alt='트로피'
          />
        </div>
        <div className='pt-5 text-xl text-white'>{rankingList[0]?.nickname}</div>
      </div>
      <div className='flex flex-col w-full h-full gap-2 pt-2 mt-5 text-sm bg-white rounded-lg'>
        <div className='flex pb-1 text-center border-b text-ourDarkGray'>
          <div className='flex-1'>순위</div>
          <div className='flex-1'>닉네임</div>
          <div className='flex-1'>레이팅</div>
        </div>
        {rankingList &&
          rankingList.map((rank, idx) => (
            <div
              key={idx}
              className='flex text-center'
            >
              <div className='flex-1 h-5'>
                {rank.ranking === 1 ? (
                  <Image
                    className='h-full'
                    src={first}
                    loading='eager'
                    width={500}
                    height={500}
                    alt='1등'
                  />
                ) : rank.ranking === 2 ? (
                  <Image
                    className='h-full'
                    src={second}
                    width={500}
                    height={500}
                    alt='2등'
                  />
                ) : rank.ranking === 3 ? (
                  <Image
                    className='h-full'
                    src={third}
                    width={500}
                    height={500}
                    alt='3등'
                  />
                ) : (
                  rank.ranking
                )}
              </div>
              <div className='flex-1 text-xs truncate'>{rank.nickname}</div>
              <div className='flex-1'>{rank.rating}</div>
            </div>
          ))}
        <div className='flex flex-col items-center justify-center flex-1 text-xl'>
          <div>•••</div>
        </div>
        <div className='flex py-1 font-semibold text-center rounded-bl-lg rounded-br-lg bg-ourTheme bg-opacity-30'>
          <div className='flex-1 h-5'>
            {rankings?.myRanking === 1 ? (
              <Image
                className='h-full'
                src={first}
                width={500}
                height={500}
                alt='1등'
              />
            ) : rankings?.myRanking === 2 ? (
              <Image
                className='h-full'
                src={second}
                width={500}
                height={500}
                alt='2등'
              />
            ) : rankings?.myRanking === 3 ? (
              <Image
                className='h-full'
                src={third}
                loading='eager'
                width={500}
                height={500}
                alt='3등'
              />
            ) : rankings && rankings?.myRanking <= 99 ? (
              rankings?.myRanking
            ) : (
              '99+'
            )}
          </div>
          <div className='flex items-center justify-center flex-1 text-xs truncate'>{rankings?.myNickname}</div>
          <div className='flex-1'> {rankings?.myRating}</div>
        </div>
      </div>
    </div>
  );
}
