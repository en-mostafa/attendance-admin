'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { pipe } from "@/services/pipe";
import { addWallet } from "@/services/walletServices";
import { useTranslations } from "next-intl";


export const Edit = () => {
    const t = useTranslations('Public.Finance');
    const [price, setPrice] = useState('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(addWallet, null);

    useEffect(() => {
        if(state?.message === 'success')
            toast.success(t('toast_success'))
    }, [state])

    return (
        <>
            <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1" onClick={() => setShowModal(true)}>
                <i className="ki-outline ki-pencil fs-2"></i> 
            </button>

            <Modal 
                title={t("expenses_add")}
                customClass="mw-650px" 
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form action={action}>
                        <div className="modal-body">
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
                                    placeholder={t("enter_description")}></textarea>
                                    
                                {state?.errors?.description && 
                                    <span className="text-danger mt-2 d-block">{state.errors.description}</span>}
                            </div>

                            <div className="d-flex flex-column mt-6 gap-2">
                                <label htmlFor="increase" className="d-flex gap-2 cursor-pointer">
                                    <input type="radio" id="increase" name="type" value="increase" defaultChecked/>
                                    {t("deposit")} 
                                </label>
                                <label htmlFor="decrease" className="d-flex gap-2 cursor-pointer">
                                    <input type="radio" id="decrease" name="type" value="decrease"/>
                                    {t("withdraw")} 
                                </label>
                            </div>
                            {state?.errors?.type &&
                                <span className="text-danger mt-2 d-block">{state.errors.type}</span>}
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