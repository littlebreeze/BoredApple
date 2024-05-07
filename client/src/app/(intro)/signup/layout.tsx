export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='max-w-[800px] mx-auto '>
      {/* 회원가입 레이아웃 */}
      {children}
    </div>
  );
}
