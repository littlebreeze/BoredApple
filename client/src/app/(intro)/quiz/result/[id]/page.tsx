export default function Page({ params }: { params: { id: string } }) {
  return <div className='bg-yellow-400'>{params.id}번 퀴즈 결과 페이지 </div>;
}
