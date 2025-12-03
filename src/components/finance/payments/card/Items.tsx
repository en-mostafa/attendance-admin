import { PaymentStatus } from "@/components/ui/PaymentStatus";
import { Link } from "@/i18n/routing";
import { useJalaliFormat } from "@/services/formatDate";
import { pipeNumber } from "@/services/pipe";
import { useLocale, useTranslations } from "next-intl";

export default function Items({ data} : { data:any }) {
    const t = useTranslations('Public.Finance');
    const locale = useLocale();

    return (
        <tr>
            <td>
                <Link href={`/users/${data?.user?.id}`} className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{data?.user.client?.firstName + " " + data?.user.client?.lastName}</Link>
            </td>
            <td className="text-start">
                <span className="text-gray-900 fw-bold text-start d-block mb-1 fs-6">{pipeNumber(data?.amount)}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold d-block mb-1 fs-6">{useJalaliFormat(data?.paiedAt, locale)}</span>
            </td>
            <td>
                <PaymentStatus status={data?.status}/>
            </td>
            <td className="text-end">
                {data?.productType === 'hotel' ? (
                    <Link href={`/hotel/book/${data?.id}`} className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{t("book_room")}</Link>
                ) : (
                    <Link href={`/tour/book/${data?.id}`} className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{t("book_tour")}</Link>
                )}
            </td>
        </tr>
    )
}