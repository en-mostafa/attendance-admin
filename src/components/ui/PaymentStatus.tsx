'use client'

import { useTranslations } from "next-intl"

export const PaymentStatus = ({status} : {status: string}) => {
    const t = useTranslations('Public.Status');

    return (
        <span 
            className={`badge ${status === 'done' ? 'badge-light-success' : status === 'pending' ? 'badge-light-warning' : 'badge-light-danger'}`}>
                {status === 'done' ? t("confirmed") : status === 'pending' ? t("pending") : t("rejected")}
        </span>
    )
}