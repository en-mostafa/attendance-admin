'use client'
import { getToken } from "@/services/token";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export function useData(url: string | null) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const locale = useLocale();

    useEffect(() => {
        if (url) {
            let ignore = false;
            setIsloading(true);
            const fetchData = async () => {
                const token = await getToken()
                await fetch(process.env.NEXT_PUBLIC_API_BACKEND_URL + url, { method: 'GET', headers: { Authorization: `Bearer ${token?.value}`, lang:locale } })
                    .then(response => response.json())
                    .then(json => {
                        if (!ignore) {
                            setData(json);
                            setIsloading(false)
                        }
                    });
            }
            fetchData()

            return () => {
                ignore = true;
            };
        }
    }, [url]);
    return { data, isLoading };
}