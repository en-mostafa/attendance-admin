'use server'

import { addAdminSchema, updateAdminSchema, updateProfileAdminSchema } from "@/lib/schema";
import { deleteData, patchData, postData, putData } from "./fetchData";
import { getLocale } from "next-intl/server";
import { getToken } from "./token";
import { revalidatePath } from "next/cache";

export const addAdmin = async (state: any, formData: FormData) => {
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = addAdminSchema();
    const parse = schema.safeParse(formObject);

    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors
        }
    }

    const res = await postData(`/admin/manager`, parse.data);
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}
export const updateAdmin = async (state: any, formData: FormData) => {
    const locale = await getLocale();
    const token = await getToken();
    const id = formData.get('id');

    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = updateAdminSchema();
    const parse = schema.safeParse(formObject);

    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors
        }
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + `/admin/manager/${id}`, {
        method: "PUT",
        headers: {
            lang: locale,
            Authorization: `Bearer ${token?.value}`,
        },
        body: formData
    })

    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const updateProfileAdmin = async (state: any, formData: FormData) => {
    const locale = await getLocale();
    const token = await getToken();

    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = updateProfileAdminSchema();
    const parse = schema.safeParse(formObject);

    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors
        }
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + `/profile`, {
        method: "PUT",
        headers: {
            lang: locale,
            Authorization: `Bearer ${token?.value}`,
        },
        body: formData
    })

    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const adminStatus = async (state: any, formData: any) => {
    if (formData.status) {
        const res = await deleteData(`/admin/manager/delete/${formData.id}`);
        if (!res.ok) {
            return { message: 'enable' }
        }
    } else {
        const res = await patchData(`/admin/manager/admin/${formData.id}/enable`, formData);
        if (!res.ok) {
            return { message: 'unable' }
        }
    }
}
export const addWorkShift = async (state: any, formData: any) => {
    //fetch data
    const res = await postData('/shift/create', formData)
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    revalidatePath('/admin/work_shift')
    return { message: 'success' }
}

export const updateWorkShift = async (state: any, formData: any) => {
    //fetch data
    const res = await putData(`/attendance/shift/${formData.id}`, formData)
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    revalidatePath('/admin/work_shift')
    return { message: 'success' }
}

export const deletedShift = async (state: any, formData: FormData) => {
    const id = formData.get('id');
    //Fetch data
    const res = await deleteData(`/attendance/shift/${id}`);
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    revalidatePath('/admin/work_shift')
    return { messgae: 'success' }
}

export const updateAttendance = async (state: any, formData: FormData) => {
    const data = {
        id: formData.get('id'),
        status: formData.get('status')
    }

    //Fetch data
    const res = await putData(`/attendance/update`, data);
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}