'use server'

import { addTourSchema, translateTourSchema } from "@/lib/schema"
import { getToken } from "./token";
import { getLocale } from "next-intl/server";
import { deleteData, patchData, postData } from "./fetchData";
import { revalidatePath } from "next/cache";

export const addTourForm = async (state:any, formData: FormData) => {
    const token = await getToken();
    const locale = await getLocale();

    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = addTourSchema();
    const parse = schema.safeParse(formObject);


    if(!parse.success) {
        return  {
            errors : parse.error.flatten().fieldErrors
        }
    }
    
    //Fetch data
    const result = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + '/tour', {
        method: "POST",
        headers: {
            lang: locale,
            Authorization: `Bearer ${token?.value}`
        },
        body: formData
    })
    if(!result.ok) {
        const data = await result.json()
        return { message: 'error', error: data }
    }
    return { message: 'success' }
}

export const editTourForm = async (state:any, formData: FormData) => {
    const token = await getToken();
    const locale = await getLocale();

    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = addTourSchema();
    const parse = schema.safeParse(formObject);


    if(!parse.success) {
        return  {
            errors : parse.error.flatten().fieldErrors
        }
    }
    
    //Fetch data
    const result = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + `/tour/${formData.get('id')}`, {
        method: "PUT",
        headers: {
            lang: locale,
            Authorization: `Bearer ${token?.value}`
        },
        body: formData
    })
    if(!result.ok) {
        return { message: 'error' }
    }
    return { message: 'success' }
}

export const translateTourForm = async (state:any, formData: FormData) => {
    const id = formData.get('id');
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = translateTourSchema();
    const parse = schema.safeParse(formObject);


    if(!parse.success) {
        return  {
            errors : parse.error.flatten().fieldErrors
        }
    }
    
    //Fetch data
    const res = await postData(`/tour/${id}/translatation`, parse.data)
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const deletedTour = async (state:any, formData:FormData) => {
    const id = formData.get('id');

    //Fetch data
    try {
        await deleteData(`/tour/${id}`);
        return { messgae: 'success' }
    } catch (e) {
        return { message: 'error' }
    }
}

export const reservedTour = async (state: any, formData:FormData) => {
    const id = formData.get("id");

    const data = {
        options: {
            optionOne: formData.get('startTime'),
            optionTwo: formData.get('startLocation'),
            optionThree: formData.get('description')
        },
        status: formData.get('status'),
        rejectReason: formData.get("reject")
    }
    const res = await patchData(`/payment/product/tour/${id}`, data);
   if(!res.ok) {
        const data = await res.json();
        return {message: 'error', error: data?.message}
   }
   revalidatePath("hotel/book")
   return { message: "success" }
}