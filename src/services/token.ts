'use server'
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function createToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'userToken',
        value: token,
        secure: true,
        maxAge: 60 * 24 * 3600,
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
    })
}

export async function refreshToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'resetToken',
        value: token,
        domain: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
        secure: true,
        maxAge: 29 * 24 * 3600,
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
    })
}

export async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get('userToken');
}
export async function getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get('resetToken');
}

export async function deleteToken() {
    const locale = await getLocale();
    const cookieStore = await cookies();
    cookieStore.delete({
        name: 'userToken',
        domain: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
    })
    cookieStore.delete({
        name: 'resetToken',
        domain: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
    })
    redirect(`/${locale}/login`);
}

export async function createTokenClient(token: string) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'accessToken',
        value: token,
        domain: `${process.env.NEXT_PUBLIC_USERPANEL_URL}`,
        secure: true,
        maxAge: 6 * 24 * 3600,
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
    })
}

