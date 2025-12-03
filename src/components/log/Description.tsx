'use client'
import Modal from "@/components/ui/Modal";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const Description = ({ item } : { item:any }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
     const t = useTranslations('Public');

    return (
        <>
            <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1" onClick={() => setShowModal(true)}>
                <i className="ki-outline ki-eye fs-2"></i>
            </button>

            <Modal 
                title={t('explanation')}
                show={showModal} 
                close={() => setShowModal(false)}>
                    <textarea className="form-control form-control-solid p-10" readOnly defaultValue={item} rows={10} style={{ resize: 'none' }}></textarea>
            </Modal>
        </>
    )
}