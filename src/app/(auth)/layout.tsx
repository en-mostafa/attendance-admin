'use client'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    const recaptchaKey: string | undefined = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
            <section>{children}</section>
        </GoogleReCaptchaProvider>
    )
}