'use client'

import { SessionContext } from "@/store"
import { useTranslations } from "next-intl"
import { useContext } from "react"

export const TableOperation = () => {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);

    return (
        role?.expense.update_expenses && (
            <th className="min-w-50px text-end rounded-end px-4">{t("operation")}</th>
        )
    )
}