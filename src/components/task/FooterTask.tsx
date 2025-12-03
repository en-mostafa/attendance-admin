'use client'

import { useActionState, useContext, useEffect, useState } from "react"
import { DeleteTask } from "./DeleteTask";
import { addMessageTask } from "@/services/task.server";
import Spinner from "../ui/spinner";
import { toast } from "react-toastify";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";


export const FooterTask = ({ data } : { data:any }) => {
    const role = useContext(SessionContext);
    const [comment, setComment] = useState<boolean>(false);
    const userName = data?.userTask[0].user.client;
    const [state, action, pending] = useActionState(addMessageTask, null);
    const t = useTranslations('Public');
   
    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        } else if (state?.message === 'error') {
            toast.error(t('toast_error'))
        }
    }, [state])

    return (
        <>
            <div className="symbol-group symbol-hover d-flex justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Nich Warden" data-kt-initialized="1">
                        <span className="symbol-label bg-warning text-inverse-warning fw-bold">
                            <i className="ki-outline ki-user text-white fs-1"></i>
                        </span>
                    </div>
                    <span className="text-gray-800 fs-7 fw-bold text-hover-primary">{userName?.firstName + " " + userName?.lastName}</span>
                </div>
                {role?.task.update_task && (
                    <div className="d-flex align-items-center gap-2">
                        <DeleteTask id={data?.id}/>
                        <i className="ki-outline ki-notepad-edit fs-1 text-primary cursor-pointer" onClick={() => setComment(!comment)}></i>
                    </div>
                )}
            </div>

            {comment && (
                <div className="mt-10">
                    <form action={action}>
                        <div className="modal-body">
                            <input type="hidden" name="id" defaultValue={data?.id} />
                            <div className="mb-3 position-relative">
                                <textarea
                                name="description"
                                id="messageTextarea"
                                className="form-control bg-light pb-20"
                                placeholder={t('enter_your_description')}
                                defaultValue={data?.taskMessage[0]?.description}
                                rows={10}
                                ></textarea>

                                <div className="position-absolute bottom-0 start-0 end-0 p-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <button type="submit" disabled={pending} className="btn btn-primary">
                                                {pending ? <Spinner/> : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}