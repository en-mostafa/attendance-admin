'use client'
import { startTransition, useActionState, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Spinner from "@/components/ui/spinner";
import { lnags } from "@/constant";
import { toast } from "react-toastify";
import Errors from "@/components/ui/errors";
import { translateRoom } from "@/services/hotelServices";
import { useTranslations } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false });


export default function TranslateRoomForm({ id } : { id: string }) {
    const t = useTranslations('Public.Hotel');
    const [selectedLang, setSelectedLang] = useState<any>(null);
    const [options, setOptions] = useState(['']);
    const [state, action, pending] = useActionState(translateRoom, null);

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])

    //Room option
    const handleChange = (i:number, value:string) => {
        const updateOption: any[] = [...options]; 
        updateOption[i] = value;
        setOptions(updateOption)
    }
    const addOption = () => {
        setOptions(pre => [...pre, '']);
    }
    const removeOption = (item: any) => {
        const newItems = options.filter(option => option !== item)
        setOptions(newItems);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('options', JSON.stringify(options));
        formData.append('id', id[0]);

        startTransition(() => 
            action(formData)
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t('title')}</label>
                        <input type="text" name="type" className={`form-control ${state?.errors?.type && 'is-invalid'}`} placeholder={t('title')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.type}</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="basic-url" className="form-label">{t("selected_lang")}</label>
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
                    <div id="kt_docs_repeater_nested" className="col-md-4">
                        <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_nested_outer">
                                {options.map((option, i) => 
                                    <div key={i} data-repeater-item>
                                        <label className="form-label">{t("options")}</label>
                                        <div className="input-group pb-3">
                                            <input 
                                                type="text" 
                                                value={option}
                                                onChange={e => handleChange(i, e.target.value)}
                                                className="form-control" 
                                                placeholder={t("options")} 
                                            />
                                            <button onClick={() => removeOption(option)} className="border border-secondary btn btn-icon btn-flex btn-light-danger" data-repeater-delete type="button">
                                                <i className="ki-duotone ki-trash fs-5"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" data-repeater-create className="btn btn-flex btn-light-primary" onClick={addOption}>
                                <i className="ki-duotone ki-plus fs-3"></i>
                                {t("add_option")}
                            </button>
                        </div>
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