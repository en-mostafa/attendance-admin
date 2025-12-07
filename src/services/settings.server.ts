"use server";

import { revalidatePath } from "next/cache";
import { deleteData, getData, postData } from "./fetchData";

// گرفتن لیست IPها
export const getIps = async () => {
  return await getData("/attendance/ip");
};

// تعریف لیست IP جدید
export const defineIps = async (state: any, data: any) => {
  const res = await postData("/ip/create", data);
  if (!res.ok) {
    const result = await res.json()
    return { message: 'error', error: result.message }
  }
  revalidatePath('setting/ip')
  return { message: 'success' }
};

// حذف یک IP با استفاده از ipId
export const deleteIp = async (state: any, formData: FormData) => {
  const ipId = formData.get("id");
  const res = await deleteData(`/attendance/ip/${ipId}`);
  if (!res.ok) {
    const result = await res.json()
    return { message: 'error', error: result.message }
  }
  revalidatePath('setting/ip')
  return { message: 'success' }
};


// گرفتن کارت های بانکی
export const getCardsList = async () => {
  return await getData("/payment/card/show");
};

export const createNewCard = async (params: {
  firstName: string;
  lastName: string;
  bankName: string;
  cardNumber: string;
  accountNumber: string;
  ibanNumber: string;
  ibanSimbol: string;
}) => {
  return (await postData("/payment/card", params)).statusText;
};

export const deleteCard = async (cardId: number) => {
  const res = await deleteData(`/payment/card/${cardId}`);
  return res.statusText;
};
