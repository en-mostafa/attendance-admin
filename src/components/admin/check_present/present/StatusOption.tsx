'use client'
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/spinner";
import { updateAttendance } from "@/services/adminServices";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StatusOption = ({ id, status }: { id: string, status: string }) => {
    const t = useTranslations('Public');
    const [check, setCheck] = useState(status);
    const [showModal, setShowModal] = useState(false);
    const [state, action, pending] = useActionState(updateAttendance, null);

    const handleChange = (value: string) => {
        setShowModal(true);
        setCheck(value)
    }

    useEffect(() => {
        if (state?.message === 'success') {
            setShowModal(false)
            toast.success(t('toast_success'))
        } else if (state?.message === 'error') {
            setCheck(status)
        }
    }, [state])

    const handleCancel = () => {
        setShowModal(false)
        setCheck(status)
    }

    return (
        <>
            <Modal
                title={t("change_status")}
                customClass="mw-650px"
                show={showModal}
                close={handleCancel}>
                <form action={action}>
                    <div className="modal-body">
                        <input type="hidden" name="id" defaultValue={id} />
                        <input type="hidden" name="status" defaultValue={check} />
                        <p className="fs-4 text-start">{t("Present.approval")}</p>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleCancel}>{t("cancel")}</button>
                        <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : t("register")}</button>
                    </div>
                    {state?.message === 'error' && <span className="text-danger">{state?.error}</span>}
                </form>
            </Modal>

            <input
                type="checkbox"
                className="cursor-pointer"
                checked={check === "PRESENT" || check === 'HOLIDAY'}
                onChange={() => handleChange('PRESENT')}
            />
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={check === 'ABSENT'}
                onChange={() => handleChange('ABSENT')}
            />
        </>
    )
}