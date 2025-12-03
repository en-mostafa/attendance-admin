'use client'

import { useInfinitScroll } from "@/hooks/useInfinitScroll";
import Items from "./Items";
import { useEffect, useState } from "react";
import NodataItems from "@/components/ui/NodataItems";
import LodaingTableList from "@/components/ui/LoadingTableList";
import { useTranslations } from "next-intl";

export default function Table({id}: { id: string }) {
    const t = useTranslations('Public.Hotel');
    const [page, setPage] = useState(1);
    const { data, isLoading } = useInfinitScroll(`/hotel/admin/room/all/${id}?page=${page}`);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
                return;
            }
            setPage(prev => prev + 1)
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading])


    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-200px rounded-start">{t("room_title")}</th>
                    <th className="min-w-150px">{t("capacity")}</th>
                    <th className="min-w-150px">{t("price")}</th>
                    <th className="min-w-150px">{t("discount")}</th>
                    <th className="min-w-50px text-end rounded-end"></th>
                </tr>
            </thead>
            <tbody>
                {data?.length > 0 ? (
                    data?.map(item => 
                        <Items key={item.id} item={item}/>)
                    ): (
                        <NodataItems colSpan={7}/>
                )}
                { isLoading && <LodaingTableList colSpan={7} /> }
            </tbody>
        </table>
    )
}