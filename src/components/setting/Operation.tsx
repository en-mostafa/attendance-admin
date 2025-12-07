'use client'

import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { useContext } from "react";

export const Operation = () => {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    return <th className="min-w-50px text-end rounded-end px-4">{t('actions')}</th>
}