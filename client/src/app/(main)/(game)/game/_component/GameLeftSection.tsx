import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import instance from '@/utils/interceptor';
import Image from 'next/image';

export interface IRankings {
  myRanking: number;
  myNickname: string;
  myRating: number;
  rankingList: [
    {
      ranking: number;
      nickname: string;
      rating: number;
    }
  ];
}

async function getRanking() {
  try {
    const res = await instance.get<IRankings>(`${process.env.NEXT_PUBLIC_API_SERVER}/game-server/rankings`);
    console.log(res.data);
    return res.data || {};
  } catch (e) {
    console.log('랭킹 조회 에러: ', e);
    return { data: {} };
  }
}

export default async function GameLeftSection() {
  // 더미
  const rankingList = [
    {
      rank: 1,
      nickname: '문해너구리너구리',
      rating: 2400,
    },
    {
      rank: 2,
      nickname: '문해문어',
      rating: 2300,
    },
    {
      rank: 3,
      nickname: '문해코끼리',
      rating: 2200,
    },
    {
      rank: 4,
      nickname: '무내무너',
      rating: 2100,
    },
    {
      rank: 5,
      nickname: '무뇌문어',
      rating: 2000,
    },
    {
      rank: 6,
      nickname: '하재률',
      rating: 1200,
    },
  ];

  const myRanking = {
    rank: 1,
    nickname: '문해너구리',
    rating: 2400,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['ranking'], queryFn: getRanking });
  const dehydratedState = dehydrate(queryClient);

  const rankings: IRankings | undefined = queryClient.getQueryData(['ranking']);

  // const rankingList = rankings?.rankingList;
  // rankings 바로 써먹기

  return (
    <div className='flex flex-col items-center w-full h-full p-5'>
      <div className='flex flex-col items-center'>
        <div className='flex items-center justify-center w-1/3'>
          <Image
            className='w-full h-full'
            src='/trophy.svg'
            loading='eager'
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
        <HydrationBoundary state={dehydratedState}>
          {rankingList &&
            rankingList.map((rank, idx) => (
              <div
                key={idx}
                className='flex text-center'
              >
                <div className='flex-1 h-5'>
                  {rank.rank === 1 ? (
                    <Image
                      className='h-full'
                      src='/1st.svg'
                      loading='eager'
                      width={500}
                      height={500}
                      alt='1등'
                    />
                  ) : rank.rank === 2 ? (
                    <Image
                      className='h-full'
                      src='/2nd.svg'
                      loading='eager'
                      width={500}
                      height={500}
                      alt='2등'
                    />
                  ) : rank.rank === 3 ? (
                    <Image
                      className='h-full'
                      src='/3rd.svg'
                      loading='eager'
                      width={500}
                      height={500}
                      alt='3등'
                    />
                  ) : (
                    rank.rank
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
              {myRanking.rank === 1 ? (
                <Image
                  className='h-full'
                  src='/1st.svg'
                  loading='eager'
                  width={500}
                  height={500}
                  alt='1등'
                />
              ) : myRanking.rank === 2 ? (
                <Image
                  className='h-full'
                  src='/2nd.svg'
                  loading='eager'
                  width={500}
                  height={500}
                  alt='2등'
                />
              ) : myRanking.rank === 3 ? (
                <Image
                  className='h-full'
                  src='/3rd.svg'
                  loading='eager'
                  width={500}
                  height={500}
                  alt='3등'
                />
              ) : (
                myRanking.rank
              )}
            </div>
            <div className='flex items-center justify-center flex-1 text-xs truncate'>{myRanking.nickname}</div>
            <div className='flex-1'> {myRanking.rating}</div>
          </div>
        </HydrationBoundary>
      </div>
    </div>
  );
}
