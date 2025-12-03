'use client'

import Image from "next/image";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { startTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SwitchLang() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    //const handleSwitchLanguage = (cur: string) => {
    //    startTransition(() => {
    //        router.replace(
    //            { pathname },
    //            {locale: cur}
    //        )
    //    })
    //}


    return (
        <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-end" data-kt-menu-offset="-15px, 0">
            <a href="#" className="menu-link px-5">
                <span className="menu-title position-relative"> 
                    {t('lang')} { locale == 'en' ? t('en') : locale === 'fa' ? t('fa') : locale === 'ar' ? t('ar') : locale === 'tr' ? t('tr') : t('ru') }
                    <span className="fs-8 rounded px-3 py-2 position-absolute translate-middle-y top-50 end-0"> 
                        <Image src={`/assets/media/flags/${locale === 'fa' ? 'iran.svg' : locale === 'en' ? 'united-states.svg' : locale === 'ar' ? 'saudi-arabia.svg': locale === 'tr' ? 'turkey.svg' : 'russia.svg' }`} width={15} height={15} className="w-15px h-15px rounded-1 ms-2" alt="united-states" />
                    </span>
                </span>
            </a>
            <div className="menu-sub menu-sub-dropdown w-175px py-4">
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
    )
}