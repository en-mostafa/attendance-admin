import { getToken } from "@/services/token";
import { useLocale } from "next-intl";
import useSWR from "swr";

export default function useSwrRevalidate(url:string) {
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

    const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${url}`, fetchData, { refreshInterval: 1000 })

    return { data, error, isLoading, mutate }
}