import { Link } from "@/i18n/routing";
import { useJalaliFormat } from "@/services/formatDate";
import { pipeNumber } from "@/services/pipe";
import { PaymentStatus } from "@/components/ui/PaymentStatus";
import { useLocale, useTranslations } from "next-intl";

export default function Items({ item } : { item:any }) {
    const t = useTranslations('Public.Finance');
    const locale = useLocale();

    return (
        <tr>
            <td>
                <Link href={`/users/${item?.user?.id}`} className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.user.client?.firstName + " " + item?.user.client?.lastName}</Link>
            </td>
            <td>
                <span className="text-gray-900 fw-bold d-block mb-1 fs-6">{item?.textId}</span>
            </td>
            <td className="text-start">
                <span className="text-gray-900 fw-bold text-start d-block mb-1 fs-6">{pipeNumber(item?.amount)}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold d-block mb-1 fs-6">{useJalaliFormat(item?.paiedAt, locale)}</span>
            </td>
            <td>
                <PaymentStatus status={item?.status}/>
            </td>
            <td className="text-end">
                {item?.productType === 'tour' ? (
                    <Link href={`/tour/book/${item?.id}`} className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{t("book_tour")}</Link>
                ) : (
                    <Link href={`/hotel/book/${item?.id}`} className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{t("book_room")}</Link>
                )}
            </td>
        </tr>
    )
}