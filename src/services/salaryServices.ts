'use server'

import { transferSalarySchema, updateSalarySchema } from "@/lib/schema";
import { postData, putData } from "./fetchData";
import { revalidatePath } from "next/cache";

export const transferSalary = async (state:any, formData:FormData) => {
    const schema = transferSalarySchema();
    const validateFields = schema.safeParse({
        userId: formData.get("userId"),
        amount: formData.get('amount'),
        description: formData.get('description'),
        transformType: formData.get('transformType')
    })
   
    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }
    
    //Fetch data
    const res = await postData('/payment/salary/set', validateFields.data)
    if(!res.ok) {
        return {message: 'error', error: 'error response'}
    }
    revalidatePath('/finance/salary')
    return { message: 'success' }
}

export const updateSalary = async (state:any, formData:FormData) => {
    const id = formData.get("id");
    const schema = updateSalarySchema();
    const validateFields = schema.safeParse({
        amount: formData.get('amount'),
        description: formData.get('description'),
        transformType: formData.get('transformType')
    })
   
    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }
    
    //Fetch data
    const res = await putData(`/payment/salary/update/${id}`, validateFields.data)
    if(!res.ok) {
        return {message: 'error', error: 'error response'}
    }
    revalidatePath('/finance/salary')
    return { message: 'success' }
}