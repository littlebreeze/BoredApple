export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* 로그인 전 레이아웃 */}
      {children}
    </div>
  );
}
