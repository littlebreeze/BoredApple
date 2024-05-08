import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/login/authentication', request.url));
}

// export const config = {
//   matcher: '/home',
// };
