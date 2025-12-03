"use server"

import { deleteData, getData, postData } from "./fetchData"

export const sendFeeds = async (data: any) => {
   const res = await postData("/suggestion/leave", data)
   return res.ok
}

export const getFeeds = async () => {
    return await getData("/suggestion")
}

export const deleteFeeds = async (suggestionId: any) => {
   const res = await deleteData(`/suggestion/${suggestionId}`)
   return res.ok
}