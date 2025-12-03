'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { createProduct } from "@/services/services.server";
import Spinner from "../ui/spinner";

export const AddFile = () => {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(createProduct, null);

    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false);
            toast.success(t("toast_success"))
        }
    }, [state])


    return (
        <>
            {role?.product.create_product && (
                <button type="button" className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
                    {t('new_product')}
                </button>
            )}

            <Modal 
                title={t('create_new_product')}
                show={showModal} 
                close={() => setShowModal(false)}>

                <form action={action} className="modal-content">
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">{t('title')}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder={t("title")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{`${t('price')} (${t('euro')}) `}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="singlePrice"
                                placeholder={t("required_number")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{`${t('price')} (${t('lear')}) `}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lyra"
                                placeholder={t("required_number")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{` ${t('price')} (${t('dollar')})`}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="dollar"
                                placeholder={t("required_number")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{t("discount")} (0 - 100)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="discount"
                                placeholder={t("required_number")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{t("taxes")} (0 - 100)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="tax"
                                placeholder={t("required_number")}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            {t('cancel')}
                        </button>
                        <button type="submit" className="btn btn-success" disabled={pending}>
                            {pending ? <Spinner /> : t('creation')}
                        </button>
                        {state?.message === 'error' && <span className="text-danger">{state?.error}</span> }
                    </div>
                </form>
            </Modal>
        </>
    )
}
