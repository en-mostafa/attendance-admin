'use server'

import { redirect } from "next/navigation";
import { postData } from "./fetchData"
import { deleteToken, getRefreshToken } from "./token"
import { getLocale } from "next-intl/server";

export const logout = async () => {
    const locale = await getLocale();
    const value = await getRefreshToken();
    const refreshToken = value?.value ;

    deleteToken();
    //await postData('/auth/logout', { refreshToken });
    redirect(`${locale}/login`)

    //return { message: 'success' }
}   