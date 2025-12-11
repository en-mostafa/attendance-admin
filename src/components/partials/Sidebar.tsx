'use client'
import ProfileSidebar from "../sidebar/profile/ProfileSidebar";
import logo from '../../../public/logo.png';
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div id="kt_app_sidebar" className="app-sidebar flex-column" data-kt-drawer="true" data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
            <div className="app-sidebar-logo flex-shrink-0 d-none d-md-flex align-items-center px-8" id="kt_app_sidebar_logo">
                {/*begin::Logo*/}
                <Link href="index.html">
                    <Image src={logo} className="h-30px d-none d-sm-inline app-sidebar-logo-default theme-light-show" alt="Logo" />
                    <Image src={logo} className="h-30px h-lg-25px theme-dark-show" alt="logo" />
                </Link>
                {/*end::Logo*/}
                {/*begin::کناری toggle*/}
                <div className="d-flex align-items-center d-lg-none ms-n3 me-1" title="مشاهده aside menu">
                    <div className="btn btn-icon btn-active-color-primary w-30px h-30px" id="kt_aside_mobile_toggle">
                        <i className="ki-outline ki-abstract-14 fs-1"></i>
                    </div>
                </div>
                {/*end::کناری toggle*/}
            </div>

            <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper hover-scroll-overlay-y my-5 mx-3"  >
                    <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold px-1" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/' && 'active'}`} href="/">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-element-11 fs-2"></i>
                                </span>
                                <span className="menu-title">داشبورد</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/employe-add' && 'active'}`} href="/">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-user fs-2"></i>
                                </span>
                                <span className="menu-title">افزودن کارمند</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/' && 'active'}`} href="/">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-element-11 fs-2"></i>
                                </span>
                                <span className="menu-title">لیست کارمندان</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/' && 'active'}`} href="/">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-element-11 fs-2"></i>
                                </span>
                                <span className="menu-title">مرخصی ها</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/' && 'active'}`} href="/">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-element-11 fs-2"></i>
                                </span>
                                <span className="menu-title">شیفت ها</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/' && 'active'}`} href="/">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-element-11 fs-2"></i>
                                </span>
                                <span className="menu-title">حضور وغیاب</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/' && 'active'}`} href="/">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-element-11 fs-2"></i>
                                </span>
                                <span className="menu-title">واریزی ها</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/ip' && 'active'}`} href="/ip">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-monitor-mobile fs-2"></i>
                                </span>
                                <span className="menu-title">آی پی</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/ip' && 'active'}`} href="/ip">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-monitor-mobile fs-2"></i>
                                </span>
                                <span className="menu-title">گزارش مالی</span>
                            </Link>
                        </div>
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/logs' && 'active'}`} href="/logs">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-monitor-mobile fs-2"></i>
                                </span>
                                <span className="menu-title">لاگ ها</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileSidebar />
        </div>
    )
}