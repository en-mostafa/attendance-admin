
import NodataItems from "../../ui/NodataItems";
import Items from "./Items";
import { getTranslations } from "next-intl/server";

export default async function Table({ data }: { data: any[] }) {
    const t = await getTranslations('Public');
    console.log(data)
    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="text-center rounded-start">{t('id')}</th>
                    <th className="text-center">{t('user')}</th>
                    <th className="text-center">{t('salary')}</th>
                    <th className="text-center">{t('status')}</th>
                    <th className="text-center">{t('last_update_date')}</th>
                    <th className="text-center rounded-end">{t('actions')}</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) =>
                    <Items key={index} item={item} />
                )}
                {data.length === 0 && <NodataItems colSpan={7} />}
            </tbody>
        </table>
    )
}