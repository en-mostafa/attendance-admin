import { useJalaliFormat } from "@/services/formatDate"
import { pipeNumber } from "@/services/pipe";
import { useLocale, useTranslations } from "next-intl"
import EditTransaction from "./Edit";

export const Items = ({ item, mutate } : { item: any, mutate:any }) => {
    const locale = useLocale();
     const t =  useTranslations('Public');

    return (
        <tr key={item.id}>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 ps-4">{pipeNumber(item.amount)}</span>
            </td>
            <td className="text-center">
                <span className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6 pe-4">{useJalaliFormat(item.paiedAt, locale)}</span>
            </td>
            <td className="text-center">
                <span className={`fw-bold text-hover-primary mb-1 fs-6 ${item.status === 'done' ? "text-success" : "text-gray-900"}`}>{item.status === 'done' ? t('successful') : t('unsuccessful')}</span>
            </td>
            <td className="text-end px-4">
                <EditTransaction item={item} mutate={mutate}/>
            </td>
        </tr>
    )
}