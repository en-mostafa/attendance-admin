'use client'
import DatePickerCalnender from "@/components/ui/DatePicker";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useFormatDate } from "@/hooks/useFormatDate";
import UseUploadFiles from "@/hooks/useUploadFiles";
import Editor from "./Editor";
import { editTourForm } from "@/services/tourServices";
import Spinner from "@/components/ui/spinner";
import { pipe } from "@/services/pipe";
import Areas from "./Areas";
import Errors from "@/components/ui/errors";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function EditForm({ data } : { data: any }) {
    const [price, setPrice] = useState(`${data?.price}`);
    const [dateStart, setDateStart] = useState(data?.startDate);
    const [dateEnd, setDateEnd] = useState(data?.endDate);
    const timeStart = useFormatDate(dateStart);
    const timeEnd = useFormatDate(dateEnd);
    const [files, setFiles] = useState<File | any>();
    const [description, setDescription] = useState<any>(data?.description);
    const [selectedDestination, setSelectedDestination] = useState<any>();
    const countriesID = selectedDestination?.map((country:any) => country.value);
    const [state, action, pending] = useActionState(editTourForm, null);
    const t = useTranslations('Public');
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = (e.target.value).replace(/\,/g,'');
        setPrice(value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        files.forEach((file: File) => {
            formData.append('files', file)
        });
        formData.append('price', price)
        formData.append('id', data?.id)
        formData.append('countries', JSON.stringify(countriesID));
        formData.append('description', description)
     
        startTransition(() => {
            action(formData)
        })
    }

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success('success Full')
        }
    }, [state])

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t('title')}</label>
                        <input type="text" name="title" className={`form-control ${state?.errors?.title && 'is-invalid'}`} placeholder={t('title')} defaultValue={data?.title} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.title}</div>
                    </div>
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.tour_code')}</label>
                        <input type="text" name="code" className={`form-control ${state?.errors?.code && 'is-invalid'}`} placeholder={t('Tour.tour_code')} defaultValue={data?.code} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.code}</div>
                    </div>
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t('price')} ({t('euro')})</label>
                        <input type="text" value={pipe(price)} onChange={handleChange} className={`form-control ${state?.errors?.price && 'is-invalid'}`} placeholder={`(${t('euro')}) ${t('price')}`} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.price}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.capacity')} ({t('count')})</label>
                        <input type="text" name="capacity" className={`form-control ${state?.errors?.capacity && 'is-invalid'}`} placeholder={t('Tour.capacity')} defaultValue={data?.capacity} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.capacity}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.start_date')}</label>
                        <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                            <DatePickerCalnender placeholder={timeStart} date={dateStart} setDate={setDateStart}/>
                            <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                            </span>
                            <input type="text" name="startDate" defaultValue={timeStart === '' ? data?.startDate : timeStart} hidden/>
                        </div>
                        <div className="text-danger mt-2">{state?.errors?.startDate}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.end_date')}</label>
                        <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                            <DatePickerCalnender placeholder={timeEnd} date={dateEnd} setDate={setDateEnd}/>
                            <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                            </span>
                            <input type="text" name="endDate" defaultValue={timeEnd === '' ? data?.endDate : timeEnd } hidden/>
                        </div>
                        <div className="text-danger mt-2">{state?.errors?.endDate}</div>
                    </div>
                    <Areas state={state} data={data} selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination}/>

                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.stay')}</label>
                        <input type="text" name="stay" className={`form-control ${state?.errors?.stay && 'is-invalid'}`} placeholder={t('Tour.stay')} defaultValue={data?.stay} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.stay}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.transportation')}</label>
                        <input type="text" name="transportation" className={`form-control ${state?.errors?.transportation && 'is-invalid'}`} defaultValue={data?.transportation} placeholder={t('Tour.transportation')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.transportation}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.meals')}</label>
                        <input type="text" name="meals" className={`form-control ${state?.errors?.meals && 'is-invalid'}`} placeholder={t('Tour.meals')} defaultValue={data?.meals} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.meals}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.period')}</label>
                        <input type="text" name="period" className={`form-control ${state?.errors?.period && 'is-invalid'}`} placeholder={t('Tour.period')} defaultValue={data?.period} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.period}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('discount')} ({t('percentage')})</label>
                        <input type="text" name="discount" className="form-control" placeholder="0" defaultValue={data?.discount} aria-label="Server"/>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('taxes')} ({t('percentage')})</label>
                        <input type="text" name="tax" className="form-control" placeholder="0" defaultValue={data?.tax} aria-label="Server"/>
                    </div>
                    <div className="mt-10">
                        <UseUploadFiles data={data?.images} setFiles={setFiles}/>
                    </div>
                    <div className="mt-10">
                        <Editor description={description} setDescription={setDescription}/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{ pending ? <Spinner /> : t('info_add') }</button>
                { state?.message === 'error' && <Errors data='Invalid information' /> }
            </div>
        </form>
    )
}