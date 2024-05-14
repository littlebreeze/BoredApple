import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;
  // const url = req.nextUrl.clone();
  // if (pathname === '/quiz') {
  //   url.pathname = '/learn/word';
  //   return NextResponse.redirect(url);
  // }

  // 토큰이 없을 경우 로그인 창으로 이동
  // const token = req.cookies.get('refreshToken');
  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // 요청 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/home'],
};
