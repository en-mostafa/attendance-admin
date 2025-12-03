'use server'

import { translateAccessSchema, translateTourSchema } from "@/lib/schema"
import { deleteData, postData, putData } from "./fetchData"
import { revalidatePath } from "next/cache"

export const addAccess = async (state:any, formData:FormData) => {
    const data = {
        name : formData.get('name'),
        permissions: formData.getAll('permissions')
    } 
    if (!data.name) {
        return {
            message : 'validation'
        }
    }

    //fetch data
    const res = await postData('/admin/access', data)
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    revalidatePath('/admin/access')
    return { message: 'success' }
}
export const updateAccess = async (state:any, formData:FormData) => {
    const data = {
        id : formData.get('id'),
        name : formData.get('name'),
        permissions: formData.getAll('permissions')
    } 
    if (!data.name) {
        return {
            message : 'validation'
        }
    }

    //fetch data
    const res = await putData(`/admin/access/${data.id}`, data);
    
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    revalidatePath('/admin/access')
    return { message: 'success' }
}


export const deletedAccess = async (state:any, formData:FormData) => {
    const accessId = formData.get('accessId');

    //Fetch data
    const res = await deleteData(`/admin/access/${accessId}`)
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', data: data }
    }
    revalidatePath('admin/access')
}

export const translateAccess = async (state:any, formData: FormData) => {
    const id = formData.get('id');
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = translateAccessSchema();
    const parse = schema.safeParse(formObject);


    if(!parse.success) {
        return  {
            errors : parse.error.flatten().fieldErrors
        }
    }

    //Fetch data
    const res = await postData(`/admin/access/${id}/translate`, parse.data)
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}