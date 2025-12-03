import { useActionState, useEffect } from "react"
import { deleteTask } from "@/services/task.server"
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export const DeleteTask = ({ id } : { id: number }) => {
    const [state, action] = useActionState(deleteTask, null);
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
            <button type="submit" className="btn btn-icon btn-active-color-primary btn-sm">
                <i className="ki-outline ki-trash fs-1 text-danger"></i>
            </button>
        </form>
    )
}