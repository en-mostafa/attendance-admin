'use client'

import { useState } from "react"
import { GetTime } from "./GetTime";
import { useTranslations } from "next-intl";

export const EditAlarm = ({ notif } : { notif: any }) => {
    const [selectedNotif, setSelectedNotif] = useState<boolean>(false);
    const t = useTranslations('Public');

    return (
        <>
            <button
                className="btn btn-sm btn-light-primary"
                data-bs-toggle="modal"
                data-bs-target="#notifDetailModalEdit"
                onClick={() => setSelectedNotif(true)}
            >
                {t('show')}
            </button>

            <div
                className="modal fade"
                id="notifDetailModalEdit"
                tabIndex={-1}
                aria-labelledby="notifDetailModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title text-white" id="notifDetailModalLabel">
                        {t('alarm_details')}
                    </h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                    </div>
                    <div className="modal-body">
                    {selectedNotif ? (
                        <div className="row g-4">
                        <div className="col-12">
                            <label className="form-label fw-bold">{t('title')}:</label>
                            <p className="text-muted">{notif.title}</p>
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold">{t('explanation')}:</label>
                            <p className="text-muted">{notif.description}</p>
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold">{t('send_time')}:</label>
                            <p className="text-muted">
                                <GetTime time={notif.time}/>
                            </p>
                        </div>
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status" />
                        </div>
                    )}
                    </div>
                    <div className="modal-footer bg-light">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        {t('close')}
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </>
    )
}