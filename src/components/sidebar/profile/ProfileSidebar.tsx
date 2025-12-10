import Image from "next/image";
import SwitchLang from "./SwitchLang";
import ThemeChange from "./ThemeChange";
import profile from '../../../../public/assets/media/svg/avatars/blank.svg';
import { Link } from "@/i18n/routing";
import useSwr from "@/hooks/useSwr";
import { Logout } from "./Logout";
import { useTranslations } from "next-intl";

export default function ProfileSidebar() {
    const { data } = useSwr('/account/permission');
    const imgUrl = data?.profile?.profileImage ? process.env.NEXT_PUBLIC_API_BACKEND_URL + "/" + data.profile.profileImage : profile
    const userName = data && data?.profile?.client;
    const t = useTranslations('Public');

    return (
        <div className="app-sidebar-footer d-flex align-items-center px-8 pb-10" id="kt_app_sidebar_footer">
            <div className="d-flex align-items-center" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-overflow="true" data-kt-menu-placement="bottom-end">
                <div className="d-flex flex-center cursor-pointer symbol symbol-circle symbol-40px">
                    <Image src={imgUrl} width={50} height={50} alt="profile" />
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center ms-3">
                    <span className="text-gray-500 fs-8 fw-semibold">{t('admin')}</span>
                    <span className="text-gray-800 fs-7 fw-bold text-hover-primary">{`${userName?.firstName ?? ''} ${userName?.lastName ?? ''}`}</span>
                </div>
            </div>

            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
                <div className="menu-item px-3">
                    <div className="menu-content d-flex align-items-center px-3">
                        <div className="symbol symbol-50px me-5">
                            <Image src={imgUrl} width={50} height={50} alt="profile" />
                        </div>
                        <div className="d-flex flex-column">
                            <div className="fw-bold d-flex align-items-center fs-5">
                                <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">{data?.profile?.admin?.level}</span></div>
                            <Link href="/admin/profile" className="fw-semibold text-muted text-hover-primary fs-7">{data?.profile?.email}</Link>
                        </div>
                    </div>
                </div>
                <div className="separator my-2"></div>
                <div className="menu-item px-5">
                    <Link href="/admin/profile" className="menu-link px-5">
                        {t('edit_profile')}
                    </Link>
                </div>
                <ThemeChange />
                <SwitchLang />
                <div className="menu-item px-5">
                    <Logout />
                </div>
            </div>
        </div>
    )
}