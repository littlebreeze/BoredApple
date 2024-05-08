import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('미들웨어 실행');
  const pathname = request.nextUrl;
  console.log(pathname);

  //   console.log(localStorage.getItem('accessToken'));
  //   console.log(localStorage.getItem('으악'));
}
