'use client'

import Items from "./Items";
import NodataItems from "@/components/ui/NodataItems";
import { getListData } from "@/lib/helper/getListData";
import { LoadingList } from "@/components/ui/LoadingList";
import { useTranslations } from "next-intl";

export default function Table() {
    const { data, isEmpty, loading } = getListData('/payment/product/tour?'); 
    const t =  useTranslations('Public');

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 rounded-start">{t('user')}</th>
                    <th>{t('Tour.tour_title')}</th>
                    <th>{t('Tour.tour_code')}</th>
                    <th>{t('Tour.method_pay')}</th>
                    <th>{t('Tour.order_amount')}</th>
                    <th>{t('Tour.order_date')}</th>
                    <th>{t('status')}</th>
                    <th className="min-w-50px text-end rounded-end"></th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => 
                    <Items key={index} item={item} />
                )}
                {isEmpty && <NodataItems colSpan={7} />}
                {loading && <LoadingList colSpan={7}/>}
            </tbody>
        </table>
    )
}