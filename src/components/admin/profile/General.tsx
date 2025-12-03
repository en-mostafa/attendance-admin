'use client'

import { startTransition, useActionState, useEffect, useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useData } from "@/hooks/useData";
import Avatar from "./Avatar";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { pipe } from "@/services/pipe";
import { updateProfileAdmin } from "@/services/adminServices";
import { useTranslations } from "next-intl";

export default function General({ data }: { data:any }) {
    const t = useTranslations('Public');
    const { data: access } = useData('/admin/access');
    const [phone, setPhone] = useState<any>(data?.cellphone);
    const [avatar, setAvatar] = useState<any>();
    const [selectedAccess, setSelectedAccess] = useState<null | any>(null);
    const [email, setEmail] = useState(data?.email);
    const [password, setPassword] = useState(true);
    const [passwordValue, setPasswordValue] = useState('');
    const [state, action, pending] = useActionState(updateProfileAdmin, null);

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])

    useEffect(() => {
        if(data?.userAccess[0]?.accessId) {
            const item = access?.find((acc: any) => acc?.id === data?.userAccess[0].accessId);
            setSelectedAccess({ value: item?.id, label: item?.name });
        }
    }, [access])
  

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('file', avatar)
        
        if(data?.cellphone !== phone) {
            formData.append('cellphone', phone)
        } 
        if(data?.email !== email) {
            formData.append('email', email)
        } 
        if(passwordValue) {
            formData.append('password', passwordValue)
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
                        <h2>{t("general")}</h2>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="card-body mt-10">
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">{t("avatar")}</label>
                        <div className="col-lg-8">
                            <Avatar setFile={setAvatar}/>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label required fw-semibold fs-6"> 
                            {t("user_name")}
                        </label>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-6 fv-row">
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        defaultValue={data?.client?.firstName}
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
                                        defaultValue={data?.client?.lastName}
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
                            <span className="required">{t('email')}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={`form-control ${state?.errors?.email && 'is-invalid'}`} 
                            />
                            <div className="invalid-feedback">{state?.errors?.email}</div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t('phone_number')}</span>
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
                            <span className="required">{t("user_level")}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                defaultValue={data?.admin?.level} 
                                className='form-control form-control-solid' 
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t("access_level")}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                defaultValue={selectedAccess?.label ?? t("access_full")} 
                                className='form-control form-control-solid' 
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t("insurance")}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                defaultValue={data?.admin?.insurance ? t('have') : t('not_have')}
                                className='form-control form-control-solid' 
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required"> {t("salary_month")} ({t("euro")})</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                defaultValue={pipe(data?.admin?.salary)}
                                className='form-control form-control-solid' 
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span>{t("reward")} ({t("euro")})</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                defaultValue={pipe(data?.admin?.reward)}
                                className='form-control form-control-solid' 
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t("password")}</span>
                        </label>
                        <div className="col-lg-8 fv-row position-relative">
                            <input 
                                className={`form-control bg-transparent ${state?.errors?.password && 'is-invalid'}`} 
                                type={`${password ? 'password' : 'text'}`} 
                                placeholder="password" 
                                value={passwordValue}
                                onChange={e => setPasswordValue(e.target.value)}
                                autoComplete="off"
                            />
                            <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility" onClick={() => setPassword(!password)}>
                                <i className="ki-outline ki-eye-slash fs-2"></i>
                                <i className="ki-outline ki-eye fs-2 d-none"></i>
                            </span>
                        </div>
                    </div>
                    <div className="d-flex mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t("account_status")}</span>
                        </label>
                        <div className="form-check form-check-solid form-check-custom form-switch d-flex mx-3">
                            <input 
                                type="checkbox" 
                                checked={data?.deletedAt === null ? true : false} 
                                className="form-check-input w-45px h-30px mt-3 mb-2"  
                                readOnly
                            />
                            <label className="form-check-label " htmlFor="githubswitch">{data?.deletedAt === null ? t("active") : t('not_active')}</label>
                        </div>
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