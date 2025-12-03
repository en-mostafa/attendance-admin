"use server";

import { getData } from "./fetchData";

export const getUsers = async () => {
  const res = await getData(`/admin/account/retrive-clients?limit=100000`);
  return res?.data;
};

export const getAdminUsers = async (page: number = 1) => {
  const res = await getData(`/admin/account/retrive?page=${page}`);
  return res?.data;
};
