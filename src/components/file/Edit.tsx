'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { updateProduct } from "@/services/services.server";
import Spinner from "../ui/spinner";

export const EditFile = ({ data } : { data:any }) => {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(updateProduct, null);

    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false);
            toast.success(t("toast_success"))
        }
    }, [state])


    return (
        <>
            {role?.product.create_product && (
                <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setShowModal(true)}>
                    <i className="ki-outline ki-pencil fs-2"></i>
                </button>
            )}

            <Modal 
                title={t('product_editing')}
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
                                defaultValue={data.title}
                                placeholder={t("title")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{`${t('price')} (${t('euro')}) `}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="singlePrice"
                                defaultValue={data.singlePrice}
                                placeholder={t("required_number")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{`${t('price')} (${t('lear')}) `}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lyra"
                                defaultValue={data.lyra}
                                placeholder={t("required_number")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{` ${t('price')} (${t('dollar')})`}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="dollar"
                                defaultValue={data.dollar}
                                placeholder={t("required_number")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{t("discount")} (0 - 100)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="discount"
                                defaultValue={data.discount}
                                placeholder={t("required_number")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{t("taxes")} (0 - 100)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="tax"
                                defaultValue={data.tax}
                                placeholder={t("required_number")}
                            />
                        </div>
                    </div>
                    <input type="hidden" name="id" defaultValue={data.id} />
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            {t('cancel')}
                        </button>
                        <button type="submit" className="btn btn-success" disabled={pending}>
                            {pending ? <Spinner /> : t('register')}
                        </button>
                        {state?.message === 'error' && <span className="text-danger">{state?.error}</span> }
                    </div>
                </form>
            </Modal>
        </>
    )
}
