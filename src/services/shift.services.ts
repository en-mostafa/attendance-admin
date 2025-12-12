'use server'

import { revalidatePath } from "next/cache"
import { deleteData, patchData, postData, putData } from "./fetchData"


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
    const id = formData.id;
    const datas = formData;
    delete datas.id;

    const res = await putData(`/shift/update?id=${id}`, datas);
    console.log(datas)
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const deletedShift = async (state: any, formData: FormData) => {
    const id = formData.get('id');
    //Fetch data
    const res = await deleteData(`/shift/${id}`);
    console.log(res)
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { success: true }
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