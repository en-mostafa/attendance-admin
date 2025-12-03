'use client'

import { SessionContext } from "@/store"
import { useTranslations } from "next-intl";
import { useContext } from "react"

export const TitleTable = () => {
    const role = useContext(SessionContext);
    const t =  useTranslations('Public');

    return (
        (role?.category.delete_category || role?.category.update_category) && (
            <th className="min-w-50px text-end rounded-end px-4">{t('operation')}</th>
        )
    )
}