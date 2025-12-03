'use client'
import { deletedCategory } from "@/services/userServices";
import { SessionContext } from "@/store";
import { useActionState, useContext } from "react"

export default function DeletedItem({ id } : { id: string }) {
    const role = useContext(SessionContext);
    const [state, action, pending] = useActionState(deletedCategory, null);
    if(!role?.category.delete_category) return;
    
    return (
        <form action={action} className="d-inline-block">
            <input type="text" name="categoryId" defaultValue={id} hidden/>
            <button type="submit" disabled={pending} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                <i className="ki-outline ki-trash fs-2"></i>
            </button>
        </form>
    )
}