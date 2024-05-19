import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  // 1. 토큰이 없는 경우(비로그인)
  const refreshToken = req.cookies.get('refreshtoken');
  if (
    !refreshToken &&
    (pathname.startsWith('/home') ||
      pathname.startsWith('/learn') ||
      pathname.startsWith('/game') ||
      pathname.startsWith('/mypage') ||
      pathname.startsWith('/signup'))
  ) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. 사용자가 직접 URL을 입력한 경우
  const referer = req.headers.get('referer');

  // 2-1. 회원가입 정보 입력
  if (!referer && pathname.startsWith('/signup')) {
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  // 2-2. 로그인 인증
  if (!referer && pathname.startsWith('/login/authentication')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 2-3. 게임
  if (!referer && (pathname.startsWith('/game/create') || pathname.startsWith('/game/rooms'))) {
    url.pathname = '/game';
    return NextResponse.redirect(url);
  }

  // 조건을 만족할 경우 기존 응답 로직 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/learn/:path*', '/game/:path*', '/mypage/:path*', '/signup/:path*', '/login/authentication'],
};
