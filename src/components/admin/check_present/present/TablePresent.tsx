'use client'

import { useEffect } from "react";
import useSwrInfinite from "@/hooks/useSwrInfinit";
import Items from "./ItemsPresent";
import NodataItems from "@/components/ui/NodataItems";
import { useTranslations } from "next-intl";
import { getListData } from "@/lib/helper/getListData";
import { LoadingList } from "@/components/ui/LoadingList";

export default function Table({ id } : { id: string }) {
    const t = useTranslations('Public');
    //const { data, setSize, isLoading } = useSwrInfinite(`/attendance/info/${id}?`);
    const { data, isEmpty, loading } = getListData(`/attendance/info/${id}?`); 
  
    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="px-4 min-w-150px rounded-start">{t("day_week")}</th>
                    <th className="min-w-150px">{t("date")}</th>
                    <th className="min-w-150px">{t("hour")}</th>
                    <th className="min-w-100px text-end rounded-end px-4">
                        <div className="d-flex align-items-center justify-content-end gap-15">
                            <span>{t("present")}</span>
                            <span>{t("absent")}</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {/*{data?.map((item, index) =>
                    <Items key={index} item={item} />
                )}
                {data?.length === 0 && <NodataItems colSpan={4} /> }*/}

                {data?.map((item, index) => 
                    <Items key={index} item={item} />
                )}
                {isEmpty && <NodataItems colSpan={4} />}
                {loading && <LoadingList colSpan={4}/>}
            </tbody>
        </table>
    )
}