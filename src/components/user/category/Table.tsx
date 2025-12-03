import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items"
import { TitleTable } from "./TitleTable"
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const Table = async ({ data }: { data:any}) => {
    const t = await getTranslations('Public');

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-150px rounded-start">{t('category_name')}</th>
                    <TitleTable />
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