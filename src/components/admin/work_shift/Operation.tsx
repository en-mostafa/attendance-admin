'use client'
import { Link } from "@/i18n/routing";
import { DeletedItem } from "./Delete";

export const Operation = ({ item }: { item: any }) => {
    return (
        <td>
            <div className="d-flex justify-content-end">
                <DeletedItem id={item?.id} />
                <Link href={`/admin/work_shift/${item?.id}`} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1">
                    <i className="ki-outline ki-pencil fs-2"></i>
                </Link>
            </div>
        </td>

    )
}