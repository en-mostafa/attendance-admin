import { deleteToken } from "@/services/token";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

export const Logout = () => {
    const [state, formAction] = useActionState(deleteToken, null);
    const t =  useTranslations('Public');

    return (
        <form action={formAction}>
            <button 
                type="submit" 
                className="btn menu-link px-5 w-100">
                    {t('logout')}
            </button>
        </form>
    )
}