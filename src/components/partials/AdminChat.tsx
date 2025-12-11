'use client'
import Link from "next/link";

export const AdminChat = () => {


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