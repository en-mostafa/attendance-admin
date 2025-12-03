'use server'

import { addHotelFormSchema, editHotelRoomSchema, translateHotelRoomSchema, translateHotelSchema } from "@/lib/schema"
import { getToken } from "./token"
import { getLocale } from "next-intl/server";
import { deleteData, postData, putData } from "./fetchData";


export const addHotelForm = async (state:any, formData: FormData) => {
    const token = await getToken();
    const locale = await getLocale();

    const formObject: Record<string, any> = {}
    formData.forEach((value, key) => {
        formObject[key] = value
    })
    const schema = addHotelFormSchema();
    const parse = schema.safeParse(formObject);

    if(!parse.success) {
        return {
            errors : parse.error.flatten().fieldErrors
        }
    }

    //Fetch data
    const res = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + '/hotel', {
        method: "POST",
        headers: {
            lang: locale,
            Authorization: `Bearer ${token?.value}`
        },
        body: formData
    })
 
 

    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }

}

export const deletedHotel = async (state:any, formData:FormData) => {
    const id = formData.get('id');

    //Fetch data
    try {
        await deleteData(`/hotel/${id}`);
        
        return { messgae: 'success' }
    } catch (e) {
        return { message: 'error' }
    }
}

export const updateHotelForm = async (state:any, formData: FormData) => {
    const token = await getToken();
    const locale = await getLocale();
    const id = formData.get('id');

    const formObject: Record<string, any> = {}
    formData.forEach((value, key) => {
        formObject[key] = value
    })
    const schema = addHotelFormSchema();
    const parse = schema.safeParse(formObject);

    if(!parse.success) {
        return {
            errors : parse.error.flatten().fieldErrors
        }
    }

    console.log('hotel update' , formData)

    //Fetch data
    const res = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + `/hotel/${id}`, {
        method: "PUT",
        headers: {
            lang: locale,
            Authorization: `Bearer ${token?.value}`
        },
        body: formData
    })
    
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }

}

export const translateHotelForm = async (state:any, formData: FormData) => {
    const id = formData.get('id');
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = translateHotelSchema();
    const parse = schema.safeParse(formObject);


    if(!parse.success) {
        return  {
            errors : parse.error.flatten().fieldErrors
        }
    }
    
    //Fetch data
    const res = await postData(`/hotel/${id}/translatation`, formObject);
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const translateRoom = async (state:any, formData:FormData) => {
    const id = formData.get('id');
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = translateHotelRoomSchema();
    const parse = schema.safeParse(formObject);
    if(!parse.success) {
        return  {
            errors : parse.error.flatten().fieldErrors
        }
    }
  
    //Fetch data
    const res = await postData(`/hotel/${id}/room-translatation`, parse.data)
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
}

export const editRoom = async (state:any, formData:FormData) => {
    const id = formData.get('id');
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const schema = editHotelRoomSchema();
    const parse = schema.safeParse(formObject);

    if(!parse.success) {
        return  {
            errors : parse.error.flatten().fieldErrors
        }
    }

    //Fetch data
    const res = await putData(`/hotel/${id}/update-room`, parse.data)
    if(!res.ok) {
        const data = await res.json();
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }
} 

export const addRoomHotelForm = async (state:any, data:any) => {
    //Fetch data
    const rooms = data.rooms
    const res = await postData(`/hotel/${data.id}/add-room`, {rooms})
    const result = await res.json();
    if(!res.ok) {
        return { message: 'error', error: data.message }
    }
    return { message: 'success' }

}