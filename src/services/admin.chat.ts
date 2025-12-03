"use server";

import { getData, postData } from "./fetchData";

export const apiCallGetUserChats = async () => {
  return await getData(`/admin/chats?limit=100`);
};

export const apiCallGetMessages = async (userId: number, page: number = 1) => {
  const res = await getData(
    `/admin/chats/single?userId=${userId}&page=${page}&limit=11110`
  );
  return res;
};

export const sendMessageToAdmin = async (
  prevState: any,
  formData: FormData
) => {
  const text = formData.get("text") as string;
  const receiverId = formData.get("receiverId") as string;

  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      value.name === "undefined" && formData.delete("files")
    }
  }

  const errors: Record<string, string> = {};

  if (!text || text.trim() === "") {
    errors.text = "متن پیام الزامی است.";
  }

  if (!receiverId) {
    errors.receiverId = "شناسه کاربر الزامی است.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, data: null };
  }  

  // ارسال به سرور با postData
  const res = await postData(`/admin/chats/send`, formData, true);
  const data = await res.json();
  console.log("$$$$$$$$$$$$$$$$$$$$$$", data);

  return { success: true, data };
};

export const apiCallSendMessages = async (
  text: string = "",
  receiverId: number,
  files: File[]
) => {
  const res = await postData("/admin/chats/send", { receiverId, text });
  return res;
};
