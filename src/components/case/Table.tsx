'use client'

import Items from "./Items";
import { useTranslations } from "next-intl";
import NodataItems from "@/components/ui/NodataItems";
import { getListData } from "@/lib/helper/getListData";
import { LoadingList } from "@/components/ui/LoadingList";
import { useContext } from "react";
import { SessionContext } from "@/store";

export default function Table({ cases } : { cases:string | null }) {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    const { data, isEmpty, loading, mutate } = getListData(`${!cases ? '/case/all?' : `/search/case?${cases}&`}` ); 

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="px-4 rounded-start">{t('id')}</th>
                    <th className="text-center">{t('Admin.admin_name')}</th>
                    <th className="text-center">{t('user')}</th>
                    <th className="text-center">{t('status')}</th>
                    <th className="text-center">{t('Status.created')}</th>
                    <th className="text-center">{t('total_price')}</th>
                    {(role?.case.delete_case || role?.case.update_case) && (
                    <th className="rounded-end text-center">{t('actions')}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => 
                    <Items key={index} item={item} mutate={mutate} />
                )}
                {/*{isEmpty && <NodataItems colSpan={7} />}*/}
                {(cases && data.length === 0) && <NodataItems colSpan={7} />}
                {loading && <LoadingList colSpan={7}/>}
            </tbody>
        </table>
    )
}