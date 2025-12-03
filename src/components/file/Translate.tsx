'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import dynamic from 'next/dynamic';
import { translateProduct } from "@/services/services.server";
import { lnags } from "@/constant";
import Spinner from "../ui/spinner";
const Select = dynamic(() => import('react-select'), { ssr: false });


export const TranslateFile = ({ id } : { id: number }) => {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    const [lang, setLang] = useState<any>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(translateProduct, null);

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
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    style={{ fill: "#99A1B7" }}
                    >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
                    </svg>
                </button>
            )}

            <Modal 
                title={t('product_translation')}
                show={showModal} 
                close={() => setShowModal(false)}>

                <form action={action} className="modal-content">
                    <input type="hidden" name="id" defaultValue={id} />
                    <div className="modal-body">
                        <div className="mb-3">
                        <label className="form-label">{t('translated_title')}</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"                           
                        />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{t('lang')}</label>
                            <Select
                                value={lang}
                                classNamePrefix={'react-select'}
                                onChange={setLang}
                                options={lnags}
                                placeholder={t('choose')}
                            />
                            <input type="hidden" name="lang" defaultValue={lang?.value} />
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
