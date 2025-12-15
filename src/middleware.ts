import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('userToken')?.value;
    const { pathname } = req.nextUrl;
    // user is logged in but tries to access login
    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // user is not logged in and tries to access protected routes
    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
          Exclude:
          - api routes
          - next internals
          - static files
        */
        "/((?!api|_next|favicon.ico|robots.txt).*)",
    ],
};