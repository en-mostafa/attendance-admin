'use client'
import Modal from "@/components/ui/Modal";
import { FormEvent, startTransition, useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import DatePickerCalnender from "@/components/ui/DatePicker";
import { formatFullDate } from "@/services/formatDate";
import { addOff } from "@/services/offServices";
import { useTranslations } from "next-intl";

export const AddOff = ({ mutate } : { mutate:any }) => {
    const t = useTranslations('Public');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [state, action, pending] = useActionState(addOff, null)
    
    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false);
            mutate();
            toast.success(t("toast_success"));
        }
    }, [state])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString()
        }
        startTransition(() => {
            action(formData)
        })
    }

    return (
        <>
            <button type="button" className="btn btn-sm btn-primary align-self-center" onClick={() => setShowModal(true)}>
                {t("register_request")} 
            </button>

            <Modal 
                title={t('add_leave')} 
                show={showModal} 
                close={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="modal-body">
                            <div className="my-3">
                                <label htmlFor="basic-url" className="mb-2">{t("start_date")}</label>
                                <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                    <DatePickerCalnender 
                                        date={startDate} 
                                        setDate={setStartDate} 
                                    />
                                    <input type="hidden" name="startDate" defaultValue={formatFullDate(startDate)}/>
                                    <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                        <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                    </span>
                                </div>
                            </div>
                            <div className="my-3">
                                <label htmlFor="basic-url" className="mb-2">{t("end_date")}</label>
                                <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                    <DatePickerCalnender 
                                        date={endDate} 
                                        setDate={setEndDate} 
                                    />
                                    <input type="hidden" name="endDate" defaultValue={formatFullDate(endDate)}/>
                                    <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                        <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary w-100px mt-10" disabled={pending}>{pending ? <Spinner /> : t("register")}</button>
                                { state?.message === 'error' && <span className="text-danger d-block mt-3">{state?.error}</span> }
                            </div>
                        </div>
                    </form>
            </Modal>
        </>
    )
}