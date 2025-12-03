import useSwrInfinite from "@/hooks/useSwrInfinit";
import { useEffect } from "react";

export const getListData = (url:string) => {
    const { data, size, setSize, isLoading, mutate } = useSwrInfinite(url);

    const issues: any[] = data ? [].concat(...data) : [];
    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0].length === 0;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if(isEmpty || (data && data[data.length - 1]?.length < 12)) {
                return  isLoadingMore === false
            }
            if (scrollY + windowHeight >= documentHeight - 100) {
                setSize(size + 1)
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return { data: issues, isEmpty, loading: isLoadingMore, mutate }
}