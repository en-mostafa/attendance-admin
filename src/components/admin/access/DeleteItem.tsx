'use client'
import { deletedAccess } from "@/services/accessServices";
import { useActionState } from "react"

export default function DeletedItem({ id } : { id: string }) {
    const [state, action, pending] = useActionState(deletedAccess, null);

    return (
        <form action={action} className="d-inline-block">
            <input type="text" name="accessId" defaultValue={id} hidden/>
            <button type="submit" disabled={pending} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                <i className="ki-outline ki-trash fs-2"></i>
            </button>
        </form>
    )
}