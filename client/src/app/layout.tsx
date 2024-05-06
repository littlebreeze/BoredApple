import type { Metadata } from 'next';
import './globals.css';
import ogMain from '@/../public/openGraph/og-main-image.jpg';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지키미',
  description: '문해력 학습 서비스 심심한 사과',
  openGraph: {
    type: 'website',
    title: '심심한 사과, 당신의 문해력 지키미',
    description: '문해력 학습 플랫폼, 심심한 사과',
    images: [{ url: `${ogMain}`, alt: '당신의 문해력 지키미, 심심한 사과' }],
  },
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
      {/* <Script
        src='https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js'
        integrity='sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC'
        crossOrigin='anonymous'
        strategy='afterInteractive'
      /> */}
    </html>
  );
}
