'use server'

import { patchData, postData } from "./fetchData"

export const addOff = async (state:any, formData: any) => {

    if(!formData.startDate && !formData.endDate) {
        return {
            message: 'error'
        }
    }
    
    //Fetch Data
    const res = await postData('/attendance/leave', formData)
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.messaeg }
    }
    return { message: 'success' }
}

export const editStatus = async(state:any, formData:FormData) => {
    const id = formData.get("id");
    const status = formData.get("status");
    const res = await patchData(`/attendance/leave/${id}`, {status});
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.messaeg }
    }
    return { message: 'success' }
}