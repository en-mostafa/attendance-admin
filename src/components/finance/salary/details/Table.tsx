import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items"
import { getTranslations } from "next-intl/server";

export const Table = async ({ data } : { data:any }) => {
    const t = await getTranslations('Public.Finance');

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="rounded-start">{t("fixed_salary")} ({t("euro")})</th>
                    <th className="rounded-start">{t("wallet_amount")} ({t("euro")})</th>
                    <th className="rounded-start">{t("amount")} ({t("euro")})</th>
                    <th className="rounded-start">{t("date_register")}</th>
                    <th className="rounded-start">{t("operation")}</th>
                    <th className="min-w-150px text-end rounded-end px-4">{t("describe")}</th>
                </tr>
            </thead>
            <tbody>
                <>
                {data?.map((item:any, index: number) => 
                    <Items key={index} item={item} />
                )}
                {data?.length === 0 && <NodataItems colSpan={8}/>}
                </>
            </tbody>
        </table>
    )
}