import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware(routing);

export function middleware(req: NextRequest) {
    const [, locale, ...segments] = req.nextUrl.pathname.split('/');
    const token = req.cookies.get('userToken')?.value;

    if (token && req.nextUrl.pathname === `/${locale}/login`) {
        return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }
    if (!token && req.nextUrl.pathname.startsWith(`/${locale}`) && req.nextUrl.pathname !== `/${locale}/login`) {
        return NextResponse.redirect(new URL(`/${locale || 'en'}/login`, req.url))
    }


    const handleI18nRouting = createMiddleware({
        locales: ['en', 'fa', 'ar', 'tr', 'ru'],
        defaultLocale: "en"
    });
    const response = handleI18nRouting(req);
    return response
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: ['/', '/(fa|en|ar|tr|ru)/:path*']
};