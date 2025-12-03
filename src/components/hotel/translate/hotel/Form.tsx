'use client'
import { startTransition, useActionState, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Editor from "./Editor";
import Spinner from "@/components/ui/spinner";
import { defaultValueQuill, defaultValueQuillHotel, lnags } from "@/constant";
import { toast } from "react-toastify";
import Errors from "@/components/ui/errors";
import { Link } from "@/i18n/routing";
import { translateHotelForm } from "@/services/hotelServices";
import { useTranslations } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false });


export default function TranslateForm({ id } : { id: string }) {
    const t = useTranslations('Public.Hotel');
    const [selectedLang, setSelectedLang] = useState<any>(null);
    const [description, setDescription] = useState<any>(defaultValueQuillHotel);
    const [options, setOptions] = useState([{ title:'', icon:'' }]);
    const [state, action, pending] = useActionState(translateHotelForm, null);

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])

    const handleChange = (index: number, name: string, value: string) => {
        const data: any[] = [...options];
        data[index][name] = value
        setOptions(data)
    }
    const addOption = () => {
        let newInput = { title:'', icon:'' };
        setOptions([...options, newInput])
    }
    const removeOption = (i: number) => {
        const newItem = options.filter((input, index) => index !== i);
        setOptions(newItem)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('options', JSON.stringify(options))

        startTransition(() => 
            action(formData)
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t("title")}</label>
                        <input type="text" name="name" className={`form-control ${state?.errors?.name && 'is-invalid'}`} placeholder={t("title")} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.name}</div>
                    </div>
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t("hotel_address")}</label>
                        <input type="text" name="address" className={`form-control ${state?.errors?.address && 'is-invalid'}`} placeholder={t("hotel_address")} aria-label="Server" />
                        <div className="invalid-feedback">{state?.errors?.address}</div>
                    </div>
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t("selected_lang")}</label>
                        <Select
                            value={selectedLang}
                            classNamePrefix={'react-select'}
                            onChange={setSelectedLang}
                            options={lnags}
                            placeholder={t("choose")}
                        />
                        <input type="text" name="lang" defaultValue={selectedLang?.value} hidden/>
                        <div className="text-danger mt-2">{state?.errors?.lang}</div>
                    </div>
                    <div id="kt_docs_repeater_nested" className="mt-4">
                        <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_nested_outer">
                                {options.map((option, index) => (
                                    <div key={index} data-repeater-item>
                                        <div className="form-group row mb-5">
                                            <div className="col-md-4">
                                                <label className="form-label">{t("hotel_option")}</label>
                                                <input 
                                                    type="text" 
                                                    name="title" 
                                                    value={option.title}
                                                    onChange={e => handleChange(index, 'title', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t("options")}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">{t("icon")}</label>
                                                <input 
                                                    type="text" 
                                                    name="icon" 
                                                    value={option.icon}
                                                    onChange={e => handleChange(index, 'icon', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={`${t("example")}: bx bx-buildings`} 
                                                />
                                                <Link href="https://boxicons.com/" target="_blank" className="text-primary text-decoration-underline mt-1 d-inline-block">{t("get_icon")}</Link>
                                            </div>
                                            <div className="col-md-2 mt-8" onClick={() => removeOption(index)}>
                                                <button type="button" data-repeater-delete className="btn mx-2 btn-flex btn-light-danger">
                                                    {t("delete")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" data-repeater-create className="btn btn-flex btn-light-primary" onClick={addOption}>
                                <i className="ki-duotone ki-plus fs-3"></i>
                                {t("add_option")}
                            </button>
                        </div>
                    </div>
                    <input type="text" name="id" defaultValue={id} hidden/>
                    <div className="mt-10">
                        <Editor description={description} setDescription={setDescription}/>
                        <input type="text" name="description" defaultValue={description} hidden/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{ pending ? <Spinner /> : t("info_add") }</button>
                { state?.message === 'error' && <Errors data={state.error} /> }
            </div>
        </form>
    )
}