'use client'

import { reservedTour } from "@/services/tourServices";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify";

interface Props {
    children: React.ReactNode
}

export const Form = ({ children }: Props) => {
    const [state, action] = useActionState(reservedTour, null);
     const t = useTranslations('Public');

   useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])

    return (
        <form action={action}>
            {children}
        </form>
    )
}