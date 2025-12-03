'use client'
import { Link } from "@/i18n/routing"
import { SessionContext } from "@/store"
import { useContext } from "react"

export const AdminChat = () => {
    const role = useContext(SessionContext);
    
    if(!role?.message.get_message) {
        return
    }

    return (
        <Link href={"/admin-chats"}>
            <div
                className="btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
                data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                data-kt-menu-attach="parent"
                data-kt-menu-placement="bottom-end"
            >
            <i className="ki-outline ki-messages fs-2"></i>
            </div>
        </Link>
    )
}