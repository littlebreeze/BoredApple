export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      결과 페이지 레이아웃
      <div>{children}</div>
      메롱
    </div>
  );
}
