'use client'

import { useTranslations } from "next-intl"

export default function NodataItems({ colSpan } : { colSpan: number }) {
    const t = useTranslations('Public');
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="d-flex flex-column align-items-center pt-4">
                    <i className="ki-outline ki-search-list fs-3x"></i>
                    <span className="text-muted mt-2">{t("not_found")}</span>
                </div>
            </td>
        </tr>
    )
}