import { NextPage } from 'next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: '존재하지 않는 페이지입니다',
};

const NotFound: NextPage = () => {
  return <div className='bg-yellow-200'>존재하지 않는 페이지!</div>;
};

export default NotFound;
