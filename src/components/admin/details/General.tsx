'use client'

import { startTransition, useActionState, useEffect, useMemo, useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import dynamic from 'next/dynamic';
import { useData } from "@/hooks/useData";
import Avatar from "./Avatar";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import AdminStatus from "./AdminStatus";
import { pipe } from "@/services/pipe";
import { updateAdmin } from "@/services/adminServices";
import { useTranslations } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function General({ data }: { data:any }) {
    const t = useTranslations('Public');
    const { data: access } = useData('/admin/access');
    const [phone, setPhone] = useState<any>(data?.cellphone);
    const [avatar, setAvatar] = useState<any>();
    const [selectedAccess, setSelectedAccess] = useState<null | any>(null);
    const [selectedLevel, setSelectedLevel] = useState<null | any>({value: data?.admin?.level, label: data?.admin?.level});
    const [selectedInsurance, setSelectedInsurance] = useState<null | any>({value: data?.admin?.insurance, label: data?.admin?.insurance ? t("have") : t("not_have")});
    const [email, setEmail] = useState(data?.email);
    const [salary, setSalary] = useState(data?.admin.salary);
    const [reward, setReward] = useState(data?.admin.reward);
    const [password, setPassword] = useState(true);
    const [passwordValue, setPasswordValue] = useState('');
    const [state, action, pending] = useActionState(updateAdmin, null);

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        }
    }, [state])

    useEffect(() => {
        const item = access?.find((acc: any) => acc?.id === data?.userAccess[0]?.accessId);
        setSelectedAccess({ value: item?.id, label: item?.name })
    }, [access])

    const accessOption = useMemo(
        () =>
            access?.map((item: any) => ({
                value: item.id,
                label: item.name,
            })),
        [access]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = (e.target.value).replace(/\,/g,'');
        setSalary(value)
    }
    const handleChangeReward = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = (e.target.value).replace(/\,/g,'');
        setReward(value)
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('file', avatar)
        formData.append('id', data?.id)
        formData.append('level', selectedLevel?.value)
        formData.append('insurance', selectedInsurance.value)
        
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
                                        placeholder={t("name")} 
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
                                        placeholder={t("last_name")} 
                                        aria-label="Server" 
                                    />
                                    <div className="invalid-feedback">{state?.errors?.lastName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t("id")}</span>
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
                            <span className="required">{t("email")}</span>
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
                            <span className="required">{t("phone_number")}</span>
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
                            <Select
                                value={selectedLevel}
                                onChange={setSelectedLevel}
                                classNamePrefix={'react-select'}
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
                                placeholder={t("choose")}
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t("access_level")}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <Select
                                value={selectedAccess}
                                classNamePrefix={'react-select'}
                                onChange={setSelectedAccess}
                                options={accessOption}
                                placeholder={t("choose")}
                            />
                            <input type="text" name="accessId" defaultValue={selectedAccess?.value} hidden/>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t("insurance")}</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <Select
                                value={selectedInsurance}
                                classNamePrefix={'react-select'}
                                onChange={setSelectedInsurance}
                                options={[
                                    {value: true, label: t("have")},
                                    {value: false, label: t("not_have")}
                                ]}
                                placeholder={t("choose")}
                            />
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span className="required">{t("salary_month")} ({t("euro")})</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                value={pipe(salary)}
                                onChange={handleChange}
                                className={`form-control ${state?.errors?.lastName && 'is-invalid'}`} 
                                placeholder={t("salary_month")} 
                            />
                            <input type="hidden" name="salary" defaultValue={salary} />
                            <div className="invalid-feedback">{state?.errors?.salary}</div>
                        </div>
                    </div>
                    <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                            <span>{t("reward")} ({t("euro")})</span>
                        </label>
                        <div className="col-lg-8 fv-row">
                            <input 
                                type="text" 
                                value={pipe(reward)}
                                onChange={handleChangeReward}
                                className={`form-control ${state?.errors?.reward && 'is-invalid'}`} 
                                placeholder={t("required_number")}
                            />
                            <input type="hidden" name="reward" defaultValue={reward} />
                            <div className="invalid-feedback">{state?.errors?.reward}</div>
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
                            <span className="required">{t("acount_status")}</span>
                        </label>
                        <AdminStatus data={data}/>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{pending ? <Spinner /> : t("info_add")}</button>
                        { state?.message === 'error' && <span className="text-danger d-block mt-3">{state?.error}</span> }
                    </div>
                </form>
            </div>
        </div>
    )
}