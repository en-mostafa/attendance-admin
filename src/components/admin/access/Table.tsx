import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items"
import { getTranslations } from "next-intl/server"

export const Table = async ({ data }: { data:any}) => {
    const t = await getTranslations("Public");

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-150px rounded-start">{t("access_name")}</th>
                    <th className="min-w-50px text-end rounded-end px-4">{t("operation")}</th>
                </tr>
            </thead>
            <tbody>
                <>
                {data?.map((item:any, index: number) => 
                    <Items key={index} item={item} />
                )}
                {data?.length === 0 && <NodataItems colSpan={2}/> }
                </>
            </tbody>
        </table>
    )
}