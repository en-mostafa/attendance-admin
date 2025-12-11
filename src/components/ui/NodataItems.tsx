'use client'

import { useTranslations } from "next-intl"

export default function NodataItems({ colSpan } : { colSpan: number }) {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="d-flex flex-column align-items-center pt-4">
                    <i className="ki-outline ki-search-list fs-3x"></i>
                    <span className="text-muted mt-2">اطلاعاتی یافت نشد</span>
                </div>
            </td>
        </tr>
    )
}