'use server'

import { addWalletSchema, expenseseAddSchema } from "@/lib/schema";
import { postData } from "./fetchData";
import { revalidatePath } from "next/cache";

export const addWallet = async (state:any, formData:FormData) => {
    const schema = addWalletSchema();
    const validateFields = schema.safeParse({
        amount: formData.get('amount'),
        transformType: formData.get('transformType'),
        description: formData.get('description'),
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors as any
        }
    }
    
    //Fetch data
    const res = await postData('/payment/treasurys/set', validateFields.data)
    if(!res.ok) {
        return {message: 'error', error: 'error response'}
    }
    revalidatePath('/finance/wallet')
    return { message: 'success' }
}