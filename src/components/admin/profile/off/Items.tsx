import { useJalaliFormat } from "@/services/formatDate"
import { useLocale, useTranslations } from "next-intl"

export const Items = ({ item } : { item: any }) => {
    const t = useTranslations('Public.Status');
    const locale = useLocale();

    return (
        <tr key={item.id}>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 ps-4">{useJalaliFormat(item.createdAt, locale)}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{useJalaliFormat(item.startDate, locale)}</span>
            </td> 
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{useJalaliFormat(item.endDate, locale)}</span>
            </td>
            <td className="text-end">
                <span className={`badge py-3 px-4 fs-7 ${item.status === 'Pending' ? 'badge-light-warning' : 'badge-light-success'}`}>{item.status === 'Pending' ? t("pending") : t("confirmed")}</span>
            </td>
        </tr>
    )
}