import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items"
import { TableOperation } from "./TableOperation"
import { getTranslations } from "next-intl/server"

export const Table = async ({ data } : { data:any }) => {
    const t = await getTranslations('Public');

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-150px rounded-start">{t("Admin.admin_name")}</th>
                    <th className="ps-4 min-w-150px rounded-start">{t("email")}</th>
                    <th className="ps-4 min-w-150px rounded-start">{t("amount")}</th>
                    <th className="ps-4 min-w-150px rounded-start">{t("Finance.text_id")}</th>
                    <th className="ps-4 min-w-150px rounded-start">{t("Finance.date_pay")}</th>
                    <th className="ps-4 min-w-150px rounded-start">{t("date_of_registration")}</th>
                    <TableOperation />
                </tr>
            </thead>
            <tbody>
                <>
                {data?.map((item:any, index: number) => 
                    <Items key={index} item={item} />
                )}
                {data?.length === 0 && <NodataItems colSpan={7}/> }
                </>
            </tbody>
        </table>
    )
}