import { getToken } from "@/services/token";
import useSWR from "swr";

export default function useSwr(url: string) {

    const fetchData = async (url: any) => {
        const token = await getToken();
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token?.value}`
            }
        })
        return res.json()
    }

    const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${"/api/admin" + url}`, fetchData)

    return { data, error, isLoading, mutate }
}