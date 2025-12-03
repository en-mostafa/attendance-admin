'use client'

import Modal from "@/components/ui/Modal";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react"

export default function AddUser() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const t =  useTranslations('Public');

    return (
        <>
        {/*<button type="button" className="btn btn-sm btn-light-primary" onClick={() => setShowModal(true)}>
            <i className="ki-outline ki-plus fs-2"></i>
            عضو جدید
        </button>*/}
        <Link href="/users/add" className="btn btn-sm btn-light-primary">
            <i className="ki-outline ki-plus fs-2"></i>
            {t('new_member')}
        </Link>
        <Modal title={t('new_member')} show={showModal} close={() => setShowModal(false)}>
            <form action="">
                <div className="modal-body">
                    <div>
                        <label htmlFor="basic-url" className="form-label">{t('name')}</label>
                        <input type="text" className="form-control" placeholder={t('name')} aria-label="Server"/>
                    </div>
                    <div className="my-3">
                        <label htmlFor="basic-url" className="form-label">{t('last_name')}</label>
                        <input type="text" className="form-control" placeholder={t('last_name')} aria-label="Server"/>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t('cancel')}</button>
                    <button type="button" className="btn btn-primary">{t('register')}</button>
                </div>
            </form>
        </Modal>
        </>
    )
}