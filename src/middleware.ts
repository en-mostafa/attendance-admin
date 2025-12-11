import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const [, locale, ...segments] = req.nextUrl.pathname.split('/');
    const token = req.cookies.get('userToken')?.value;

    if (token && req.nextUrl.pathname === `/login`) {
        return NextResponse.redirect(new URL(`/`, req.url))
    }
    if (!token && req.nextUrl.pathname.startsWith(`/`) && req.nextUrl.pathname !== `/login`) {
        return NextResponse.redirect(new URL(`/login`, req.url))
    }
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: ['/', '/:path*']
};