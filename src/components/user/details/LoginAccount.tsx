import { loginAccount } from "@/services/userServices"
import { useTranslations } from "next-intl";
import { startTransition, useActionState } from "react"

export const LoginAccount = ({ id } : { id: number }) => {
    const t = useTranslations('Public.User');
    const [state, action, pending] = useActionState(loginAccount, null);
    const handleClick = () => {
        startTransition(() => {
            action(id)
        })
    }   

    return (
        <div className="d-flex justify-content-between cursor-pointer p-3 bg-hover-light-primary" onClick={handleClick}>
            <span>{t('user_panel_login')}</span>
            <i className="ki-outline ki-left fs-3"></i>
        </div>
    )
}