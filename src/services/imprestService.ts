"use server";

import { getData, postData, patchData, deleteData } from "./fetchData";

// نوع داده‌ای برای یک مساعده
export interface Imprest {
  id: number;
  description: string;
  price: number;
  status: "Pending" | "Approved" | "Rejected";
  rejectReason?: string;
  createdAt: string
}

// 📌 ایجاد درخواست مساعده
export const createImprest = async (params: {
  description: string;
  price: number;
}) => {
  return (await postData("/imprest", params)).statusText;
};

// 📌 دریافت همه درخواست‌های مساعده
export const getAllImprests = async () => {
  return await getData("/imprest/all");
};

export const getImprests = async () => {
  return await getData("/imprest");
};

// 📌 به‌روزرسانی وضعیت مساعده (مثلاً تأیید یا رد)
export const updateImprestStatus = async (
  imprestId: number,
  params: { status: "Pending" | "Confirmed" | "rejected"; rejectReason?: string }
) => {
  return (await patchData(`/imprest/${imprestId}`, params)).ok;
};

// 📌 حذف یک مساعده
export const deleteImprest = async (imprestId: number) => {
  return (await deleteData(`/imprest/${imprestId}`)).ok;
};
