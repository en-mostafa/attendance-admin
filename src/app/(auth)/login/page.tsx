'use client'
import Form from "@/components/login/Form";
import { routing, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const pathname = usePathname();
    const [show, setShow] = useState(false);
  

    return (
        <div className="bg-auth d-flex justify-content-center align-items-center p-12">
            <div className="bg-body d-flex flex-column flex-center rounded-4 h-600px w-100 w-md-600px p-10">
                <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-100 w-md-400px">
                    <div className="d-flex flex-center flex-column flex-column-fluid pt-20">
                        <Form />
                    </div>

                    {/*begin::Footer*/}
                    <div className="d-flex flex-stack">
                        <div className="me-10">
                            <button type="button" onClick={() => setShow(!show)} className="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-offset="0px, 0px">
                                <Image src={`/assets/media/flags/${locale === 'fa' ? 'iran.svg' : locale === 'en' ? 'united-states.svg' : locale === 'ar' ? 'saudi-arabia.svg': locale === 'tr' ? 'turkey.svg' : 'russia.svg' }`} width={20} height={20} className="w-20px h-20px rounded me-3" alt="national" />
                                <span data-kt-element="current-lang-name" className="me-1">{ locale == 'en' ? t('en') : locale === 'fa' ? t('fa') : locale === 'ar' ? t('ar') : locale === 'tr' ? t('tr') : t('ru') }</span>
                                <i className="ki-outline ki-down fs-5 text-muted rotate-180 m-0"></i>
                            </button>
                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7 " data-kt-menu="true" id="kt_auth_lang_menu" style={{ display: `${show && 'block'}` }}>
                                {
                                    routing.locales.map((cur) => (
                                        <div key={cur} className="menu-item px-3">
                                            <a href={`/${cur}/${pathname}`} className={`menu-link d-flex px-5 ${locale === cur && 'active'}`} >
                                                <span className="symbol symbol-20px me-4">
                                                    <Image src={`/assets/media/flags/${cur === 'fa' ? 'iran.svg' : cur === 'en' ? 'united-states.svg' : cur === 'ar' ? 'saudi-arabia.svg': cur === 'tr' ? 'turkey.svg' : 'russia.svg' }`} width={25} height={25} alt="united-states" />
                                                </span>
                                                {t('locale', {locale: cur})}
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}