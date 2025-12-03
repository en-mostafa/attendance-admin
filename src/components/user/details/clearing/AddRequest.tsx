'use client'

import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/spinner";
import { pipe, pipeNumber } from "@/services/pipe";
import { addTransaction } from "@/services/userServices";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react"

export default function AddRequest({ balance, id, mutate } : { balance:any, id: string, mutate:any }) {
    const [amount, setAmount] = useState('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(addTransaction, null);
    const t =  useTranslations('Public');

    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false);
            setAmount('')
            mutate()
        }
        
    }, [state])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = (e.target.value).replace(/\,/g,'');
        setAmount(value)
    }
    

    return (
        <>
        <button type="button" className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
            {t('register_request')}
        </button>
      
        <Modal title={t('User.settlement_request')} show={showModal} close={() => setShowModal(false)}>
            <form action={action}>
                <div className="modal-body">
                    <div>
                        <label htmlFor="basic-url" className="form-label">{t('User.wallet_amount')}({t('euro')})</label>
                        <span className="form-control form-control-solid">{pipeNumber(balance)}</span>
                    </div>
                    <div className="my-3">
                        <label htmlFor="basic-url" className="form-label">{t('User.amount')} ({t('euro')})</label>
                        <input type="hidden" name="amount" defaultValue={amount} />
                        <input type="hidden" name="id" defaultValue={id} />
                        <input 
                            type="text" 
                            className="form-control" 
                            value={pipe(amount)}
                            onChange={handleChange}
                            placeholder={t('required_number')} 
                            aria-label="Server"
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t('cancel')}</button>
                    <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : t('register')}</button>
                </div>
                {state?.message === 'error' && <span className="text-danger text-sm mt-2 text-center my-3 d-block">{state?.message}</span>}
            </form>
        </Modal>
        </>
    )
}