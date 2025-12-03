"use server";

import { revalidatePath } from "next/cache";
import { deleteData, getData, patchData, postData, putData } from "./fetchData";

export interface ProductOption {
  productId: number;
  count: number;
}

export interface InvoiceStep {
  percent: number;
  step: number;
}

// ایجاد پرونده جدید
export async function createOrder(params: {
  userId: number;
  marketerId: number | null;
  marketerShare: number | null;
  productOption: ProductOption[];
  invoices: InvoiceStep[];
}) {
  return (await postData(`/case/create`, params)).statusText;
}

// دریافت تک پرونده
export const getOneCase = async (caseId: number) => {
  return getData(`/case/one/${caseId}`);
};

// ویرایش پرونده (استفاده از PUT منطبق با API)
export async function updateCase(
  caseId: number,
  params: any
) {
  const res = await putData(`/case/update/${caseId}`, params);
  return res.statusText;
}

// حذف پرونده
export async function deleteOrder(state:any, formData:FormData) {
  const caseId = formData.get("id");
  const res = await deleteData(`/case/delete/${caseId}`)
  if(!res.ok) {
    const result = await res.json();
    return { message: 'error', error: result.message }
  }
  return { message: 'success' }
}

// دریافت همه پرونده‌ها (پجینیشن)
export const getAllCases = async (page: number) => {
  return getData(`/case/all?page=${page}`);
};

// ---------------------- Case Details ----------------------
export const getCaseDetails = async (caseId: number) => {
  return getData(`/case/detail/${caseId}`);
};

// ---------------------- Case Products ----------------------
export const getCaseProducts = async () => {
  return getData(`/case/product`);
};

export const getCaseProduct = async (productId: number) => {
  return getData(`/case/product/${productId}`);
};

export const createCaseProduct = async (data: {
  title: string;
  singlePrice: number;
  tax: number;
  discount: number;
}) => {
  return postData(`/case/product/create`, data);
};

export const updateCaseProduct = async (
  productId: number,
  data: {
    title: string;
    singlePrice: number;
    tax: number;
    discount: number;
  }
) => {
  return putData(`/case/product/${productId}`, data);
};

export const translateCaseProduct = async (
  productId: number,
  data: { title: string; lang: string }
) => {
  return postData(`/case/product/${productId}/translate`, data);
};

export const deleteCaseProduct = async (productId: number) =>
  (await deleteData(`/case/product/${productId}`)).ok;

// ---------------------- Case Logs ----------------------
export const getLogs = async (caseId: number) => {
  const res = await getData(`/case/log/${caseId}`);
  return res;
};

// ---------------------- Case Notes ----------------------
export const createCaseNote = async (noteId: number, message: string) => {
  const res = await postData(`/case/note/${noteId}`, { message });
  return res.ok;
};

export const getCaseNotes = async (noteId: number) => {
  return await getData(`/case/note/${noteId}`);
};

export const deleteCaseNotes = async (noteId: number) => {
  return (await deleteData(`/case/note/${noteId}`)).ok;
};

// ----------------------  ----------------------

export const updateFactorCase = async (
  factorId: number,
  params: { status: string; description: string }
) => {
  return (await patchData(`/case/update-status/${factorId}`, params)).ok;
};

// ---------------------- Case Additionals ----------------------
export const getCaseAdditionals = async (caseId: number) => {
  return await getData(`/case/additional/${caseId}`);
};

export const createCaseAdditionals = async (
  caseId: number,
  additionals: { title: string; value: string }
) => {
  return (
    await postData(`/case/additional/${caseId}`, { additionals: [additionals] })
  ).ok;
};

export const deleteCaseAdditional = async (additionalId: number) => {
  return (await deleteData(`/case/additional/${additionalId}`)).ok;
};

export const updateCaseAdditional = async (
  additionalId: number,
  data: { title: string; value: string }
) => {
  return (await putData(`/case/additional/${additionalId}`, data)).ok;
};

export const changeTaskAdmin = async (caseId: number, params: any) => {
  console.log(params, "SSSSSSSSSSSSSSSSSSSSSSSS");

  const res = await patchData(`/case/update/${caseId}`, params);
  return res.ok;
};

// ---------------------- Case Attachments ----------------------

export const getCaseAttach = async (caseId: number) => {
  return await getData(`/case/attachment/${caseId}`);
};

export const createCaseFiles = async (caseId: number, files: any) => {
  const res = await postData(`/case/attachment/${caseId}`, files, true);
  console.log(res);
  return res.ok;
};

export const deleteCaseAttach = async (attachmentId: number) => {
  return (await deleteData(`/case/attachment/${attachmentId}`)).ok;
};

/* Reminder */
export async function getCaseReminders(caseId: number) {
  return getData(`/reminder/${caseId}`);
}

export async function createCaseReminder(
  caseId: number,
  params: {
    title: string;
    description: string;
    time: string;
    sendType: "both" | "email" | "notif";
    doesSendAdmin: boolean;
  }
) {
  const res = await postData(`/reminder/case/${caseId}`, params);
  return res.ok;
}

export async function deleteCaseReminder(reminderId: number) {
  return (await deleteData(`/reminder/${reminderId}`)).ok;
}

export const updateSalary = async (state:any, formData:any) => {
  const personnelId = formData?.id;
  const res = await patchData(`/case/personnel/${personnelId}`, formData);
  if(!res.ok) {
    const result = await res.json();
    return { message: 'error', error: result.message }
  }
  revalidatePath('detail_case')
  return { message: 'success' }
};