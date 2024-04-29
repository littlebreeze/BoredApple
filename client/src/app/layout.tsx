import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지키미',
  description: '문해력 학습 서비스 심심한 사과의 소개 페이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
