import Items from "./Items";
import { LoadingList } from "@/components/ui/LoadingList";
import { getTranslations } from "next-intl/server";
import NodataItems from "../ui/NodataItems";

export default async function Table({ data } : { data:any[] }) {
    const t = await getTranslations('Public');

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
               <tr className="fw-bold text-muted bg-light border-0">
                    <th className="rounded-start px-4">{t('id')}</th>
                    <th className="text-center">{t('title')}</th>
                    <th className="text-center">{t('price')} ({t('euro')})</th>
                    <th className="text-center">{t('taxes')}</th>
                    <th className="text-center">{t('discount')}</th>
                    <th className="rounded-end text-end px-4">{t('actions')}</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => 
                    <Items key={index} item={item} />
                )}
                {data?.length === 0 && <NodataItems colSpan={7}/>}
            </tbody>
        </table>
    )
}