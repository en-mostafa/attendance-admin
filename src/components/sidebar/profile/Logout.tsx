import { deleteToken } from "@/services/token";
import { useActionState } from "react";

export const Logout = () => {
    const [state, formAction] = useActionState(deleteToken, null);

    return (
        <form action={formAction}>
            <button
                type="submit"
                className="btn menu-link px-5 w-100">
                خروج از حساب
            </button>
        </form>
    )
}