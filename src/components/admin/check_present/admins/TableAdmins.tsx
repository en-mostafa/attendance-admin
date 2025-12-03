'use client'

import Items from "./ItemsAdmin";
import NodataItems from "@/components/ui/NodataItems";
import { useTranslations } from "next-intl";
import { getListData } from "@/lib/helper/getListData";
import { LoadingList } from "@/components/ui/LoadingList";

export default function Table() {
    const t = useTranslations('Public');
    const { data, isEmpty, loading } = getListData('/admin/manager/retrive-admins?'); 
    

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="px-4 min-w-150px rounded-start">{t("user")}</th>
                    <th className="min-w-125px">{t("id")}</th>
                    <th className="min-w-125px">{t("phone")}</th>
                    <th className="min-w-200px">{t("email")}</th>
                    <th className="min-w-150px">{t("status")}</th>
                    <th className="min-w-50px px-4 text-end rounded-end">{t("attendance")}</th>
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