'use server'

import { expenseseAddSchema } from "@/lib/schema";
import { postData } from "./fetchData";
import { revalidatePath } from "next/cache";
import { getToken } from "./token";
import { getLocale } from "next-intl/server";

export const addExpensese = async (state:any, data:FormData) => {
    const schema = expenseseAddSchema();
    const formData = new FormData();

    const validateFields = schema.safeParse({
        amount: data.get('amount'),
        textId: data.get("textId"),
        paiedAt: data.get("paiedAt"),
        file: data.get('file'),
        description: data.get('description'),
    })
    
    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    formData.append('amount', String(validateFields.data?.amount))
    formData.append('textId', validateFields.data?.textId)
    formData.append('paiedAt', validateFields.data?.paiedAt)
    formData.append('description', validateFields.data?.description)
    formData.append('file', validateFields.data?.file)
   

    //Fetch data
    const res = await postData('/payment/expenses/set', formData, true);
    if(!res.ok) {
        const data = await res.json();
        return {message: 'error', error: data?.message}
    }
    revalidatePath('/finance/expenses')
    return { message: 'success' }
}

export const updateExpensese = async (state:any, data:FormData) => {
    const token = await getToken();
    const locale = await getLocale();
    const schema = expenseseAddSchema();
    const formData = new FormData();
    const id = data.get('id');

    const validateFields = schema.safeParse({
        amount: data.get('amount'),
        textId: data.get("textId"),
        paiedAt: data.get("paiedAt"),
        file: data.get('file'),
        description: data.get('description'),
    })
    
    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    formData.append('amount', String(validateFields.data?.amount))
    formData.append('textId', validateFields.data?.textId)
    formData.append('paiedAt', validateFields.data?.paiedAt)
    formData.append('description', validateFields.data?.description)
    formData.append('file', validateFields.data?.file)
   

    //Fetch data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/payment/expense/update/${id}`, {
        method: "PUT",
        headers: {
            lang: locale,
            Authorization: `Bearer ${token?.value}`,
        },
        body: formData,
    })
    if(!res.ok) {
        const data = await res.json();
        return {message: 'error', error: data?.message}
    }
    revalidatePath('/finance/expenses')
    return { message: 'success' }
}