'use server'
import { addLegalSchema, addUserSchema, updateUserSchema } from "@/lib/schema"
import { deleteData, getData, patchData, postData, putData } from "./fetchData";
import { createTokenClient } from "./token";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

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
    console.log(parse.data)
    //Fetch data
    const res = await postData('/user/create', parse.data);
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const updateUser = async (state: any, formData: FormData) => {
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = updateUserSchema();
    const parse = schema.safeParse(formObject);

    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors
        }
    }

    const datas = {
        id: formData.get('id'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        level: formData.get("level"),
        displayName: formData.get('displayName'),
        birthDate: formData.get('birthDate'),
        nationalCode: formData.get('nationalCode'),
        gender: formData.get('gender'),
        file: formData.get('file'),
        categoryId: formData.get('categoryId'),
        email: formData.get('email'),
        cellphone: formData.get('cellphone'),
        address: {
            country: formData.get('country'),
            city: formData.get('city'),
            address: formData.get('address'),
            postCode: formData.get('postCode')
        },
        passportDetails: {
            firstName: formData.get('firstNamePassport'),
            lastName: formData.get('lastNamePassport'),
            issuingCountry: formData.get('issuingCountry'),
            nationality: formData.get('nationality'),
            passportNumber: formData.get('passportNumber'),
            expiryDate: formData.get('expiryDate')
        }
    }


    const res = await putData(`/admin/account/cient/${datas.id}`, datas);
    if (!res.ok) {
        const data = await res.json();
        console.log(data)
        return { messgae: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const userStatus = async (state: any, formData: any) => {
    if (formData.status) {
        const res = await deleteData(`/admin/account/delete/${formData.id}`);
        if (!res.ok) {
            return { message: 'enable' }
        }
    } else {
        const res = await patchData(`/admin/account/cient/${formData.id}/enable`, formData);
        if (!res.ok) {
            return { message: 'unable' }
        }
    }
}

export const marketerStatus = async (state: any, formData: any) => {
    if (formData.status) {
        const res = await patchData(`/admin/${formData.id}/downgrade/marketer`, formData);
        if (!res.ok) {
            return { message: 'enable' }
        }
    } else {
        const res = await patchData(`/admin/${formData.id}/upgrade/marketer`, formData);
        if (!res.ok) {
            return { message: 'unable' }
        }
    }
}

export const loginAccount = async (state: any, userId: any) => {
    const locale = await getLocale();
    const res = await postData(`/admin/account/login/${userId}`, { userId });
    if (!res.ok) {
        return { message: 'error' }
    }
    const data = await res.json()
    createTokenClient(data.accessToken)
    redirect(`https://${process.env.NEXT_PUBLIC_USERPANEL_URL}/${locale}/dashboard` as any)
}

export const addCategory = async (state: any, formData: FormData) => {
    const data = {
        name: formData.get('name'),
    }
    if (!data.name) {
        return {
            message: 'validation'
        }
    }

    //fetch data
    const res = await postData('/account/category', data)
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    revalidatePath('/admin/access')
    return { message: 'success' }
}

export const updateCategory = async (state: any, formData: FormData) => {
    const data = {
        name: formData.get('name'),
        id: formData.get("id")
    }
    if (!data.name) {
        return {
            message: 'validation'
        }
    }

    //fetch data
    const res = await putData(`/account/category/${data.id}`, data)
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    revalidatePath('users/category')
    return { message: 'success' }
}

export const deletedCategory = async (state: any, formData: FormData) => {
    const categoryId = formData.get('categoryId');

    //Fetch data
    const res = await deleteData(`/account/category/${categoryId}`)
    if (!res.ok) {
        const data = await res.json();
        return { message: 'error', data: data }
    }
    revalidatePath('users/category')
}

export const addLegal = async (state: any, formData: FormData) => {
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = addLegalSchema();
    const parse = schema.safeParse(formObject);

    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors
        }
    }

    const legal = formData.get("isLegal");
    const id = formData.get("id");
    const data = {
        legal: {
            companyName: formData.get('companyName'),
            addressCompany: formData.get("addressCompany"),
            registrationNumber: formData.get("registrationNumber"),
            nationalNumber: formData.get("nationalNumber"),
            economicCode: formData.get("economicCode"),
            postCode: formData.get("postCode")
        },
        isLegal: legal ? true : false
    }

    const res = await patchData(`/account/company-info/${id}`, data)
    if (!res.ok) {
        return { message: 'error' }
    }
    revalidatePath('users')
    return { message: 'success' }
}

export const addTransaction = async (state: any, formData: FormData) => {
    const id = formData.get("id");
    const amount = formData.get("amount");
    const res = await postData(`/payment/salary/marketer-salary/set/${id}`, { amount })
    if (!res.ok) return { message: 'error' }
    return { message: 'success' }
}
export const editTransaction = async (state: any, formData: FormData) => {
    const id = formData.get("id");
    const amount = formData.get("amount");
    const res = await putData(`/payment/salary/marketer-salary/update/${id}`, { amount })
    if (!res.ok) return { message: 'error' }
    return { message: 'success' }
}

export const getAllCategory = async () => await getData('/account/category')
export const getTrsnsactionMarketer = async (id: string) => await getData(`/payment/slalary/marketer-salary/${id}`)