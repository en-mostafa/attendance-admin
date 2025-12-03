"use server";

import { getData } from "./fetchData";

export const getAllAdmin = async () => {
  const res = await getData("/admin/manager/retrive-admins");
  return await res?.data;
};

export const getMarketerLists = async () => {
  const res = await getData("/admin/marketer");
  return await res
};

export const getRoles = async () => {
  return await getData("/admin/access")
}

export const getAdminByDep = async (roleId: number) => {
  return await getData(`/admin/role/${roleId}`)
}