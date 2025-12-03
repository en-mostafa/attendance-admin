import Image from "next/image";
import logo from "../../../public/logo.svg";
import { Link } from "@/i18n/routing";
import NotifBox from "./NotifBox";
import SearchTicket from "./SearchTicket";
import { AdminChat } from "./AdminChat";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations('Public');
  return (
    <div id="kt_app_header" className="app-header">
      <div
        className="app-container container-fluid d-flex align-items-stretch flex-stack"
        id="kt_app_header_container"
      >
        <div
          className="d-flex align-items-center d-block d-lg-none ms-n3"
          title={t('show')}
        >
          <div
            className="btn btn-icon btn-active-color-primary w-35px h-35px me-2"
            id="kt_app_sidebar_mobile_toggle"
          >
            <i className="ki-outline ki-abstract-14 fs-2"></i>
          </div>
          <a href="index.html">
            <Image src={logo} className="h-30px" alt="Logo" />
          </a>
        </div>
        {/*begin::Toolbar wrapper*/}
        <div className="app-navbar flex-lg-grow-1" id="kt_app_header_navbar">
          <div className="app-navbar-item d-flex align-items-stretch flex-lg-grow-1">
            {/*begin::جستجو*/}
            <div
              id="kt_header_search"
              className="header-search d-flex align-items-center w-lg-200px"
              data-kt-search-keypress="true"
              data-kt-search-min-length="2"
              data-kt-search-enter="enter"
              data-kt-search-layout="menu"
              data-kt-search-responsive="true"
              data-kt-menu-trigger="auto"
              data-kt-menu-permanent="true"
              data-kt-menu-placement="bottom-end"
            >
              {/*begin::Tablet and mobile search toggle*/}
              <div
                data-kt-search-element="toggle"
                className="search-toggle-mobile d-flex d-lg-none align-items-center"
              >
                <div className="d-flex">
                  <i className="ki-outline ki-magnifier fs-1"></i>
                </div>
              </div>
              {/*end::Tablet and mobile search toggle*/}
              {/*begin::form(use d-none d-lg-block classes for responsive search)*/}
              <form
                data-kt-search-element="form"
                className="d-none d-lg-block w-100 position-relative mb-5 mb-lg-0"
                autoComplete="off"
              >
                {/*begin::Hidden input(افزودنed to disable form autocomplete)*/}
                <input type="hidden" />
                {/*end::Hidden input*/}
                {/*begin::Icon*/}
                {/*end::Icon*/}
                {/*begin::Input*/}
                <SearchTicket />
								<input type="hidden" className="search-input form-control form-control rounded-1 ps-13 d-none" name="search" value="" placeholder={t('search_placeholder')} data-kt-search-element="input" readOnly/>
                {/*end::Input*/}
                {/*begin::Spinner*/}
                <span
                  className="search-spinner position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5"
                  data-kt-search-element="spinner"
                >
                  <span className="spinner-border h-15px w-15px align-middle text-gray-500"></span>
                </span>
                {/*end::Spinner*/}
                {/*begin::ریست*/}
                <span
                  className="search-reset btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-4"
                  data-kt-search-element="clear"
                >
                  <i className="ki-outline ki-cross fs-2 fs-lg-1 me-0"></i>
                </span>
                {/*end::ریست*/}
              </form>
              {/*end::form*/}
              {/*begin::Menu*/}
              <div
                data-kt-search-element="content"
                className="menu menu-sub menu-sub-dropdown py-7 px-7 overflow-hidden w-300px w-md-350px"
              >
                {/*begin::Wrapper*/}
                <div data-kt-search-element="wrapper">
                  {/*begin::اخیرly viewed*/}
                  {/*end::اخیرly viewed*/}
                  {/*begin::Empty*/}
                  <div
                    data-kt-search-element="empty"
                    className="text-center d-none"
                  >
                    {/*begin::Icon*/}
                    <div className="pt-10 pb-10">
                      <i className="ki-outline ki-search-list fs-4x opacity-50"></i>
                    </div>
                    {/*end::Icon*/}
                    {/*begin::Message*/}
                    <div className="pb-15 fw-semibold">
                      <h3 className="text-gray-600 fs-5 mb-2">
                        {t('not_found_result')}
                      </h3>
                      <div className="text-muted fs-7">
                        {t('ask_again')}
                      </div>
                    </div>
                    {/*end::Message*/}
                  </div>
                  {/*end::Empty*/}
                </div>
                {/*end::Wrapper*/}
              </div>
              {/*end::Menu*/}
            </div>
            {/*end::جستجو*/}
          </div>
          {/*begin::اعلان ها*/}
          <div className="app-navbar-item ms-1 ms-md-3">
            {/*begin::Menu- wrapper*/}
            <AdminChat />
            {/*end::Menu wrapper*/}
          </div>
          {/*end::اعلان ها*/}
          {/*begin::Quick links*/}
          <div className="app-navbar-item ms-1 ms-md-3">
            {/*begin::Menu- wrapper*/}
            <div
              className="btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              <i className="ki-outline ki-abstract-26 fs-1"></i>
            </div>
            {/*begin::Menu*/}
            <div
              className="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px"
              data-kt-menu="true"
            >
              {/*begin::Heading*/}
              <div
                className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10"
                style={{
                  backgroundImage:
                    "url('/assets/media/misc/menu-header-bg.jpg')",
                }}
              >
                {/*begin::Title*/}
                <h3 className="text-white fw-semibold mb-3">{t('quick_links')}</h3>
                {/*end::Title*/}
              </div>
              {/*end::Heading*/}
              {/*begin:Nav*/}
              <div className="row g-0">
                {/*begin:آیتم*/}
                <div className="col-6">
                  <Link
                    href="/finance/report"
                    className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
                  >
                    <i className="ki-outline ki-dollar fs-3x text-primary mb-2"></i>
                    <span className="fs-5 fw-semibold text-gray-800 mb-0">
                      {t('finance')}
                    </span>
                  </Link>
                </div>
                {/*end:آیتم*/}
                {/*begin:آیتم*/}
                <div className="col-6">
                  <Link
                    href="/ticket/list"
                    className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
                  >
                    <i className="ki-outline ki-sms fs-3x text-primary mb-2"></i>
                    <span className="fs-5 fw-semibold text-gray-800 mb-0">
                      {t('tickets')}
                    </span>
                  </Link>
                </div>
                {/*end:آیتم*/}
                {/*begin:آیتم*/}
                <div className="col-6">
                  <Link
                    href="/users"
                    className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
                  >
                    <i className="ki-outline ki-profile-user fs-3x text-primary mb-2"></i>
                    <span className="fs-5 fw-semibold text-gray-800 mb-0">
                      {t('users')}
                    </span>
                  </Link>
                </div>
                {/*end:آیتم*/}
                {/*begin:آیتم*/}
                <div className="col-6">
                  <Link
                    href="/case"
                    className="d-flex flex-column flex-center h-100 p-6 bg-hover-light"
                  >
                    <i className="ki-outline ki-briefcase fs-3x text-primary mb-2"></i>
                    <span className="fs-5 fw-semibold text-gray-800 mb-0">
                      {t('cases')}
                    </span>
                  </Link>
                </div>
                {/*end:آیتم*/}
              </div>
              {/*end:Nav*/}
              {/*begin::نمایش بیشتر*/}
              <div className="py-2 text-center border-top">
                <Link
                  href="/"
                  className="btn btn-color-gray-600 btn-active-color-primary"
                >
                  {t('show_all')}
                  <i className="ki-outline ki-arrow-left fs-5"></i>
                </Link>
              </div>
              {/*end::نمایش بیشتر*/}
            </div>
            {/*end::Menu*/}
            {/*end::Menu wrapper*/}
          </div>
          {/*end::Quick links*/}
          {/*begin::چت*/}
          <div className="app-navbar-item ms-1 ms-md-3">
            <NotifBox />
          </div>
          {/*end::چت*/}
          {/*begin::Header menu toggle*/}
          {/*end::Header menu toggle*/}
        </div>
        {/*end::Navbar*/}
      </div>
    </div>
  );
}
