'use client'

import Items from "./Items";
import { useTranslations } from "next-intl";
import { getListData } from "@/lib/helper/getListData";
import NodataItems from "@/components/ui/NodataItems";
import { LoadingList } from "@/components/ui/LoadingList";

export default function Table() {
    const t = useTranslations('Public.Hotel');
    const { data, isEmpty, loading, mutate } = getListData('/hotel/admin/hotel/all?'); 

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-200px rounded-start">{t('title')}</th>
                    <th className="min-w-150px">{t("country_name")}</th>
                    <th className="min-w-150px">{t("city_name")}</th>
                    <th className="min-w-150px">{t("star_title")}</th>
                    <th className="min-w-150px">{t("rooms_hotel")}</th>
                    <th className="min-w-50px text-end rounded-end"></th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => 
                    <Items key={index} item={item} mutate={mutate}/>
                )}
                {isEmpty && <NodataItems colSpan={6} />}
                {loading && <LoadingList colSpan={6}/>}
            </tbody>
        </table>
    )
}