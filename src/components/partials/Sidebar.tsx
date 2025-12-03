'use client'
import ProfileSidebar from "../sidebar/profile/ProfileSidebar";
import logo from '../../../public/logo.svg';
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useContext } from "react";
import { SessionContext } from "@/store";
import { Access } from "@/types";
import { useTranslations } from "next-intl";

export default function Sidebar() {
    const pathname = usePathname();
    const role = useContext(SessionContext);
    const t =  useTranslations('Public');

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
                <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper hover-scroll-overlay-y my-5 mx-3" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer" data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px">
                    <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold px-1" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
                        <div className="menu-item">
                            <Link className={`menu-link ${pathname === '/' && 'active'}`} href="/">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-element-11 fs-2"></i>
                                </span>
                                <span className="menu-title">{t('dashboard')}</span>
                            </Link>
                        </div>
                        {(role?.user.create_user || role?.user.get_user || role?.category.get_category ) && (
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-profile-user fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('users')}</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                {role?.user.create_user && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/users/add' && 'active'}`} href="/users/add">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('User.add_user')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.user.get_user && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/users' && 'active'}`} href="/users">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('User.users_list')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.category.get_category && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/users/category' && 'active'}`} href="/users/category">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('category')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {(role?.admin.create_admin || role?.admin.get_admin || role?.access.get_access || role?.attendance.get_attendance || role?.attendance.get_shift || role?.attendance.get_leave || role?.imprest.get_imprest || role?.suggestion.get_suggestion ) && (
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-user-tick fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('Admin.admins')}</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                {role?.admin.create_admin && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/admin/add' && 'active'}`} href="/admin/add">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Admin.add_admin')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.admin.get_admin && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/admin' && 'active'}`} href="/admin">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Admin.admins_list')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.access.get_access && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/admin/access' && 'active'}`} href="/admin/access">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('access_levels')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.attendance.get_attendance && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/admin/check_present' && 'active'}`} href="/admin/check_present">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('attendance')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.attendance.get_shift && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/admin/work_shift' && 'active'}`} href="/admin/work_shift">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Shift.shift')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.attendance.get_leave && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/admin/off' && 'active'}`} href="/admin/off">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('vacations')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.imprest.get_imprest && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/admin/salary' && 'active'}`} href="/admin/salary">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('request_of_assistance')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.suggestion.get_suggestion && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/admin/feeds' && 'active'}`} href="/admin/feeds">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('admin_criticisms')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {(role?.product.get_product || role?.case.create_case || role?.case.get_case) && (
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-folder-down fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('case')}</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                {role?.case.create_case && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/new_case">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('add_cases')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.case.get_case && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/case">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('cases_list')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.product.get_product && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/file">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('service_list')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {(role?.tour.create_tour || role?.tour.get_tour || role?.tour.get_booked_product_tour) && (
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-airplane-square fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('tour')}</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                {role?.tour.create_tour && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/tour/add' && 'active'}`} href="/tour/add">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Tour.add_tour')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.tour.get_tour && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/tour/list' && 'active'}`} href="/tour/list">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Tour.tours_list')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.tour.get_booked_product_tour && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/tour/book' && 'active'}`} href="/tour/book">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Tour.reserved_tour')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {(role?.hotel.create_hotel || role?.hotel.get_hotel || role?.hotel.get_booked_product_hotel) && (
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-shop fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('Hotel.hotel')}</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                {role?.hotel.create_hotel && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/hotel/add' && 'active'}`} href="/hotel/add">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Hotel.add_hotel')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.hotel.get_hotel && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/hotel/list' && 'active'}`} href="/hotel/list">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Hotel.hotels_list')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.hotel.get_booked_product_hotel && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/hotel/book' && 'active'}`} href="/hotel/book">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Hotel.hotel_reserved')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {(role?.ticket.create_ticket || role?.ticket.get_ticket) && (
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-messages fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('Ticket.ticket')}</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                {role?.ticket.create_ticket && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/ticket/add' && 'active'}`} href="/ticket/add">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Ticket.add_ticket')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.ticket.get_ticket && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/ticket/list' && 'active'}`} href="/ticket/list">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Ticket.tickets_list')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {(role?.transaction.get_transaction || role?.treasury.get_treasury || role?.salary.get_salary || role?.expense.get_expense) && (
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-dollar fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('Financial')}</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                <div className="menu-sub menu-sub-accordion">
                                    {role?.treasury.get_treasury && (
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/finance/wallet">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Finance.treasury')}</span>
                                            </Link>
                                        </div>
                                    )}
                                    {role?.transaction.get_transaction && (
                                        <>
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/finance/payments/gateway">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('portal_transactions')}</span>
                                            </Link>
                                        </div>
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/finance/payments/currency">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Finance.transaction_currency')}</span>
                                            </Link>
                                        </div>
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/finance/payments/card">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Finance.transaction_card')}</span>
                                            </Link>
                                        </div>
                                        </>
                                    )}
                                </div>
                                {role?.transaction.get_transaction && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/finance/report">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Finance.report_finance')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.salary.get_salary && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/finance/salary">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Finance.list_salary')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.expense.get_expense && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className="menu-link" href="/finance/expenses">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('Finance.expenses_list')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-message-edit fs-2"></i>
                                </span>
                                <span className="menu-title">{t('task')}</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion">
                                <div className="menu-item">
                                    <Link className="menu-link" href="/task/user">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">{t('my_tasks')}</span>
                                    </Link>
                                </div>
                            </div>
                            {role?.task.create_task && (
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <Link className="menu-link" href="/task/add">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">{t('create_task_for_admin')}</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                            {role?.task.get_task && (
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <Link className="menu-link" href="/task/tasks">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">{t('tasks_admin_list')}</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-notification-bing fs-2"></i>
                                </span>
                                <span className="menu-title">{t('announcements')}</span>
                                <span className="menu-arrow"></span>
                            </span>
                            {role?.notification.get_notification && (
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <Link className="menu-link" href="/notif">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">{t('notifs')}</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <div className="menu-sub menu-sub-accordion">
                                <div className="menu-item">
                                    <Link className="menu-link" href="/notif/alarm">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">{t('alarm')}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {(role?.card.add_card || role?.ip.get_ip) && (
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-gear fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('setting')}</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                {role?.card.add_card && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/setting/card' && 'active'}`} href="/setting/card">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('cards')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {role?.ip.get_ip && (
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === '/setting/ip' && 'active'}`} href="/setting/ip">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">{t('ip')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {role?.log.get_log && (
                            <div className="menu-item">
                                <Link className={`menu-link ${pathname === '/logs' && 'active'}`} href="/logs">
                                    <span className="menu-icon">
                                        <i className="ki-outline ki-monitor-mobile fs-2"></i>
                                    </span>
                                    <span className="menu-title">{t('logs')}</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ProfileSidebar />
        </div>
    )
}