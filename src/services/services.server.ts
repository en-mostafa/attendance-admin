// serverActions.ts

"use server";
import { revalidatePath } from "next/cache";
import { getData, postData, putData, deleteData } from "./fetchData";

// GET /case/{productId}
export async function getProduct(productId: number) {
  const data = await getData(`/case/${productId}`);
  return data;
}

// POST /case/product/create
export async function createProduct(state:any, formData:FormData) {
  const data = {
    title: formData.get("title"),
    singlePrice: Number(formData.get("singlePrice")),
    tax: Number(formData.get("tax")),
    discount: Number(formData.get("discount")),
    lyra: Number(formData.get("lyra")),
    dollar: Number(formData.get("dollar"))
  }

  const res = await postData(`/case/product/create`, data)
  if(!res.ok) {
    const result = await res.json();
    return { message: 'error', error: result.message }
  }
  revalidatePath("file")
  return { message: 'success' }
}


// PUT /case/product/{productId}
export async function updateProduct(state:any, formData:FormData) {
  const productId = formData.get("id");
  const data = {
    title: formData.get("title"),
    singlePrice: Number(formData.get("singlePrice")),
    tax: Number(formData.get("tax")),
    discount: Number(formData.get("discount")),
    lyra: Number(formData.get("lyra")),
    dollar: Number(formData.get("dollar"))
  }

  const res = await putData(`/case/product/${productId}`, data)
  if(!res.ok) {
    const result = await res.json();
    return { message: 'error', error: result.message }
  }
  revalidatePath("file")
  return { message: 'success' }
}



// DELETE /case/product/{productId}
export const deleteProduct = async (state:any, formData:FormData) => {
  const productId = formData.get("id");
  const res =  await  deleteData(`/case/product/${productId}`);
  if(!res.ok) {
    const result = await res.json();
    return { message: 'error', error: result.message }
  }
  revalidatePath("file")
  return { message:'success', id: productId }
}
  

// GET /case/product
export async function getProducts() {
  const data = await getData(`/case/product`);
  return data;
}

// POST /case/product/{productId}/translate
export const translateProduct = async (state:any, formData:FormData) => {
  const productId = Number(formData.get("id"));
  const params = {
    title: formData.get('title'),
    lang: formData.get('lang'),
  }
  
  const res = await postData(`/case/product/${productId}/translate`, params);
  if(!res.ok) {
    const result = await res.json();
    return { message: 'error', error: result.message }
  }
  revalidatePath("file")
  return { message:'success', id: productId }
}