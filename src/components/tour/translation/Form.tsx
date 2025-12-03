'use client'
import { useActionState, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Editor from "./Editor";
import { translateTourForm } from "@/services/tourServices";
import Spinner from "@/components/ui/spinner";
import { defaultValueQuill, lnags } from "@/constant";
import { toast } from "react-toastify";
import Errors from "@/components/ui/errors";
import { useTranslations } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false });


export default function TranslateForm({ id } : { id: string }) {
    const [selectedLang, setSelectedLang] = useState<any>(null);
    const [description, setDescription] = useState<any>(defaultValueQuill);
    const [state, action, pending] = useActionState(translateTourForm, null);
    const t =  useTranslations('Public');

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])

    return (
        <form action={action}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t('title')}</label>
                        <input type="text" name="title" className={`form-control ${state?.errors?.title && 'is-invalid'}`} placeholder={t('title')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.title}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.stay')}</label>
                        <input type="text" name="stay" className={`form-control ${state?.errors?.stay && 'is-invalid'}`} placeholder={t('Tour.stay')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.stay}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.transportation')}</label>
                        <input type="text" name="transportation" className={`form-control ${state?.errors?.transportation && 'is-invalid'}`} placeholder={t('Tour.transportation')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.transportation}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.meals')}</label>
                        <input type="text" name="meals" className={`form-control ${state?.errors?.meals && 'is-invalid'}`} placeholder={t('Tour.meals')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.meals}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.period')}</label>
                        <input type="text" name="period" className={`form-control ${state?.errors?.period && 'is-invalid'}`} placeholder={t('Tour.period')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.period}</div>
                    </div>
                    <div className="col-md-4 mt-4 ">
                        <label htmlFor="basic-url" className="form-label">{t('choose_lang')}</label>
                        <Select
                            value={selectedLang}
                            classNamePrefix={'react-select'}
                            onChange={setSelectedLang}
                            options={lnags}
                            placeholder={t('choose')}
                        />
                        <input type="text" name="lang" defaultValue={selectedLang?.value} hidden/>
                        <div className="text-danger mt-2">{state?.errors?.lang}</div>
                    </div>
                    <input type="text" name="id" defaultValue={id} hidden/>
                    <div className="mt-10">
                        <Editor description={description} setDescription={setDescription}/>
                        <input type="text" name="description" defaultValue={description} hidden/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{ pending ? <Spinner /> : t('info_add') }</button>
                { state?.message === 'error' && <Errors data={state.error} /> }
            </div>
        </form>
    )
}