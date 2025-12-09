'use server'
import { addUserSchema, } from "@/lib/schema"
import { getData, postData } from "./fetchData";
import { error } from "console";

export const addUser = async (state: any, formData: FormData) => {
    const schema = addUserSchema();
    const parse = schema.safeParse({
        name: formData.get('name'),
        family: formData.get('family'),
        password: formData.get('password'),
        phone: formData.get('phone'),
        nationalCode: formData.get("nationalCode"),
        baseSalary: formData.get('baseSalary'),
        emergencyPhone: formData.get("emergencyPhone"),
        insurance: formData.get("insurance"),
        address: formData.get("address"),
        shiftId: formData.get("shiftId")
    });


    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors
        }
    }
    //Fetch data
    const res = await postData('/user/create', parse.data);
    if (!res.ok) {
        const data = await res.json();
        console.log("res", error)
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const getUsers = async () => {
    try {
        const { data } = await getData("/user/index");
        return data
    } catch (error) {
        console.log(error)
    }
} 
