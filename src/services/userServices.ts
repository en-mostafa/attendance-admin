'use server'
import { addUserSchema, } from "@/lib/schema"
import { getData, postData, putData } from "./fetchData";
import { error } from "console";
import { revalidatePath } from "next/cache";

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
        shiftId: formData.get("shiftId"),
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

export const getLeaves = async () => {
    try {
        const { data } = await getData("/user/leaves");
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateLeaves = async (state: any, formData: any) => {
    try {
        const res = await putData("/user/leave", formData);
        if (res.ok) {
            revalidatePath("/users/leave");
            return { success: true }
        }
    } catch (error) {
        console.log(error)
    }
}

export const userInfo = async (id: string) => {
    try {
        const { data } = await getData(`/user/info?id=${id}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (state: any, formData: FormData) => {
    const datas = {
        id: Number(formData.get("id")),
        name: formData.get('name'),
        family: formData.get('family'),
        phone: formData.get('phone'),
        nationalCode: formData.get("nationalCode"),
        baseSalary: Number(formData.get('baseSalary')),
        emergencyPhone: formData.get("emergencyPhone"),
        insurance: formData.get("insurance"),
        address: formData.get("address"),
        shiftId: Number(formData.get("shiftId")),
        status: formData.get("status"),
        password: formData.get('password'),
    }
    try {
        const res = await putData("/user/update-user", datas);
        if (res.ok) {
            return { success: true }
        }
    } catch (error) {
        console.log(error)
    }
}