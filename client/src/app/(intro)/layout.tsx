export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='h-screen bg-ourBlue'>{children}</div>;
}
