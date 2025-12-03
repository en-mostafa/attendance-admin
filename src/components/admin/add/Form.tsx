
'use client'
import Spinner from "@/components/ui/spinner";
import { useActionState, useEffect, useMemo, useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/routing";
import dynamic from "next/dynamic";
import { useData } from "@/hooks/useData";
import { pipe } from "@/services/pipe";
import { addAdmin } from "@/services/adminServices";
import { useTranslations } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false });

export const FormAdd = () => {
    const t = useTranslations("Public");
    const { data } = useData('/admin/access');
    const router = useRouter();
    const [phone, setPhone] = useState<string>();
    const [password, setPassword] = useState(true);
    const [salary, setSalary] = useState('');
    const [reward, setReward] = useState('');
    const [selectedAccess, setSelectedAccess] = useState<null | any>(null);
    const [selectedLevel, setSelectedLevel] = useState<null | any>(null);
    const [selectedInsurance, setSelectedInsurance] = useState<null | any>(null);
    const [state, action, pending] = useActionState(addAdmin, null);
 
    const accessOption = useMemo(
        () =>
            data?.map((item: any) => ({
                value: item.id,
                label: item.name,
            })),
        [data]
    );

    useEffect(() => {
        if(state?.message === 'success') {
            router.push('/admin')
            toast.success(t("toast_success"))
        }
    }, [state])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = (e.target.value).replace(/\,/g,'');
        setSalary(value)
    }
    const handleChangeReward = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = (e.target.value).replace(/\,/g,'');
        setReward(value)
    }
    return (
        <form action={action} className="form">
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="basic-url" className="form-label">{t("name")}</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        className={`form-control ${state?.errors?.firstName && 'is-invalid'}`} 
                        placeholder={t("name")}
                    />
                    <div className="invalid-feedback">{state?.errors?.firstName}</div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="basic-url" className="form-label">{t("last_name")}</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        className={`form-control ${state?.errors?.lastName && 'is-invalid'}`} 
                        placeholder={t("last_name")}
                    />
                    <div className="invalid-feedback">{state?.errors?.lastName}</div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="basic-url" className="form-label"> {t("salary_month")} ({t("euro")})</label>
                    <input 
                        type="text" 
                        value={pipe(salary)}
                        onChange={handleChange}
                        className={`form-control ${state?.errors?.salary && 'is-invalid'}`} 
                        placeholder={t("salary_month")}
                    />
                    <input type="hidden" name="salary" defaultValue={salary} />
                    <div className="invalid-feedback">{state?.errors?.salary}</div>
                </div>
                <div className="col-md-4 mt-4">
                    <label htmlFor="basic-url" className="form-label">{t("reward")} ({t("euro")})</label>
                    <input 
                        type="text" 
                        value={pipe(reward)}
                        onChange={handleChangeReward}
                        className={`form-control ${state?.errors?.reward && 'is-invalid'}`} 
                        placeholder={t("reward")} 
                    />
                    <input type="hidden" name="reward" defaultValue={reward} />
                    <div className="invalid-feedback">{state?.errors?.reward}</div>
                </div>
                <div className="col-md-4 mt-4">
                    <label htmlFor="basic-url" className="form-label">{t("email")}</label>
                    <input 
                        type="text" 
                        name="email" 
                        className={`form-control ${state?.errors?.email && 'is-invalid'}`} 
                        placeholder={t("email")} 
                    />
                    <div className="invalid-feedback">{state?.errors?.email}</div>
                </div>
                <div className="col-md-4 mt-4">
                    <label htmlFor="basic-url" className="form-label">{t("phone_number")}</label>
                    <PhoneInput
                        international
                        defaultCountry="IR"
                        value={phone}
                        onChange={setPhone}
                        className="h-40px"
                    />
                    <input type="text" name="cellphone" defaultValue={phone} className={`form-control ${state?.errors?.cellphone && 'is-invalid'}`} hidden/>
                    <div className="invalid-feedback">{state?.errors?.cellphone}</div>
                </div>
                <div className="col-md-4 mt-4">
                    <label htmlFor="basic-url" className="form-label">{t("password")}</label>
                    <div className="position-relative ">
                        <input className={`form-control bg-transparent ${state?.errors?.password && 'is-invalid'}`} type={`${password ? 'password' : 'text'}`} placeholder="password" name="password" autoComplete="off"/>
                        <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility" onClick={() => setPassword(!password)}>
                            <i className={`ki-outline ki-eye-slash fs-2 ${!password && 'd-none'}`}></i>
                            <i className={`ki-outline ki-eye fs-2 ${password && 'd-none'}`}></i>
                        </span>
                        <div className="invalid-feedback">{state?.errors?.password}</div>
                    </div>
                </div>
                <div className="col-md-4 mt-4">
                    <label htmlFor="basic-url" className="form-label">{t("access_choose")}</label>
                    <Select
                        value={selectedAccess}
                        onChange={setSelectedAccess}
                        options={accessOption}
                        placeholder={t('choose')}
                        classNamePrefix={'react-select'}
                    />
                    <input type="text" name="accessId" defaultValue={selectedAccess?.value} hidden/>
                    {state?.errors?.accessId && <span className="text-danger mt-2 d-block">{state?.errors.accessId}</span>}
                </div>
                <div className="col-md-4 mt-4">
                    <label htmlFor="basic-url" className="form-label">{t("access_level")}</label>
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
                    <input type="text" name="level" defaultValue={selectedLevel?.value} hidden/>
                    {state?.errors?.level && <span className="text-danger mt-2 d-block">{state?.errors.level}</span>}
                </div>
                <div className="col-md-4 mt-4">
                    <label htmlFor="basic-url" className="form-label">{t("insurance")}</label>
                    <Select
                        value={selectedInsurance}
                        onChange={setSelectedInsurance}
                        classNamePrefix={'react-select'}
                        options={[
                            {value: true, label: t('have')},
                            {value: false, label: t('not_have')}
                        ]}
                        placeholder={t("choose")}
                    />
                    <input type="text" name="insurance" defaultValue={selectedInsurance?.value} hidden/>
                    {state?.errors?.insurance && <span className="text-danger mt-2 d-block">{state?.errors.insurance}</span>}
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{pending ? <Spinner /> : t("info_add")}</button>
            </div>
            { state?.message === 'error' && <span className="text-danger d-block mt-3 text-end">{state?.error}</span> }
        </form>
    )
}