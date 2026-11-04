import { getSessionCookie } from 'better-auth/cookies';
import { NextResponse, type NextRequest } from 'next/server';

// Next.js 16: `proxy.ts` replaces `middleware.ts`.
// Optimistic cookie check only — the Express API still verifies the JWT on every protected call.
export function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  if (!session) {
    const url = new URL('/login', request.url);
    url.searchParams.set(
      'redirect',
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/add-book', '/my-books', '/my-borrows', '/profile', '/books/:id+'],
};
