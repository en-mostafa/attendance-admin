'use client'
import DatePickerCalnender from "@/components/ui/DatePicker";
import { startTransition, useActionState, useEffect, useMemo, useState } from "react";
import { useFormatDate } from "@/hooks/useFormatDate";
import UseUploadFiles from "@/hooks/useUploadFiles";
import dynamic from 'next/dynamic';
import Editor from "./Editor";
import { useData } from "@/hooks/useData";
import { addTourForm } from "@/services/tourServices";
import Spinner from "@/components/ui/spinner";
import { pipe } from "@/services/pipe";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false });


export default function AddForm() {
    const t = useTranslations('Public');
    const defaultValueQuill = {
    ops: [
        { insert: ` ${t('Tour.tour_description')} \n`},
    ]
   };
    const {data: countries = []} = useData('/country');
    const [price, setPrice] = useState('');
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const timeStart = useFormatDate(dateStart);
    const timeEnd = useFormatDate(dateEnd);
    const [selectedDestination, setSelectedDestination] = useState<null | any>(null);
    const [selectedCountryBegin, setSelectedCountryBegin] = useState<null | any>(null);
    const [selectedCityBegin, setSelectedCityBegin] = useState<null | any>(null);
    const [files, setFiles] = useState<File | any>(null);
    const [description, setDescription] = useState<any>(defaultValueQuill);
    const {data: cities = []} = useData(selectedCountryBegin ? `/city/${selectedCountryBegin?.value}` : null);
    const countriesID = selectedDestination?.map((country:any) => country.value);
    const router = useRouter();
    const [state, action, pending] = useActionState(addTourForm, null);

    
    useEffect(() => {
        if(state?.message === 'success') {
            toast.success('success full')
            router.push('/tour/list')
        }
    }, [state])

    const countriesOption = useMemo(
        () =>
            countries?.map((item: any) => ({
                value: item.id,
                label: item.name,
            })),
        [countries]
    );

    const citiesOption = useMemo(
        () =>
          cities?.length > 0
            ? cities?.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                }))
            : [],
        [cities]
    );

    useEffect(() => {
        setSelectedCityBegin(null)
    }, [selectedCountryBegin])

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
        formData.append('countries', JSON.stringify(countriesID));
        formData.append('description', description)
     
        startTransition(() => {
            action(formData)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t('title')}</label>
                        <input type="text" name="title" className={`form-control ${state?.errors?.title && 'is-invalid'}`} placeholder={t('title')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.title}</div>
                    </div>
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.tour_code')}</label>
                        <input type="text" name="code" className={`form-control ${state?.errors?.code && 'is-invalid'}`} placeholder={t('Tour.tour_code')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.code}</div>
                    </div>
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t('price')} ({t('euro')})</label>
                        <input type="text" value={pipe(price)} onChange={handleChange} className={`form-control ${state?.errors?.price && 'is-invalid'}`} placeholder={`${t('price')} (${t('euro')})`} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.price}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.capacity')}</label>
                        <input type="text" name="capacity" className={`form-control ${state?.errors?.capacity && 'is-invalid'}`} placeholder={t('Tour.capacity')} aria-label="Server"/>
                        <div className="invalid-feedback">{state?.errors?.capacity}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.start_date')}</label>
                        <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                            <DatePickerCalnender date={dateStart} setDate={setDateStart}/>
                            <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                            </span>
                            <input type="text" name="startDate" defaultValue={timeStart} hidden/>
                        </div>
                        <div className="text-danger mt-2">{state?.errors?.startDate}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.end_date')}</label>
                        <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                            <DatePickerCalnender date={dateEnd} setDate={setDateEnd}/>
                            <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                            </span>
                            <input type="text" name="endDate" defaultValue={timeEnd} hidden/>
                        </div>
                        <div className="text-danger mt-2">{state?.errors?.endDate}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.origin_country_selection')}</label>
                        <Select
                            value={selectedCountryBegin}
                            classNamePrefix={'react-select'}
                            onChange={setSelectedCountryBegin}
                            options={countriesOption}
                            placeholder={t('choose')}
                        />
                        <input type="text" name="route" defaultValue={selectedCountryBegin?.value} hidden/>
                    </div>
                    <div className="col-md-4 mt-4 ">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.origin_city_selection')}</label>
                        <Select
                            value={selectedCityBegin}
                            classNamePrefix={'react-select'}
                            onChange={setSelectedCityBegin}
                            options={citiesOption}
                            placeholder={t('choose')}
                        />
                        <input type="text" name="originCityId" defaultValue={selectedCityBegin?.value} hidden/>
                        <div className="text-danger mt-2">{state?.errors?.originCityId}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('Tour.destination_countries_selection')}</label>
                        <Select
                            value={selectedDestination}
                            classNamePrefix={'react-select'}
                            onChange={setSelectedDestination}
                            options={countriesOption}
                            placeholder={t('choose')}
                            isMulti
                        />
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
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('discount')} ({t('percentage')})</label>
                        <input type="number" name="discount" className="form-control" placeholder={t('enter_number')} aria-label="Server"/>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t('taxes')} ({t('percentage')})</label>
                        <input type="number" name="tax" className="form-control" placeholder={t('enter_number')} aria-label="Server"/>
                    </div>
                    <div className="mt-10">
                        <UseUploadFiles setFiles={setFiles}/>
                    </div>
                    <div className="mt-10">
                        <Editor description={description} setDescription={setDescription}/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{ pending ? <Spinner /> : t('info_recording') }</button>
                { state?.message === 'error' && <span className="text-danger d-block mt-3">{state?.error}</span> }
            </div>
        </form>
    )
}