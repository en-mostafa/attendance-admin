'use client'

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const AddWorkShift = () => {
    const t = useTranslations('Public');

    return (
        <Link href="/admin/work_shift/add" className="btn btn-flex btn-primary btn-sm">
            {t("Shift.add_shift")}
        </Link>
    )
}