import type { Metadata } from 'next';
import './globals.css';
import ogMain from '@/../public/openGraph/og-main-image.jpg';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지킴이',
  description: '문해력 학습 서비스 심심한 사과',
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      {/* 루트 레이아웃 */}
      <body>{children}</body>
    </html>
  );
}
