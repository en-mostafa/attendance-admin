'use client'

import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/spinner";
import { pipeNumber } from "@/services/pipe";
import { editTransaction } from "@/services/userServices";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react"

export default function EditTransaction({ item, mutate } : { item: any, mutate:any }) {
    const [amount, setAmount] = useState(item.amount);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(editTransaction, null);
    const t =  useTranslations('Public');
    
    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false);
            mutate()
        }
    }, [state])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = (e.target.value).replace(/\,/g,'');
        setAmount(value)
    }
    

    return (
        <>
        <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1" onClick={() => setShowModal(true)}>
            <i className="ki-outline ki-pencil fs-2"></i>
        </button>
      
        <Modal title={t('edit_transaction')} show={showModal} close={() => setShowModal(false)}>
            <form action={action}>
                <div className="modal-body">
                    <div className="my-3">
                        <label htmlFor="basic-url" className="form-label text-end d-flex">{t('amount')} ({t('euro')})</label>
                        <input type="hidden" name="amount" defaultValue={amount} />
                        <input type="hidden" name="id" defaultValue={item.id} />
                        <input 
                            type="text" 
                            className="form-control" 
                            value={pipeNumber(amount)}
                            onChange={handleChange}
                            placeholder={t('required_number')} 
                            aria-label="Server"
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t('cancel')}</button>
                    <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> :t('register')}</button>
                </div>
                {state?.message === 'error' && <span className="text-danger text-sm mt-2 text-center my-3 d-block">{state?.message}</span>}
            </form>
        </Modal>
        </>
    )
}