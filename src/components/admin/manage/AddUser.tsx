'use client'

import { Link } from "@/i18n/routing";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { useContext } from "react"

export default function AddUser() {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    
    if(!role?.admin.create_admin) return;

    return (
        <Link href="/admin/add" className="btn btn-sm btn-light-primary">
            <i className="ki-outline ki-plus fs-2"></i>
            {t("new_member")}
        </Link>
    )
}