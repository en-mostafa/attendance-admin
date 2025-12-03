'use client'

import Items from "./Items";
import { getListData } from "@/lib/helper/getListData";
import NodataItems from "@/components/ui/NodataItems";
import { LoadingList } from "@/components/ui/LoadingList";
import { useTranslations } from "next-intl";

export default function Table() {
    const { data, isEmpty, loading, mutate } = getListData('/tour/admin/tour/all?');
    const t =  useTranslations('Public'); 

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-200px rounded-start">{t('title')}</th>
                    <th className="min-w-150px">{t('code')}</th>
                    <th className="min-w-150px">{t('price')}({t('euro')})</th>
                    <th className="min-w-150px">{t('Tour.capacity')}</th>
                    <th className="min-w-150px">{t('Tour.start_date')}</th>
                    <th className="min-w-150px">{t('Tour.end_date')}</th>
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