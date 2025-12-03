"use server";

import { revalidatePath } from "next/cache";
import { deleteData, getData, patchData, postData } from "./fetchData";

export const notifRemind = async (
  description: string,
  reminderTime: string
) => {
  const res = await postData("/notification/remind", {
    description,
    reminderTime,
  });
  return res;
};

export const getNotifs = async () => await getData("/notification/all");
export const getAlram = async () => await getData("/alrams/all");

export const getUserNotifs = async () => await getData("/notification");

export const notifRead = async (notidicationId: number) => {
  return (await patchData(`/notification/${notidicationId}/read`, null)).ok;
};

export const sendNotifToUsers = async (params: any) => {
  (await postData("/notification/notif", params)).ok;
};

export const sendEmail = async (
  title: string,
  description: string,
  email: string
) => {
  return (
    await postData("/notification/send-email", { title, description, email })
  ).ok;
};

export const sendAlarmToUsers = async (state:any, data:any) => {
  const res = await postData('/reminder', data);
  if(!res.ok) return { message: 'error' }
  revalidatePath('notif/alarm')
  return { message: 'success' }
};

export const deleteAlarmToUsers = async (state:any, formatData:FormData) => {
  const id = formatData.get("id");
  const res = await deleteData(`/reminder/${id}`);
  if(!res.ok) return { message: 'error' }
  revalidatePath('notif/alarm')
  return { message: 'success' }
};

export const updateAlarm = async (state:any, data:any) => {
  const isRead = data.isRead;
  await patchData(`/reminder/${data.id}`, {isRead});
}