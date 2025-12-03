'use client'

import Items from "./Items";
import NodataItems from "@/components/ui/NodataItems";
import { useTranslations } from "next-intl";
import { getListData } from "@/lib/helper/getListData";
import { LoadingList } from "@/components/ui/LoadingList";

export default function Table() {
    const t = useTranslations('Public');
    const { data, isEmpty, loading } = getListData('/payment/transaction/xoipay?'); 
   

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-150px rounded-start">{t("user")}</th>
                    <th>{t("Finance.number_id")}</th>
                    <th>{t("amount")} ({t("euro")})</th>
                    <th>{t("Finance.date_transaction")}</th>
                    <th>{t('status')}</th>
                    <th className="text-end rounded-end px-4">{t("operation")}</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => 
                    <Items key={index} item={item} />
                )}
                {isEmpty && <NodataItems colSpan={6} />}
                {loading && <LoadingList colSpan={6}/>}
            </tbody>
        </table>
    )
}