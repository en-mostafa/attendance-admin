import { getToken } from "@/services/token";
import { useLocale } from "next-intl";
import useSWRInfinite from "swr/infinite"

export default function useSwrInfinite(url:string) {
    const locale = useLocale();

    const fetchData = async (url:any) => {
        const token = await getToken();
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                lang: locale,
                Authorization: `Bearer ${token?.value}`
            }
        })
        return res.json()
    }
    const { data, size, setSize, isLoading, mutate } = useSWRInfinite((index) => `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${url}page=${index + 1}&limit=12`, fetchData)
 
    return {data , size, setSize, isLoading, mutate }
}