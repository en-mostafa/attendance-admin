'use client'

import { startTransition, useActionState, useEffect, useMemo, useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import dynamic from 'next/dynamic';
import { useData } from "@/hooks/useData";
import { genderOptin, maritalStatus } from "@/constant";
import Avatar from "./Avatar";
import { updateUser } from "@/services/userServices";
import { useFormatDate } from "@/hooks/useFormatDate";
import DatePickerCalnender from "@/components/ui/DatePicker";
import { useJalaliFormat } from "@/services/formatDate";
import UserStatus from "./UserStatus";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import MarketerStatus from "./MarketerStatus";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function General({ data }: { data:any }) {
    const t =  useTranslations('Public');
    const currentMarried = data?.client.displayName ? { value:data?.client.displayName, label:data?.client.displayName === 'Married' ? t('User.married'): t('User.single') } : null;
    const currentGender = data?.client.gender ? { value:data?.client.gender, label:data?.client.gender === 'female' ? t('female'): t('male') } : null;
    const {data: countries = []} = useData('/country');
    const {data: category = []} = useData('/account/category');
    const [phone, setPhone] = useState<any>(data?.cellphone);
    const [email, setEmail] = useState<any>(data?.email);
    const [country, setCountry] = useState<null | any>(null);
    const [issuingCountry, setIssuingCountry] = useState<null | any>();
    const [nationality, setNationality] = useState<null | any>();
    const [city, setCity] = useState<null | any>(null);
    const locale = useLocale();
    const [birthDate, setBirthDate] = useState(useJalaliFormat(data?.client?.birthDate, locale));
    const [expiryDate, setExpiryDate] = useState(useJalaliFormat(data?.client?.passportDetails?.expiryDate, locale));
    const [gender, setGender] = useState<any>(currentGender);
    const [married, setMarried] = useState<any>(currentMarried);
    const [selectedLevel, setSelectedLevel] = useState<any>({value:data?.client.level, label:data?.client.level});
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const {data: cities = []} = useData(country ? `/city/${country?.value}` : null);
    const [avatar, setAvatar] = useState<any>(null);
    const date: any = expiryDate ? useFormatDate(expiryDate) : null;
    const birthDatejalali: any = birthDate ? useFormatDate(birthDate) : null;
    const [state, action, pending] = useActionState(updateUser, null);

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])

    useEffect(() => {
        if(data?.client?.passportDetails) {
            const item = countries?.find((country: any) => country?.id === data?.client?.address?.country);
            const issuCountry = countries?.find((country: any) => country?.id === data?.client?.passportDetails?.issuingCountry);
            const national = countries?.find((country: any) => country?.id === data?.client?.passportDetails?.nationality);
            setIssuingCountry({ value: issuCountry?.id, label: issuCountry?.name })
            setNationality({ value: national?.id, label: national?.name })
            setCountry({ value: item?.id, label: item?.name })
        }
    }, [countries])

    useEffect(() => {
        if(data?.client?.categoryId) {
            const item = category?.find((category: any) => category?.id === data?.client?.categoryId)
            setSelectedCategory({ value: item?.id, label: item?.name })
        }
    }, [category])

  

        
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
        if(data?.client?.address?.city) {
            const item = citiesOption?.find((city: any) => city?.value === data?.client?.address?.city)
            setCity(item)
        }
    }, [citiesOption])

    const categories = useMemo(
        () =>
            category?.length > 0
            ? category?.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                }))
            : [],
        [category]
    );
    
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
   
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('file', avatar)
        formData.append('id', data?.id)
        formData.append('displayName', married?.value)
        formData.append('gender', gender?.value ?? 'other')

        if(data?.cellphone !== phone) {
            formData.append('cellphone', phone)
        } 
        if(data?.email !== email) {
            formData.append('email', email)
        } 
        startTransition(() => {
            action(formData)
        })
    }

    return (
        <div className="flex-lg-row-fluid ms-lg-15">
            <div className="card pt-4 mb-6 mb-xl-9">
                <div className="card-header border-0">
                    <div className="card-title">
                        <h2>{t('general')}</h2>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="card-body mt-10">
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">{t('avatar')}</label>
                        <div className="col-lg-8">
                            <Avatar profile={data?.profileImage} setFile={setAvatar}/>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                           {t('user_name')}
                        </label>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-6 fv-row">
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        defaultValue={data?.client.firstName}
                                        className={`form-control ${state?.errors?.firstName && 'is-invalid'}`} 
                                        placeholder={t('name')}
                                        aria-label="Server" 
                                    />
                                    <div className="invalid-feedback">{state?.errors?.firstName}</div>
                                </div>
                                <div className="col-lg-6 fv-row">
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        defaultValue={data?.client.lastName}
                                        className={`form-control ${state?.errors?.lastName && 'is-invalid'}`} 
                                        placeholder={t('last_name')}
                                        aria-label="Server" 
                                    />
                                    <div className="invalid-feedback">{state?.errors?.lastName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('id')}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                defaultValue={data?.id} 
                                className='form-control form-control-solid' 
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('User.user_type')}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                defaultValue={t('real_user')}
                                className='form-control form-control-solid' 
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('email')}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={`form-control ${state?.errors?.email && 'is-invalid'}`} 
                            />
                            <div className="invalid-feedback">{state?.errors?.email}</div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('date_of_birth')}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <div className="input-group flex-nowrap">
                                <DatePickerCalnender placeholder={birthDatejalali} date={birthDate ?? null} setDate={setBirthDate}/>
                                <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                    <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                </span>
                                <input type="text" name="birthDate" defaultValue={birthDatejalali} hidden/>
                            </div>
                            <div className="invalid-feedback">{state?.errors?.birthDate}</div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('national_id')}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                name="nationalCode"
                                defaultValue={data?.client.nationalCode}
                                className={`form-control ${state?.errors?.nationalCode && 'is-invalid'}`} 
                            />
                            <div className="invalid-feedback">{state?.errors?.nationalCode}</div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('contact_number')}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <PhoneInput
                                international
                                defaultCountry="IR"
                                value={phone}
                                onChange={setPhone}
                                className="h-40px"
                            />
                            <div className="invalid-feedback">{state?.errors?.cellphone}</div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('gender')}</span>
                        </label>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-6 fv-row mt-4">
                                    <Select
                                        value={gender}
                                        classNamePrefix={'react-select'}
                                        onChange={setGender}
                                        options={genderOptin}
                                        placeholder={t('gender')}
                                    />
                                    <div className="text-danger mt-2">{state?.errors?.gender}</div>
                                </div>
                                <div className="col-lg-6 fv-row mt-4">
                                    <Select
                                        value={married}
                                        classNamePrefix={'react-select'}
                                        onChange={setMarried}
                                        options={maritalStatus}
                                        placeholder={t('User.marital_status')}
                                    />
                                    <div className="text-danger mt-2">{state?.errors?.displayName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span>{t('level_vs_category')}</span>
                        </label>
                        <div className="col-lg-4 fv-row">
                            <Select
                                value={selectedLevel}
                                classNamePrefix={'react-select'}
                                onChange={setSelectedLevel}
                                options={[
                                    {value:1, label:1},
                                    {value:2, label:2},
                                    {value:3, label:3},
                                    {value:4, label:4},
                                    {value:5, label:5},
                                    {value:6, label:6},
                                    {value:7, label:7},
                                    {value:8, label:8},
                                    {value:9, label:9},
                                    {value:10, label:10}
                                ]}
                                placeholder={t('choose')}
                            />
                            <input type="hidden" name="level" defaultValue={selectedLevel?.value} />
                        </div>
                        <div className="col-lg-4 fv-row">
                            <Select
                                value={selectedCategory}
                                classNamePrefix={'react-select'}
                                onChange={setSelectedCategory}
                                placeholder={t('category')}
                                options={categories}
                            />
                            <input type="hidden" name="categoryId" defaultValue={selectedCategory?.value} />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('address')}</span>
                        </label>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-6 fv-row">
                                    <Select
                                        value={country}
                                        classNamePrefix={'react-select'}
                                        onChange={setCountry}
                                        options={countriesOption}
                                        placeholder={t('country_selection')}
                                    />
                                    <input type="text" name="country" defaultValue={country?.value} hidden/>
                                    <div className="text-danger mt-2">{state?.errors?.country}</div>
                                </div>
                                <div className="col-lg-6 fv-row">
                                    <Select
                                        value={city}
                                        classNamePrefix={'react-select'}
                                        onChange={setCity}
                                        options={citiesOption}
                                        placeholder={t('city_selection')}
                                    />
                                    <input type="text" name="city" defaultValue={city?.value} hidden/>
                                    <div className="text-danger mt-2">{state?.errors?.city}</div>
                                </div>
                                <div className="col-lg-12 fv-row">
                                    <input 
                                        type="text" 
                                        name="postCode" 
                                        defaultValue={data?.client?.address?.postCode}
                                        className={`form-control ${state?.errors?.postCode && 'is-invalid'}`} 
                                        placeholder={t('postal_code')} 
                                        aria-label="Server" 
                                    />
                                    <div className="invalid-feedback">{state?.errors?.postCode}</div>
                                </div>
                                <div className="col-lg-12 mt-4 fv-row">
                                    <textarea 
                                        className="form-control form-control" 
                                        rows={3} name="address"
                                          defaultValue={data?.client?.address?.address} placeholder={t('address')}>
                                        </textarea>
                                    <div className="invalid-feedback">{state?.errors?.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('User.passport')}</span>
                        </label>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-6 fv-row">
                                    <input 
                                        type="text" 
                                        name="firstNamePassport" 
                                        defaultValue={data?.client?.passportDetails?.firstName}
                                        className={`form-control ${state?.errors?.firstNamePassport && 'is-invalid'}`} 
                                        placeholder={t('name')}
                                        aria-label="Server" 
                                    />
                                    <div className="invalid-feedback">{state?.errors?.firstNamePassport}</div>
                                </div>
                                <div className="col-lg-6 fv-row">
                                    <input 
                                        type="text" 
                                        name="lastNamePassport" 
                                        defaultValue={data?.client?.passportDetails?.lastName}
                                        className={`form-control ${state?.errors?.lastNamePassport && 'is-invalid'}`} 
                                        placeholder={t('last_name')}
                                        aria-label="Server" 
                                    />
                                    <div className="invalid-feedback">{state?.errors?.lastNamePassport}</div>
                                </div>
                                <div className="col-lg-6 fv-row mt-4">
                                    <Select
                                        value={issuingCountry}
                                        classNamePrefix={'react-select'}
                                        onChange={setIssuingCountry}
                                        options={countriesOption}
                                        placeholder={t('exporting_country')}
                                    />
                                    <input type="text" name="issuingCountry" defaultValue={issuingCountry?.value} hidden/>
                                    <div className="text-danger mt-2">{state?.errors?.issuingCountry}</div>
                                </div>
                                <div className="col-lg-6 fv-row mt-4">
                                    <Select
                                        value={nationality}
                                        classNamePrefix={'react-select'}
                                        onChange={setNationality}
                                        options={countriesOption}
                                        placeholder={t('User.nationality')}
                                    />
                                    <input type="text" name="nationality" defaultValue={nationality?.value} hidden/>
                                    <div className="text-danger mt-2">{state?.errors?.nationality}</div>
                                </div>
                                <div className="col-lg-6 fv-row">
                                    <input 
                                        type="text" 
                                        name="passportNumber" 
                                        defaultValue={data?.client?.passportDetails?.passportNumber}
                                        className={`form-control ${state?.errors?.passportNumber && 'is-invalid'}`} 
                                        placeholder={t('User.passport_number')} 
                                        aria-label="Server" 
                                    />
                                    <div className="invalid-feedback">{state?.errors?.passportNumber}</div>
                                </div>
                                <div className="col-lg-6 fv-row">
                                    <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                        <DatePickerCalnender placeholder={date} date={expiryDate} setDate={setExpiryDate}/>
                                        <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                            <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                        </span>
                                        <input type="text" name="expiryDate" defaultValue={date} hidden/>
                                    </div>
                                    <div className="invalid-feedback">{state?.errors?.expiryDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('acount_status')}</span>
                        </label>
                        <UserStatus data={data} />
                    </div>
                    <div className="d-flex mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('marketer_status')}</span>
                        </label>
                        <MarketerStatus data={data}/>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{pending ? <Spinner /> : t('info_add')}</button>
                        { state?.message === 'error' && <span className="text-danger d-block mt-3">{state?.error}</span> }
                    </div>
                </form>
            </div>
        </div>
    )
}