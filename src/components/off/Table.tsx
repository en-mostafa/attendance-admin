import { getTranslations } from "next-intl/server";
import NodataItems from "../ui/NodataItems";
import Items from "./Items";
import { getData } from "@/services/fetchData";

export default async function Table() {
    const t = await getTranslations('Public');
    const data = await getData('/attendance/leave/all')

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-150px rounded-start">{t('user')}</th>
                    <th className="min-w-125px">{t('email')}</th>
                    <th className="min-w-125px">{t("request_date")}</th>
                    <th className="min-w-200px">{t("time_leave")}</th>
                    <th className="min-w-150px">{t("status")}</th>
                    <th className="min-w-50px text-end rounded-end"></th>
                </tr>
            </thead>
            <tbody>
                { data?.length > 0 ? (
                    data?.map((item:any, index:number) => 
                    <Items key={index} item={item} />
                )
                ): (
                   <NodataItems colSpan={6}/>
                )}
            </tbody>
        </table>
    )
}