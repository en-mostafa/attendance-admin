"use server";

import { ticketSchema } from "@/lib/schema";
import { getData, patchData, postData } from "./fetchData";

export const getTicketsList = async (page: number = 1) => {
  const res = await getData(`/admin/ticket?page=${page}`);
  return res;
};

export const sendMessageToTicket = async (
  prevState: any,
  formData: FormData
) => {
  //ticketId
  const ticketId = formData.get("ticketId");
  const text = formData.get("text") as string;

  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      value.name === "undefined" && formData.delete("files");
    }
  }

  const errors: Record<string, string> = {};

  if (!text || text.trim() === "") {
    errors.text = "متن پیام الزامی است.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, data: null };
  }

  formData.delete("ticketId");

  const res = await postData(`/admin/ticket/${ticketId}/send`, formData, true);
  const data = await res.json();
  console.log("$$$$$$$$$$$$$$$$$$$$$$", data);
  return { success: true, data };
};

export const getMessageForTicket = async (
  ticketId: number,
  page: number = 1,
  limit: number = 300
) => {
  const res = await getData(
    `/admin/ticket/${ticketId}?page=${page}&limit=${limit}`
  );
  return res;
};

export const editTicket = async (
  ticketId: number,
  status: string = "under_review"
) => {
  const res = await patchData(`/admin/ticket/${ticketId}`, { status });
  console.log("________________________________________________", res);
  return res.ok;
};

/* Form Action */

export async function createNewTicketForm(state: any, formData: FormData) {
  const formObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    if (key !== "files") {
      formObject[key] = value;
    }
  });

  const userId = formData.get("userId");

  const files = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File);

  const parse = ticketSchema().safeParse({ ...formObject, files });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
    };
  }

  formData.delete("userId");
  const res = await postData(`/admin/ticket?userId=${userId}`, formData, true);
  console.log("MMMMMMMMMMMMMMMMMMMMM", await res.json());

  if (!res.ok) {
    const data = await res.json();
    return { message: "error", error: data };
  }

  return { message: "success" };
}
