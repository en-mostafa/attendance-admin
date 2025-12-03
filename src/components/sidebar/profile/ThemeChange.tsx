'use client'
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react"

export default function ThemeChange() {
    const [themeMode, setThemeMode] = useState<string>('light');
    const t =  useTranslations('Public');

    const handleChangeTheme = (theme: string) => {
        localStorage.setItem('data-bs-theme', theme);
        setThemeMode(theme);
    }

    useEffect(() => {
        const themeStore = localStorage.getItem('data-bs-theme') || 'light';
        setThemeMode(themeStore);
        
        document.documentElement.setAttribute('data-bs-theme', themeMode);
    }, [themeMode]);


    return (
        <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
        <a href="#" className="menu-link px-5">
            <span className="menu-title position-relative">{t('mode')} 
            <span className="ms-5 position-absolute translate-middle-y top-50 end-0">
                <i className="ki-outline ki-night-day theme-light-show fs-2"></i>
                <i className="ki-outline ki-moon theme-dark-show fs-2"></i>
            </span></span>
        </a>
        {/*begin::Menu*/}
        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu">
            <div className="menu-item px-3 my-0" onClick={() => handleChangeTheme('light')}>
                <a href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="light">
                    <span className="menu-icon" data-kt-element="icon">
                        <i className="ki-outline ki-night-day fs-2"></i>
                    </span>
                    <span className="menu-title">{t('light')}</span>
                </a>
            </div>

            <div className="menu-item px-3 my-0" onClick={() => handleChangeTheme('dark')}>
                <a href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="dark">
                    <span className="menu-icon" data-kt-element="icon">
                        <i className="ki-outline ki-moon fs-2"></i>
                    </span>
                    <span className="menu-title">{t('dark')}</span>
                </a>
            </div>
        </div>
        {/*end::Menu*/}
    </div>
    )

}