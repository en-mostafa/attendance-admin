"use server";
import { getLocale } from "next-intl/server";
import { getToken } from "./token";

//POST DATA
export async function postData(
  url: string,
  params: any,
  isFormData: boolean = false
) {
  const token = await getToken();
  const locale = await getLocale();

  const response = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + "/api/admin" + url, {
    method: "POST",
    headers: {
      ...(isFormData
        ? { lang: locale, Authorization: `Bearer ${token?.value}` }
        : {
          "Content-Type": "application/json",
          lang: locale,
          Authorization: `Bearer ${token?.value}`,
        }),
    },
    body: !isFormData ? JSON.stringify(params) : params,
  });
  return response;
}

//PATCH DATA
export async function patchData(url: string, params: any) {
  const token = await getToken();
  const locale = await getLocale();

  const response = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + url, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      lang: locale,
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify(params),
  });
  return response;
}

//PUT DATA
export async function putData(url: string, params: any) {
  const token = await getToken();
  const locale = await getLocale();

  const response = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + url, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      lang: locale,
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify(params),
  });
  return response;
}

//GET DATA
export async function getData(url: string) {
  const token = await getToken();
  const locale = await getLocale();

  const res = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token?.value}`, lang: locale },
  });
  const data = await res.json();
  return data;
}

//DELETE DATA
export async function deleteData(url: string) {
  const token = await getToken();
  const locale = await getLocale();

  const response = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + url, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      lang: locale,
      Authorization: `Bearer ${token?.value}`,
    },
  });
  return response;
}
