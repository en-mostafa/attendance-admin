"use server";

import { revalidatePath } from "next/cache";
import { deleteData, getData, patchData, postData } from "./fetchData";

export const addTask = async (state:any, data:any) => {
  const res = await postData("/task", data);
  if(!res.ok) return { message: 'error' };
  return { message: 'success' };
};

export const updateStatusTask = async (state:any, data:any) => {
  const status = data.status
  const res = await patchData(`/task/task/${data.id}`, {status});
  if(!res.ok) return { message: 'error' };
  return { message: 'success' };
}

export const deleteTask = async (state:any, formData:FormData) => {
  const id = formData.get("id")
  const res = await deleteData(`/task/task/${id}`);
  if(!res.ok) return { message: 'error' };
  revalidatePath('/task/tasks');
  return { message: 'success' };
}

export const addMessageTask = async (state:any, formData: FormData) => {
  const id = formData.get('id');
  const description = formData.get("description");
  const res = await postData(`/task/task-message/${id}`, {description});
  if(!res.ok) return { message: 'error' };
  revalidatePath('/task/user');
  return { message: 'success' };
}

export const getTasks = async () => await getData(`/task/task`);
export const getUserTask = async () => await getData(`/task/user/task`);
export const getAdmins = async () => getData('/admin/manager/retrive-admins?page=1&limit=10000')
