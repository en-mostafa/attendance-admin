'use client'

import { getToken } from "@/services/token";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export const useInfinitScroll = (url: string) => {
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const locale = useLocale();


    const fetchData = async () => {
        const token = await getToken();
        try {
            setIsloading(true)
            const res = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + url, { method: 'GET', headers: { Authorization: `Bearer ${token?.value}`, lang:locale } });
            const data = await res.json();
            if (res.status === 200) {
                setItems([...items].concat(data?.data))
                setIsloading(false);
            }
            setIsloading(false)
        } catch (error) {
            setIsloading(false);
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [url])

    const mutate = (id: string) => {
        const newItem = items.filter(item => item.id !== id)
        setItems(newItem)
    }

    return { data: items, isLoading, mutate}
}