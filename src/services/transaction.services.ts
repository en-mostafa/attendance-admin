'use server'

import { getData } from "./fetchData";

export const getTransactions = async () => {
    try {
        const { data } = await getData(`/transaction/index`);
        return data
    } catch (error) {
        console.log(error)
    }
}