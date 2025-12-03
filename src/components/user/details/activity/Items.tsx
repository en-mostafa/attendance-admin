import { useJalaliFormat } from "@/services/formatDate"
import { useLocale } from "next-intl"

export const Items = ({ item } : { item: any }) => {
    const locale = useLocale();

    return (
        <tr key={item.id}>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 ps-4">{item.device}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item.ip}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary text-end d-block mb-1 fs-6 pe-4">{useJalaliFormat(item.createdAt, locale)}</span>
            </td>
        </tr>
    )
}