'use server'

import { getData, postData } from "./fetchData";

export const getSalary = async (params: string) => {
    try {
        const { data } = await getData(`/salary/index?${params}`);
        return data
    } catch (error) {
        console.log(error)
    }
}

export const paymentSalary = async (state: any, formData: FormData) => {
    try {
        const res = await postData(`/salary/payment`, formData, true);
        if (res.ok) {
            return { success: true }
        }
    } catch (error) {
        console.log(error)
    }
}