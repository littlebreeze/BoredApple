import MyPageNav from './_component/MyPageNav';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <div className='text-xl py-5'>
          <span className='text-2xl font-bold'>문해너구리</span>의 활동 기록
        </div>
        <MyPageNav />
      </div>
      <>{children}</>
    </>
  );
}
