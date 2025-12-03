'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useContext, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { useJalaliFormat } from "@/services/formatDate";
import { editStatus } from "@/services/offServices";
import { SessionContext } from "@/store";
import { useLocale, useTranslations } from "next-intl";

export const EditStatus = ({ item } : { item:any }) => {
    const t = useTranslations('Public');
    const locale = useLocale();
    const role = useContext(SessionContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(editStatus, null)
    
    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false);
            toast.success(t('toast_success'));
        }
    }, [state])
   

    return (
        <>
            {role?.attendance.update_leave && (
                <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1" onClick={() => setShowModal(true)}>
                    <i className="ki-outline ki-pencil fs-2"></i>
                </button>
            )}

            <Modal 
                title={t("verify_request")} 
                show={showModal} 
                close={() => setShowModal(false)}>
                    <form action={action} className="form">
                        <div className="modal-body">
                            <input type="hidden" name="id" defaultValue={item.id}/>
                            <input type="hidden" name="status" defaultValue='Confirmed'/>
                            <div className="d-flex justify-content-between">
                                <label className="form-label fw-bold"> {t("date_leave")} :</label>
                                <p className="">{useJalaliFormat(item?.startDate, locale) + " -- " + useJalaliFormat(item?.endDate, locale)}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <label className="form-label fw-bold">{t("Admin.admin_name")} :</label>
                                <p className="">{item?.admin?.user?.client.firstName + " " + item?.admin?.user?.client.lastName}</p>
                            </div>
                            <p className="text-center mt-14 fs-4">{t("approval_leave")}</p>
                            <div className="modal-footer d-flex align-items-center mt-10">
                                <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>{t("cancel")}</button>
                                <button type="submit" className="btn btn-primary w-150px" disabled={pending}>{pending ? <Spinner /> : t("verify_request")}</button>
                            </div>
                            { state?.message === 'error' && <span className="text-danger d-block mt-3">{state?.error}</span> }
                        </div>
                    </form>
            </Modal>
        </>
    )
}