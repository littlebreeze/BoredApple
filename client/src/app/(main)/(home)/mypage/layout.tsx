import MyInfo from './_components/MyInfo';
import MyPageNav from './analysis/_components/MyPageNav';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <div className='text-xl py-5'>
          <MyInfo />
        </div>
        <MyPageNav />
      </div>
      <>{children}</>
    </>
  );
}
