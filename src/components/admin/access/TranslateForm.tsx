'use client'

import Spinner from "@/components/ui/spinner";
import { lnags } from "@/constant";
import { translateAccess } from "@/services/accessServices";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify";
const Select = dynamic(() => import('react-select'), { ssr: false });

export const TranslateForm = ({ id } : { id: string }) => {
    const t = useTranslations("Public");
    const [selectedLang, setSelectedLang] = useState<any>(null);
    const [state, action, pending] = useActionState(translateAccess, null);

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])

    return (
        <form action={action}>
            <input type="hidden" name="id" defaultValue={id} />
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="basic-url" className="form-label">{t("choose_lang")}</label>
                        <Select
                            value={selectedLang}
                            onChange={setSelectedLang}
                            classNamePrefix={'react-select'}
                            options={lnags}
                            placeholder={t("choose")}
                        />
                        <input type="text" name="lang" defaultValue={selectedLang?.value} hidden/>
                        <div className="text-danger mt-2">{state?.errors?.lang}</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="basic-url" className="form-label">{t("access_name")}</label>
                        <input 
                            type="text" 
                            name="name"
                            className={`form-control ${state?.message === 'validation' && 'is-invalid'}`} 
                            placeholder={t("access_name")}
                            aria-label="Server"
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-5" disabled={pending}>{pending ? <Spinner /> : t("register")}</button>
            { state?.message === 'validation' &&  <span className="text-danger mt-2 d-block">{t("validate_name")}</span> }
        </form>
    )
}