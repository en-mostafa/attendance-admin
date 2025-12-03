'use client'
import Spinner from "@/components/ui/spinner"
import { deleteAlarmToUsers } from "@/services/notif.server"
import { useTranslations } from "next-intl"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export const DeleteAlarm = ({ id } : { id: number }) => {
    const [state, action, pending] = useActionState(deleteAlarmToUsers, null)
    const t = useTranslations('Public');

    useEffect(() => {
        if(state?.message === 'success') {
        toast.success(t('toast_success'))
        } else if (state?.message === 'error') {
        toast.error(t('toast_error'))
        }
    }, [state])

    return (
        <form action={action}>
            <input type="hidden" name="id" defaultValue={id}/>
            <button type="submit" disabled={pending} className="btn btn-sm btn-danger mx-3">
                { pending ? <Spinner /> : t('delete')}    
            </button>
        </form>
    )
}