'use client'

import { Link } from "@/i18n/routing";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { useContext } from "react";

export const AddWorkShift = () => {
    const t =  useTranslations('Public');
    const role = useContext(SessionContext);
    
    return (
        <>
            {role?.attendance.define_shift && (
                <Link href="/admin/work_shift/add" className="btn btn-flex btn-primary btn-sm">
                    {t("Shift.add_shift")}
                </Link>
            )}
        </>
    )
}