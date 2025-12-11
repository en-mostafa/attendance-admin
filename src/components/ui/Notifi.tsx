'use client'

import { startTransition, useActionState, useEffect, useState } from "react"
import '../../../public/assets/css/notif.css';
import { updateAlarm } from "@/services/notif.server";
import Spinner from "./spinner";
import useSwrRevalidate from "@/hooks/useRevalidateData";
import { useTranslations } from "next-intl";

interface NotifType {
    id: number,
    caseId: null | any,
    title: string,
    description: string,
}

export default function Notifi() {
    const { data } = useSwrRevalidate('/notification');
    const [show, setShow] = useState(false);
    const [state, action, pending] = useActionState(updateAlarm, null);

    useEffect(() => {
        if (data?.reminders?.length !== 0) {
            setShow(true)
        }
    }, [data])

    if (!data?.reminders) return;

    const handleClick = (id: number, value: boolean) => {
        const data = {
            id,
            isRead: value,
        }
        startTransition(() => action(data));
        setShow(false);
    }


    return (
        <>
            {data?.reminders?.map((notif: NotifType) => (
                <div key={notif.id} className={`modal fade d-block ${show && 'show'}`} id="kt_modal_stacked_1" aria-modal="true" role="dialog" style={{ visibility: show ? 'visible' : 'hidden' }}>
                    <div className={`modal-dialog modal-dialog-top w-450px`} onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-center">
                                <h3 className="modal-title px-20">{notif.title}</h3>
                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <svg className="bellIcon" viewBox="0 0 448 512">
                                    <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path>
                                </svg>
                            </div>
                            <p className="notificationPara">{notif.description}</p>
                            <div className="buttonContainer">
                                <button type="button" className="AllowBtn" onClick={() => handleClick(notif.id, true)}>{pending ? <Spinner /> : 'end'}</button>
                                <button type="button" className="NotnowBtn" onClick={() => handleClick(notif.id, false)}>sdf</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {data?.reminders.length !== 0 && <div className={`modal-backdrop fade ${!show ? 'd-none' : 'd-block show'}`} ></div>}
        </>
    )
}