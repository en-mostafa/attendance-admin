'use server'

import { loginFormSchema } from "@/lib/schema";
import { postData } from "./fetchData";
import { createToken, refreshToken } from "./token";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export const loginForm = async (state: any, formData: FormData) => {
    const t = await getTranslations('Login.Form.Validation');
    const schema = loginFormSchema(t);

    const parse = schema.safeParse({
        phone: formData.get('phone'),
        password: formData.get('password')
    });
    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors
        }
    }

    //Fetch data
    const res = await postData('/auth/login', parse.data);
    const { data } = await res.json();

    console.log(data)
    if (!res.ok) {
        return { message: 'error', error: data?.message }
    }
    createToken(data.access_token)
    refreshToken(data.access_token)
    redirect("/")
}   