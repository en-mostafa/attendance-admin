'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useContext, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { addCategory } from "@/services/userServices";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { deleteOrder } from "@/services/case.server";

export const DeleteCase = ({ id, mutate } : { id:number, mutate:any }) => {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(deleteOrder, null);

    useEffect(() => {
        if(state?.message === 'success') {
            mutate();
            setShowModal(false);
            toast.success(t("toast_success"))
        }
    }, [state])

    return (
        <>
            {role?.category.create_category && (
                <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setShowModal(true)}>
                    <i className="ki-outline ki-trash fs-2"></i>
                </button>
            )}

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