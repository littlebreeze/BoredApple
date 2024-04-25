export default function Page({ params }: { params: { id: string } }) {
  return <div className='bg-yellow-400'>{params.id}번 퀴즈 결과 페이지 </div>;
}

export async function generateStaticParams() {
  const paths = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];

  return paths;
}
