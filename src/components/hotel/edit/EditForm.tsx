'use client'
import { startTransition, useActionState, useEffect, useState } from "react";
import UseUploadFiles from "@/hooks/useUploadFiles";
import dynamic from 'next/dynamic';
import Editor from "./Editor";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { updateHotelForm } from "@/services/hotelServices";
import Areas from "./Areas";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
const Map = dynamic(() => import('../map/Map'), { ssr: false });


export default function EditForm({ data } : { data:any }) {
    const t = useTranslations('Public.Hotel');
    const [files, setFiles] = useState<File | any>(null);
    const [description, setDescription] = useState<any>(data?.description);
    const [options, setOptions] = useState(data?.options);
    const [position, setPosition] = useState<any>([Number(data?.latitude), Number(data?.longitude)]);
    const [state, action, pending] = useActionState(updateHotelForm, null);
    
    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])


    //Hotel option
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
        const newItem = options.filter((input:any, index:number) => index !== i);
        setOptions(newItem)
    }
   
   
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('id', `${data?.id}`)
        files.forEach((file: File) => {
            formData.append('files', file)
        });
        formData.append("latitude", position.lat ?? Number(data?.latitude))
        formData.append("longitude", position.lng ?? Number(data?.longitude))
        formData.append("description", description)
        formData.append('options', JSON.stringify(options))
        startTransition(() => {
            action(formData)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t("hotel_name")}</label>
                        <input type="text" name="name" className={`form-control ${state?.errors?.name && 'is-invalid'}`} defaultValue={data?.name} placeholder={t('title')} aria-label="Server" />
                        <div className="invalid-feedback">{state?.errors?.name}</div>
                    </div>
                    <Areas state={state} data={data} />
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t("star")} ({t('digit')})</label>
                        <input type="text" name="stars" className={`form-control ${state?.errors?.stars && 'is-invalid'}`} defaultValue={data?.stars} placeholder={t('star')} aria-label="Server" />
                        <div className="invalid-feedback">{state?.errors?.stars}</div>
                    </div>
                    <div className="col-md-8 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t("hotel_address")}</label>
                        <input type="text" name="address" className={`form-control ${state?.errors?.address && 'is-invalid'}`} defaultValue={data?.address} placeholder={t("hotel_address")} aria-label="Server" />
                        <div className="invalid-feedback">{state?.errors?.address}</div>
                    </div>
                    <div id="kt_docs_repeater_nested" className="mt-4">
                        <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_nested_outer">
                                {options.map((option:any, index:number) => (
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
                    <div className="mt-10">
                        <UseUploadFiles data={data?.images} setFiles={setFiles} />
                    </div>
                    <div className="mt-10">
                        <Editor description={description} setDescription={setDescription} />
                    </div>
                    <div className="mt-20">
                        <label htmlFor="basic-url" className="form-label form-label fw-bold fs-3">{t("hotel_location")}</label>
                        <Map position={position} setPosition={setPosition}/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{pending ? <Spinner /> : t("info_add")}</button>
                { state?.message === 'error' && <span className="text-danger d-block mt-3">{state?.error}</span> }
            </div>
        </form>
    )
}