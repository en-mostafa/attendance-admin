'use client'
import { Link } from "@/i18n/routing";
import { useJalaliFormat } from "@/services/formatDate";
import { pipe } from "@/services/pipe";
import { PaymentStatus } from "@/components/ui/PaymentStatus";
import { useLocale, useTranslations } from "next-intl";

export default function Items({ item } : { item:any }) {
    const t =  useTranslations('Public');
    const locale = useLocale();

    return (
        <tr>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.user.client.firstName + item?.user.client.lastName}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.items.title}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.items.code}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.paiedType === 'ATM' ? t('card_to_card') : t('currency')}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{pipe(String(item?.amount))}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{useJalaliFormat(item?.paiedAt, locale)}</span>
            </td>
            <td>
                <PaymentStatus status="pending"/>
            </td>
            <td className="text-end">
                <Link href={`/tour/book/${item?.id}`} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1">
                    <i className="ki-duotone ki-arrow-left fs-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>
                </Link>
            </td>
        </tr>
    )
}