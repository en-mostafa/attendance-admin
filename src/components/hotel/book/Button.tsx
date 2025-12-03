'use client'
import Spinner from "@/components/ui/spinner";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useFormStatus } from "react-dom"

export const ButtonSubmit = () => {
    const t = useTranslations('Public.Hotel');
    const role = useContext(SessionContext);
    const { pending } = useFormStatus();

    return (
        role?.transaction.update_transaction && (
            <button type="submit" className="btn btn-primary w-150px" disabled={pending}>{pending ? <Spinner /> : t('info_add')}</button>
        )
    )
}