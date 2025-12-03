'use client'
import { useLocale } from "next-intl"
import Script from "next/script"
import { Slide, ToastContainer } from "react-toastify"

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const locale = useLocale();
    return (
        <>
            <Script src="/assets/plugins/global/plugins.bundle.js" strategy="afterInteractive" />
            <Script src="/assets/js/scripts.bundle.js" strategy="afterInteractive" />
            {children}
            <ToastContainer
                hideProgressBar={true}
                theme="light"
                position="top-center"
                transition={Slide}
                rtl={locale === 'fa'}
            />
        </>
    )
}