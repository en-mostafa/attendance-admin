"use server";

import { getData } from "./fetchData";

// جستجوی پرونده با فیلترهای مختلف و پجینیشن
export const searchCases = async (params: any) => {
  const query = new URLSearchParams();

  if (params.caseId) query.append("caseId", params.caseId.toString());
  if (params.userId) query.append("userId", params.userId.toString());
  if (params.asignerId) query.append("asignerId", params.asignerId.toString());
  if (params.cellphone) query.append("cellphone", params.cellphone.toString());
  if (params.productId) query.append("productId", params.productId.toString());
  if (params.status) query.append("status", params.status);
  if (params.createdAt) query.append("createdAt", params.createdAt);
  query.append("page", params.page.toString());

  return await getData(`/search/case?${query.toString()}`);
};

export const searchTickets = async (params: any) => {
  const query = new URLSearchParams();

  if (params.userId) query.append("userId", params.userId.toString());
  if (params.department) query.append("department", params.department.toString());
  if (params.ticketId) query.append("ticketId", params.ticketId.toString());
  if (params.productId) query.append("productId", params.productId.toString());
  if (params.status) query.append("status", params.status);
  if (params.createdAt) query.append("createdAt", params.createdAt);
  query.append("page", params.page.toString());

  return await getData(`/search/ticket?${query.toString()}`);
};

export const searchUsers = async (params: any) => {
  const query = new URLSearchParams();

  if (params.status) query.append("status", params.status.toString());
  if (params.email) query.append("email", params.email.toString());
  if (params.cellphone) query.append("cellphone", params.cellphone.toString());
  if (params.userId) query.append("userId", params.userId);
  if (params.isLegal) query.append("isLegal", params.isLegal);
  if (params.marketer) query.append("marketer", params.marketer);
  if (params.gender) query.append("gender", params.gender);
  if (params.categoryId) query.append("categoryId", params.categoryId);
  if (params.nationlCode) query.append("nationlCode", params.nationlCode);
  query.append("page", params.page.toString());

  return await getData(`/search/client-table?${query.toString()}`);
};

// دریافت اطلاعات یک تیکت با استفاده از ticketId
export const getTicketById = async (ticketId: number) => {
  return await getData(`/search/ticket/${ticketId}`);
};

export const getCategoriesUser = async () => {
  return await getData("/account/category");
};
