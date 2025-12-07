import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items"
import { getData } from "@/services/fetchData"
import { TableOperation } from "./TableOperation"
import { getTranslations } from "next-intl/server"

export const Table = async () => {
    const t = await getTranslations('Public');
    const data = await getData('/shift/index')

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-150px rounded-start">{t("Shift.name_shift")}</th>
                    <th className="ps-4 min-w-150px rounded-start">{t("Shift.timezone")}</th>
                    <th className="ps-4 min-w-150px rounded-start">{t("Shift.hour_start")}</th>
                    <th className="ps-4 min-w-150px rounded-start">{t("Shift.hour_end")}</th>
                    <TableOperation />
                </tr>
            </thead>
            <tbody>
                <>
                    {/*{data?.map((item: any) =>
                        <Items key={item.id} item={item} />
                    )}*/}
                    {data?.length === 0 && <NodataItems colSpan={5} />}
                </>
            </tbody>
        </table>
    )
}