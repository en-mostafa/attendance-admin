'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useContext, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import { useSelectionAdmins } from "@/hooks/useSelectionAdmins";
import { pipe } from "@/services/pipe";
import { transferSalary } from "@/services/salaryServices";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false })


export const Transfer = () => {
    const t = useTranslations('Public.Finance');
    const role = useContext(SessionContext);
    const [price, setPrice] = useState('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [state, action, pending] = useActionState(transferSalary, null);
    const admins: any = useSelectionAdmins();

    useEffect(() => {
        if(state?.message === 'success')
            setShowModal(false);
    }, [state])

    return (
        <>
            {role?.salary.create_salary && (
                <button type="button" className="btn btn-flex btn-primary btn-sm" onClick={() => setShowModal(true)}>
                    {t("deposit")} و {t("withdraw")}   
                </button>
            )}

            <Modal 
                title={` ${t("deposit")} / ${t("withdraw")}`} 
                customClass="mw-650px" 
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form action={action}>
                        <div className="modal-body">
                            <div className="d-flex flex-column">
                                <label htmlFor="basic-url" className="form-label">{t("admin_name")}</label>
                                <Select 
                                    value={selectedUser}
                                    classNamePrefix={'react-select'}
                                    onChange={setSelectedUser}
                                    options={admins}
                                    placeholder={t("choose")}
                                />
                                <input type="hidden" name="userId" defaultValue={selectedUser?.value}/>
                                {state?.errors?.userId && 
                                    <span className="text-danger mt-2 d-block">{state.errors.userId}</span>}
                            </div>

                            <div className="d-flex flex-column mt-4">
                                <label htmlFor="basic-url" className="form-label">{t("amount")} ({t('euro')})</label>
                                <input 
                                    type="text" 
                                    name="amount"
                                    value={pipe(price)}
                                    onChange={e => setPrice(e.target.value)}
                                    className={`form-control ${state?.errors?.amount && 'is-invalid'}`} 
                                    placeholder={t('enter_number')}
                                    aria-label="Server"
                                />
                                {state?.errors?.amount && 
                                    <span className="text-danger mt-2 d-block">{state.errors.amount}</span>}
                            </div>
                            
                            <div className="d-flex flex-column mt-4">
                                <label htmlFor="basic-url" className="form-label">{t('describe')}</label>
                                <textarea 
                                    className="form-control" 
                                    rows={3} 
                                    name="description" 
                                    placeholder={t("enter_description")}></textarea>
                                    
                                {state?.errors?.description && 
                                    <span className="text-danger mt-2 d-block">{state.errors.description}</span>}
                            </div>

                            <div className="d-flex flex-column mt-6 gap-2">
                                <label htmlFor="deposite" className="d-flex gap-2 cursor-pointer">
                                    <input type="radio" id="deposite" name="transformType" value="deposite" defaultChecked/>
                                    {t("wallet_deposit")}
                                </label>
                                <label htmlFor="withdrawal" className="d-flex gap-2 cursor-pointer">
                                    <input type="radio" id="withdrawal" name="transformType" value="withdrawal"/>
                                    {t('wallet_withdraw')}
                                </label>
                            </div>
                            {state?.errors?.transformType &&
                                <span className="text-danger mt-2 d-block">{state.errors.transformType}</span>}
                        </div>
        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t('cancel')}</button>
                            <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : t('register')}</button>
                        </div>
                        {state?.message === 'error' && <span className="text-danger">{state?.error}</span> }
                    </form>
            </Modal>
        </>
    )
}