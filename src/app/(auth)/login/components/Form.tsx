'use client'

import { loginForm } from "@/services/authServices";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Spinner from "../../../../components/ui/spinner";
import Errors from "../../../../components/ui/errors";


export default function Form() {
    const [isSubmitting, setIsubmitting] = useState<boolean>(false);
    const [password, setPassword] = useState(true);
    const [state, formAction, pending] = useActionState(loginForm, null)
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return
        };
        setIsubmitting(true);
        const gReCaptchaToken = await executeRecaptcha('enquiryFormSubmit');
        const formData = new FormData(e.target as HTMLFormElement);

        const response = await fetch("/api/recaptcha", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gReCaptchaToken })
        })
        if (response.status === 200) {
            startTransition(() => {
                formAction(formData)
            })
        }
        setIsubmitting(false)
    }


    return (
        <form className="form w-100" id="kt_sign_in_form" data-kt-redirect-url="index.html" onSubmit={handleSubmit}>
            <div className="text-center mb-11">
                <h1 className="text-gray-900 fw-bolder mb-3">ورود</h1>
                <div className="text-gray-500 fw-semibold fs-6">خوش آمدید</div>
            </div>
            <div className="separator separator-content my-14">
                <span className="w-125px text-gray-500 fw-semibold fs-7">شماره موبایل</span>
            </div>
            <div className="fv-row mb-8">
                <input type="text" placeholder="شماره موبایل را وارد نمایید" name="phone" autoComplete="off" className={`form-control bg-transparent ${state?.errors?.phone && 'is-invalid'}`} />
                <div id="validationServerUsernameFeedback" className="invalid-feedback">{state?.errors?.phone}</div>
            </div>
            <div className="position-relative mb-3">
                <input className={`form-control bg-transparent ${state?.errors?.password && 'is-invalid'}`} type={`${password ? 'password' : 'text'}`} placeholder="پسورد را وارد نمایید" name="password" autoComplete="off" />
                <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility" onClick={() => setPassword(!password)}>
                    <i className={`ki-outline ki-eye-slash fs-2 ${!password && 'd-none'}`}></i>
                    <i className={`ki-outline ki-eye fs-2 ${password && 'd-none'}`}></i>
                </span>
                <div id="validationServerUsernameFeedback" className="invalid-feedback">{state?.errors?.password}</div>
            </div>

            {/*button*/}
            {state?.message === 'error' && <Errors data={state?.error} />}
            <div className="d-grid mb-10">
                <button type="submit" id="kt_sign_in_submit" className="btn btn-primary" disabled={isSubmitting || pending}>
                    {(isSubmitting || pending) ? <Spinner /> : (
                        <span className="indicator-label">ورود</span>
                    )}
                </button>
            </div>
        </form>
    )
}