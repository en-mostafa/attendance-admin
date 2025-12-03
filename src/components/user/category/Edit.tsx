'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useContext, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { updateCategory } from "@/services/userServices";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";

export const EditCategory = ({ item } : { item:any } ) => {
    const role = useContext(SessionContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(updateCategory, null);
    const t =  useTranslations('Public');

    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false)
            toast.success(t('toast_success'))
        }
    }, [state])

    return (
        <>
            {role?.category.update_category && (
                <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1" onClick={() => setShowModal(true)}>
                    <i className="ki-outline ki-pencil fs-2"></i>
                </button>
            )}

            <Modal 
                title={t('edit_category')} 
                customClass="mw-650px" 
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form action={action}>
                        <div className="modal-body">
                            <input type="hidden" name="id" defaultValue={item?.id} />
                            <div>
                                <label htmlFor="basic-url" className="form-label d-flex text-start">{t('category_name')}</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    defaultValue={item?.name}
                                    className={`form-control ${state?.message === 'validation' && 'is-invalid'}`} 
                                    placeholder={t('enter_name')} 
                                    aria-label="Server"
                                />
                                { state?.message === 'validation' &&  <span className="text-danger mt-2 d-block">{t('name_is_required')}</span> }
                            </div>
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