'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { pipe } from "@/services/pipe";
import { updateSalary } from "@/services/salaryServices";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";


export const Edit = ({ item } : { item:any }) => {
    const t =  useTranslations('Public.Finance');
    const [price, setPrice] = useState(String(item?.amount));
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(updateSalary, null);

    useEffect(() => {
        if(state?.message === 'success')
            setShowModal(false);
    }, [state])

    return (
        <>
            <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1" onClick={() => setShowModal(true)}>
                <i className="ki-outline ki-pencil fs-2"></i> 
            </button>

            <Modal 
                title={`${t("deposit")} / ${t("withdraw")}`} 
                customClass="mw-650px" 
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form action={action}>
                        <div className="modal-body">
                            <input type="hidden" name="id" defaultValue={item?.id} />
                            <div className="d-flex flex-column mt-4">
                                <label htmlFor="basic-url" className="form-label">{t("amount")} ({t("euro")})</label>
                                <input 
                                    type="text" 
                                    name="amount"
                                    value={pipe(price)}
                                    onChange={e => setPrice(e.target.value)}
                                    className={`form-control ${state?.errors?.amount && 'is-invalid'}`} 
                                    placeholder={t("enter_number")}
                                    aria-label="Server"
                                />
                                {state?.errors?.amount && 
                                    <span className="text-danger mt-2 d-block">{state.errors.amount}</span>}
                            </div>
                            
                            <div className="d-flex flex-column mt-4">
                                <label htmlFor="basic-url" className="form-label">{t("describe")}</label>
                                <textarea 
                                    className="form-control" 
                                    rows={3} 
                                    name="description" 
                                    defaultValue={item?.description}
                                    placeholder={t("enter_description")}></textarea>
                                    
                                {state?.errors?.description && 
                                    <span className="text-danger mt-2 d-block">{state.errors.description}</span>}
                            </div>

                            <div className="d-flex flex-column mt-6 gap-2">
                                <label htmlFor="deposite" className="d-flex gap-2 cursor-pointer">
                                    <input type="radio" id="deposite" name="transformType" value="deposite" defaultChecked={item?.transformType === 'deposite'}/>
                                    {t("wallet_deposit")}
                                </label>
                                <label htmlFor="withdrawal" className="d-flex gap-2 cursor-pointer">
                                    <input type="radio" id="withdrawal" name="transformType" value="withdrawal" defaultChecked={item?.transformType === 'withdrawal'}/>
                                    {t("wallet_withdraw")}
                                </label>
                            </div>
                            {state?.errors?.transformType &&
                                <span className="text-danger mt-2 d-block">{state.errors.transformType}</span>}
                        </div>
        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t("cancel")}</button>
                            <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : t("register")}</button>
                        </div>
                        {state?.message === 'error' && <span className="text-danger">{state?.error}</span> }
                    </form>
            </Modal>
        </>
    )
}