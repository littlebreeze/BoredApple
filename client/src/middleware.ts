import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // path 설정 예제
  // const { pathname } = req.nextUrl;
  // const url = req.nextUrl.clone();
  // if (pathname === '/quiz') {
  //   url.pathname = '/learn/word';
  //   return NextResponse.redirect(url);
  // }

  // 토큰이 없을 경우 로그인 창으로 이동

  // 토큰이 없을 때 로그인페이지로 보냄
  // 와! 지려 ㅆ다 접근 가능할듯? http only 에 대해 살펴보자
  const token = req.cookies.get('refreshToken');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 요청 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/home'],
};
