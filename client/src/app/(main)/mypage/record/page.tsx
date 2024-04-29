import type { Metadata } from 'next';
import RecordDetailItem from './_components/RecordDetailItem';

export const metadata: Metadata = {
  title: '학습 일지',
  description: '문해력 학습 서비스 심심한 사과의 분석 보고서',
};

export default function Page() {
  return (
    <div className='flex flex-col md:flex-row lg:flex-row gap-4 px-4 md:px-0 lg:px-0'>
      <div className='w-full md:w-2/3 lg:w-2/3'>
        <div className='text-lg text-ourBlack pt-5 pb-2'>월별 학습 기록</div>
        <div className='flex gap-4 bg-white rounded-2xl '>
          <div className='flex flex-col p-5'>
            <div>달력</div>
            <div>
              <div>날짜</div>
              <div>학습내용</div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/3 lg:w-1/3'>
        <div className='text-lg text-ourBlack pt-5 pb-2'>{'-'}</div>
        <div className='flex flex-col gap-4'>
          <div className='bg-white rounded-2xl p-5'>
            <div className='flex flex-col'>
              <div>타이틀</div>
              <div className='grid grid-cols-2 gap-2'>
                <RecordDetailItem title={'출석일수'} content={'4일'} />
                <RecordDetailItem title={'출석율'} content={'4일'} />
                <RecordDetailItem title={'심심한 사과와 처음 만난 날'} content={'4일'} />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-2xl p-5'>
            <div className='flex flex-col'>
              <div>타이틀</div>
              <div className='grid grid-cols-2 gap-2'>
                <RecordDetailItem title={'횟수'} content={'4일'} />
                <RecordDetailItem title={'완료율'} content={'4일'} />
                <RecordDetailItem title={'가장 많이 한 학습'} content={'4일'} />
                <RecordDetailItem title={'가장 많이 읽은 분야'} content={'4일'} />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-2xl p-5 '>
            <div className='flex flex-col'>
              <div>타이틀</div>
              <div className='grid grid-cols-2 gap-2'>
                <RecordDetailItem title={'우승 횟수'} content={'4일'} />
                <RecordDetailItem title={'총 경기 횟수'} content={'4일'} />
                <RecordDetailItem title={'승률'} content={'4일'} />
                <RecordDetailItem title={'랭킹(*점수)'} content={'4일'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
