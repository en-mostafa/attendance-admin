'use client'
import { deletedShift } from "@/services/adminServices"
import Modal from "@/components/ui/Modal";
import { useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export const DeletedItem = ({ id } : { id:number }) => {
    const t = useTranslations('Public');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(deletedShift, null);

    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false);
            toast.success(t("toast_success"))
        }
    }, [state])

    return (
        <>
            <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setShowModal(true)}>
                <i className="ki-outline ki-trash fs-2"></i>
            </button>

            <Modal 
                title={t('confirm_delete')}
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form action={action} className="mt-auto">
                        <input type="hidden" name="id" defaultValue={id} />
                        <div className="modal-body text-center" style={{ paddingBottom: '8rem' }}>
                            {t('ensure_deletion')}
                        </div>
        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t('cancel')}</button>
                            <button type="submit" className="btn btn-danger" disabled={pending}>{pending ? <Spinner /> : t('delete')}</button>
                        </div>
                        {state?.message === 'error' && <span className="text-danger">{state?.error}</span> }
                    </form>
            </Modal>
        </>
    )
}