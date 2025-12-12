'use server'

import { getData } from "./fetchData";

export const getTransactions = async (params: string) => {
    try {
        const { data } = await getData(`/transaction/index?${params}`);
        return data
    } catch (error) {
        console.log(error)
    }
}