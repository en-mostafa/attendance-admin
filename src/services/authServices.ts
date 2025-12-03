'use server'

import { loginFormSchema } from "@/lib/schema";
import { postData } from "./fetchData";
import { createToken, refreshToken } from "./token";
import { getTranslations } from "next-intl/server";

export const loginForm = async (state:any, formData:FormData) => {
    const t = await getTranslations('Login.Form.Validation');
    const schema = loginFormSchema(t);
    
    const parse = schema.safeParse({
        emailOrCellphone: formData.get('emailOrCellphone'),
        password: formData.get('password')
    });
    if(!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors
        }
    }

    //Fetch data
    const res = await postData('/admin/login', parse.data);
    const json = await res.json();

    if(!res.ok) {
        return { message: 'error', error: json?.message }
    }
    createToken(json.accessToken)
    refreshToken(json.refreshToken)
    return { message: 'success' }
}   