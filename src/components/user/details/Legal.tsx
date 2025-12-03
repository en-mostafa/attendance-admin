import Spinner from "@/components/ui/spinner";
import { addLegal } from "@/services/userServices"
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify";

export default function Legal({ data } : { data: any }) {
    const [state, action, pending] = useActionState(addLegal, null);
    const t =  useTranslations('Public');
    
    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        } else if(state?.message === 'error') {
            toast.error(t('toast_error'))
        }
    })

    return (
        <div className="flex-lg-row-fluid ms-lg-15">
            <div className="card p-10 mb-6 mb-xl-9 card-body">
                <h3>{t('legal_info')}</h3>
                <form action={action}>
                    <input type="hidden" name="id" defaultValue={data?.id}/>
                    <div className="row g-5 mt-5">
                        <div className="col-md-6">
                            <label htmlFor="basic-url" className="form-label">{t('company_name')}</label>
                            <input 
                                type="text" 
                                name="companyName" 
                                defaultValue={data?.client?.legal?.companyName}
                                className={`form-control ${state?.errors?.companyName && 'is-invalid'}`} 
                                placeholder={t('enter_your_text')}
                            />
                            <div className="invalid-feedback">{state?.errors?.companyName}</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="basic-url" className="form-label">{t('registration_number')}</label>
                            <input 
                                type="text" 
                                name="registrationNumber" 
                                defaultValue={data?.client?.legal?.registrationNumber}
                                className={`form-control ${state?.errors?.registrationNumber && 'is-invalid'}`} 
                                placeholder={t('enter_your_text')}
                            />
                            <div className="invalid-feedback">{state?.errors?.registrationNumber}</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="basic-url" className="form-label">{t('national_id')}</label>
                            <input 
                                type="text" 
                                name="nationalNumber" 
                                defaultValue={data?.client?.legal?.nationalNumber}
                                className={`form-control ${state?.errors?.nationalNumber && 'is-invalid'}`} 
                                placeholder={t('enter_your_text')}
                            />
                            <div className="invalid-feedback">{state?.errors?.nationalNumber}</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="basic-url" className="form-label">{t('economic_code')}</label>
                            <input 
                                type="text" 
                                name="economicCode" 
                                defaultValue={data?.client?.legal?.economicCode}
                                className={`form-control ${state?.errors?.economicCode && 'is-invalid'}`} 
                                placeholder={t('enter_your_text')}
                            />
                            <div className="invalid-feedback">{state?.errors?.economicCode}</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="basic-url" className="form-label">{t('postal_code')}</label>
                            <input 
                                type="text" 
                                name="postCode" 
                                defaultValue={data?.client?.legal?.postCode}
                                className={`form-control ${state?.errors?.postCode && 'is-invalid'}`} 
                                placeholder={t('enter_your_text')}
                            />
                            <div className="invalid-feedback">{state?.errors?.postCode}</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="basic-url" className="form-label">{t('address')}</label>
                            <input 
                                type="text" 
                                name="addressCompany" 
                                defaultValue={data?.client?.legal?.addressCompany}
                                className={`form-control ${state?.errors?.addressCompany && 'is-invalid'}`} 
                                placeholder={t('enter_your_text')}
                            />
                            <div className="invalid-feedback">{state?.errors?.addressCompany}</div>
                        </div>
                        <div className="form-check mx-2">
                            <input className="form-check-input" type="checkbox" name="isLegal" id="flexCheckDefault" defaultChecked={data?.client?.isLegal} />
                            <label className="form-label" htmlFor="flexCheckDefault">
                                {t('legal_status')}
                            </label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{pending ? <Spinner /> : t('info_add')}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}














