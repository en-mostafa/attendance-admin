import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items"
import { Operation } from "./Operation";
import { getTranslations } from "next-intl/server";

export const Table = async ({ data }: { data:any}) => {
    const t = await getTranslations ('Public');

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 rounded-start">{t('id')}</th>
                    <th className="text-center">{t('title')}</th>
                    <th className="text-center">{t('ip')}</th>
                    <Operation />
                </tr>
            </thead>
            <tbody>
                <>
                {data?.map((item:any, index: number) => 
                    <Items key={index} item={item} />
                )}
                {data?.length === 0 && <NodataItems colSpan={4}/> }
                </>
            </tbody>
        </table>
    )
}