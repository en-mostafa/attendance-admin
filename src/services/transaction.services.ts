'use server'

import { getData } from "./fetchData";

export const getTransactions = async (param: string) => {
    try {
        const { data } = await getData(`/transaction/index?date=${param}`);
        return data
    } catch (error) {
        console.log(error)
    }
}