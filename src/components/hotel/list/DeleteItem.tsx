import { deletedHotel } from "@/services/hotelServices"
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function DeletedHotel({ id, mutate } : { id: string, mutate:any }) {
    const t = useTranslations('Public');
    const [state, action] = useActionState(deletedHotel, null);

    useEffect(() => {
        if(state?.messgae === 'success') {
            mutate()
            toast.success(t('toast_success'))
        }
    }, [state])

    return (
        <form action={action} className="d-inline-block">
            <input type="text" name="id" defaultValue={id} hidden/>
            <button type="submit" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                <i className="ki-outline ki-trash fs-2"></i>
            </button>
        </form>
    )
}